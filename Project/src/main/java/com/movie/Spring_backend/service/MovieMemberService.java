/*
  23-02-09 로그인한 유저가 영화에 관련된 행위를 할때 사용되는 Service 구현(오병주)
  23-02-13 관람평 작성 메소드 구현(오병주)
  23-02-25 관람평 작성 메소드 수정(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.error.exception.BusinessException;
import com.movie.Spring_backend.error.exception.EntityNotFoundException;
import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.exceptionlist.MovieCommentNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.CommentInfoRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import com.movie.Spring_backend.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;

@RequiredArgsConstructor
@Service
public class MovieMemberService {

    private final MovieMemberRepository movieMemberRepository;
    private final MovieInfoRepository movieInfoRepository;
    private final ReservationRepository reservationRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final JwtValidCheck jwtValidCheck;

    // 사용자가 영화 좋아요를 누를 때 실행되는 메소드
    @Transactional
    public void MovieLikeUpdate(Map<String, String> requestMap, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String Movie_id = requestMap.get("mid");
        String like = requestMap.get("mlike");

        // JPA를 사용하기 위해 Movie_id 와 User_id 를 entity형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(Long.valueOf(Movie_id)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();

        // like가 true면 이미 튜플이 존재하므로 update 쿼리 실행
        if (like.equals("true")) {
            movieMemberRepository.MovieLikeChangeFalse(member, movie);
        }
        else {
            // like가 거짓이면 튜플의 존재 여부를 먼저 파악
            MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

            // 튜플이 존재하지 않는 경우 entity를 가공 후 insert 쿼리 실행
            if (MovieMember == null) {
                MovieMember = MovieMemberEntity.builder()
                        .umlike(true)
                        .movie(movie)
                        .member(member).build();
                movieMemberRepository.save(MovieMember);
            }
            // 튜플이 존재하는 경우 좋아요 기록을 바꾸는 update 쿼리 실행
            else {
                movieMemberRepository.MovieLikeChangeTrue(member, movie);
            }
        }
    }

    // 사용자가 관람평 작성할 때 실행되는 메소드
    @Transactional
    public void CommentInsert(Map<String, String> requestMap, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String Movie_id = requestMap.get("mid");
        String Movie_comment = requestMap.get("mcomment");
        String Movie_score = requestMap.get("mscore");

        // JPA를 사용하기 위해 Movie_id 와 User_id 를 entity형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(Long.valueOf(Movie_id)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();

        // MovieMember table에 튜플의 존재 여부를 먼저 파악
        MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

        // MovieMember table에 이미 작성한 관람평이 존재할 경우 예외처리
        if (MovieMember != null && MovieMember.getUmcomment() != null) {
            throw new BusinessException("작성된 관람평이 존재합니다.", ErrorCode.COMMENT_IS_EXIST);
        }

        // 현재 시간변수(이거 추후에 고정날짜로 해야 할수도 있음)
        Date nowDate = new Date();

        // 현재 시간을 sql에 사용할 수 있게 매핑
        SimpleDateFormat DateFormatYMD = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat DateFormatHMS = new SimpleDateFormat("HH:mm:ss");
        String day = DateFormatYMD.format(nowDate);
        String hour = DateFormatHMS.format(nowDate);

        // 상영이 끝난 영화정보 튜플 검색(조건 때문에 2번 검색)
        List<MovieInfoEntity> MovieInfos = movieInfoRepository.findInfoBeforeToday(movie, java.sql.Date.valueOf(day));
        List<MovieInfoEntity> MovieInfos2 = movieInfoRepository.findInfoToday(movie, java.sql.Date.valueOf(day), hour);

        // 두개의 영화 정보를 결합
        List<MovieInfoEntity> MovieInfoAll = new ArrayList<>();
        MovieInfoAll.addAll(MovieInfos);
        MovieInfoAll.addAll(MovieInfos2);

        // 상영이 끝난 영화들 중 사용자가 영화를 관람한 기록이 있는지 조회
        List<ReservationEntity> Reservations = reservationRepository.findByMemberAndMovieInfoIn(member, MovieInfoAll);

        // 관람기록이 존재하지 않을경우 예외처리
        if (Reservations.isEmpty()) {
            throw new EntityNotFoundException("영화 관람기록이 없습니다.", ErrorCode.WATCHING_IS_NONE);
        }
        // 관람기록이 존재하지는 경우
        else {
            // 관람평을 쓰는 사용자가 영화에 대한 좋아요 기록이 있을 경우
            if (MovieMember != null && MovieMember.getUmlike() != null) {
                // 사용자 좋아요 기록을 그대로 entity 생성
                MovieMemberEntity Data = MovieMemberEntity.builder()
                        .umlike(MovieMember.getUmlike())
                        .umcomment(Movie_comment)
                        .umscore(Integer.valueOf(Movie_score))
                        .umcommenttime(java.sql.Date.valueOf(day))
                        .movie(movie)
                        .member(member).build();
                // 관람평 최신순 검색을 위해 튜플을 제거 후
                movieMemberRepository.deleteByMovieAndMember(movie, member);
                // 튜플을 다시 삽입
                movieMemberRepository.save(Data);
            }
            // 관람평을 쓰는 사용자가 영화에 대한 좋아요 기록이 없을 경우
            else {
                // 튜플 생성 후 삽입
                MovieMember = MovieMemberEntity.builder()
                        .umcomment(Movie_comment)
                        .umscore(Integer.valueOf(Movie_score))
                        .umcommenttime(java.sql.Date.valueOf(day))
                        .movie(movie)
                        .member(member).build();
                movieMemberRepository.save(MovieMember);
            }
        }
    }

    // 사용자가 관람평 좋아요를 누를 때 실행되는 메소드
    @Transactional
    public void CommentLikeUpdate(CommentInfoDto commentInfoDto, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // commentInfoDto 안에 정보를 추출
        String User_id = commentInfoDto.getUid();
        Long MovieMember_id = commentInfoDto.getUmid();
        boolean like = commentInfoDto.getLike();

        // 관람평 id를 이용해서 관람평 튜플 검색
        MovieMemberEntity ExceptionMovieMember = movieMemberRepository.findById(MovieMember_id).orElse(null);

        // 예외처리
        if (ExceptionMovieMember == null) {
            throw new MovieCommentNotFoundException("정보가 존재하지 않습니다.");
        }

        // JPA를 사용하기 위해 User_id 와 MovieMember_id 를 entity형으로 변환
        MemberEntity Member = MemberEntity.builder().uid(User_id).build();
        MovieMemberEntity MovieMember = MovieMemberEntity.builder().umid(MovieMember_id).build();

        // like가 true면 이미 튜플이 존재하므로 delete 쿼리 실행
        if (like) {
            commentInfoRepository.deleteByMemberAndMoviemember(Member, MovieMember);
        }
        // like가 false면 튜플을 insert
        else {
            // Entity 생성후 insert
            CommentInfoEntity commentInfo = CommentInfoEntity.builder()
                    .member(Member)
                    .moviemember(MovieMember).build();
            commentInfoRepository.save(commentInfo);
        }
    }

    // 사용자가 관람평을 삭제할 때 실행되는 메소드
    @Transactional
    public void CommentDelete(Long umid, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 관람평 id를 이용해서 관람평 튜플 검색
        MovieMemberEntity MovieMember = movieMemberRepository.findById(umid).orElse(null);

        // 예외처리
        if (MovieMember == null) {
            throw new MovieCommentNotFoundException("정보가 존재하지 않습니다.");
        }

        // 영화에 대한 좋아요 기록이 있으면 튜플 update
        if (MovieMember.getUmlike() != null && MovieMember.getUmlike()) {
            // 튜플 update 시 필요한 entity 생성
            MemberEntity Member = MemberEntity.builder().uid(MovieMember.getMember().getUid()).build();
            MovieEntity Movie = MovieEntity.builder().mid(MovieMember.getMovie().getMid()).build();

            // 관람평에 대한 내용을 모두 null 로 교체
            movieMemberRepository.MovieCommentNull(Member, Movie);
        }
        // 영화에 대한 좋아요 기록이 없을경우 바로 MovieMember 튜플 제거
        else {
            movieMemberRepository.deleteById(umid);
        }
    }
}


