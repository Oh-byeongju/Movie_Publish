/*
  23-02-07 전체영화 조회 및 사용자 영화 검색 메소드 수정(오병주)
  23-02-10 영화 세부내용을 위한 메소드 설계(오병주)
  23-02-14 영화 세부내용 메소드 수정(오병주)
  23-02-20 영화 관람평 메소드 구현(오병주)
*/
package com.movie.Spring_backend.service;
import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieCommentNotFoundException;
import com.movie.Spring_backend.mapper.MovieCommentMapper;
import com.movie.Spring_backend.mapper.MovieInfoMapper;
import com.movie.Spring_backend.repository.*;
import com.movie.Spring_backend.util.DeduplicationUtil;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.mapper.MovieMapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final MovieActorRepository movieActorRepository;
    private final ActorRepository actorRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final MovieMapper movieMapper;
    private final MovieCommentMapper movieCommentMapper;

    // 전체 영화 조회 메소드
    @Transactional
    public List<MovieDto> getAllMovie(String uid) {
        // 테이블 내의 모든 영화 검색
        List<MovieEntity> Movies = movieRepository.findAllDESC();

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록의 중복제거를 위해 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        // 영화 목록과 좋아요 기록을 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDto(movie, MovieLikeNum.contains(movie.getMid()))).collect(Collectors.toList());
    }

    // 사용자 영화 검색 메소드
    @Transactional
    public List<MovieDto> getSearchMovie(String title, String uid) {
        // 사용자가 입력한 제목으로 영화 검색(제목의 일부분 검색도 지원)
        List<MovieEntity> Movies = movieRepository.findSearchDESC(title);

        // 검색된 영화가 없을경우 예외처리
        if (Movies.isEmpty()) {
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLikes = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록을 HashSet 으로 변환
        Set<Long> MovieLikeSet = new HashSet<>();
        for (MovieMemberEntity mm : MovieLikes) {
            MovieLikeSet.add(mm.getMovie().getMid());
        }

        // 영화 목록과 좋아요 기록을 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDto(movie, MovieLikeSet.contains(movie.getMid()))).collect(Collectors.toList());
    }

    // 영화 세부내용 메소드
    @Transactional
    public MovieDto getMovieDetail(Long mid, String uid) {
        // 영화 ID를 기반으로 영화 검색
        MovieEntity movie = movieRepository.findByMid(mid);

        // 영화에 출연하는 출연진 정보 검색
        List<MovieActorEntity> MovieActor = movieActorRepository.findByMovie(movie);

        // Actor 테이블의 기본키 추출
        Set<Long> Actor_Ids = new HashSet<>();
        for (MovieActorEntity MA : MovieActor) {
            Actor_Ids.add(MA.getActor().getAid());
        }

        // Actor 테이블의 기본키를 이용하여 정보 검색
        List<ActorEntity> Actor = actorRepository.findAllById(Actor_Ids);

        // 영화 출연진들의 이름 매핑
        List<String> Actors = new ArrayList<>();
        for (ActorEntity A : Actor) {
            Actors.add(A.getAname()+",");
        }

        // List의 마지막 요소에 콤마를 제거
        if (!Actors.isEmpty()){
            Actors.set(Actor.size()-1, Actors.get(Actor.size()-1).replaceAll(",$", ""));
        }

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자의 현재 영화 평가 기록 검색
        MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

        // 사용자의 영화 평가가 없을 경우 좋아요 여부를 false 로 return
        if (MovieMember == null) {
            return movieMapper.toDtoDetail(movie, false, Actors);
        }

        // 사용자의 영화 평가에서 좋아요 여부를 판단 후 return
        if (MovieMember.getUmlike() == null || !MovieMember.getUmlike()) {
            return movieMapper.toDtoDetail(movie, false, Actors);
        }
        else {
            return movieMapper.toDtoDetail(movie, true, Actors);
        }
    }

    //mid로 영화 able disable 나누고 중복제거까지해서 전송
    @Transactional
    public List<MovieDto> findByMovieableDisable(List<Long> mid){

        List<MovieEntity> able = movieRepository.findByMidInAble(mid);
        //여기서 able 에 전체 in 데이터가 넘어감
        //able dto mapping
        List<MovieDto> AbleDto= able.stream().map((movie->movieMapper.toAble(movie))).collect(Collectors.toList());
        //NOTIN cid 구하고
        List<MovieEntity> disable = movieRepository.findByMidInDisAble(mid);
        //disable dto mapping
        List<MovieDto> DisAbleDto= disable.stream().map((movie->movieMapper.toDisable(movie))).collect(Collectors.toList());

        for(MovieDto mm : DisAbleDto){
            AbleDto.add(mm);
        }
        //객체로 중복제거하면 끝
        List <MovieDto> dedupication = DeduplicationUtil.deduplication(AbleDto,MovieDto::getMid);

        //mid 검색을 통해 무비 조회
        return dedupication;
    }

    // 영화 세부내용 관람평 메소드(최신순)
    @Transactional
    public List<CommentInfoDto> getMovieDetailCommentRecent(Long mid, String uid) {

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder()
                .mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(최신순)
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmidDesc(movie);

        // 영화 관람평이 없는경우 예외처리
        if (MovieMembers.isEmpty()) {
            throw new MovieCommentNotFoundException("관람평이 없습니다.");
        }

        // 사용자 id 정보를 entity 형으로 변환
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 관람평 검색
        List<CommentInfoEntity> CommentLikes = commentInfoRepository.findByMember(member);

        // 좋아요 누른 관람평 목록을 HashSet 으로 변환
        Set<Long> CommentLikeSet = new HashSet<>();
        for (CommentInfoEntity CI : CommentLikes) {
            CommentLikeSet.add(CI.getMoviemember().getUmid());
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.stream().map(MovieMember ->
                movieCommentMapper.toDto(MovieMember, CommentLikeSet.contains(MovieMember.getUmid()))).collect(Collectors.toList());
    }

    // 영화 세부내용 관람평 메소드(공감순)
    @Transactional
    public List<CommentInfoDto> getMovieDetailCommentLike(Long mid, String uid) {

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder()
                .mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(공감순)
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findAllCommentLikeDESC(movie);

        // 영화 관람평이 없는경우 예외처리
        if (MovieMembers.isEmpty()) {
            throw new MovieCommentNotFoundException("관람평이 없습니다.");
        }

        // 사용자 id 정보를 entity 형으로 변환
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 관람평 검색
        List<CommentInfoEntity> CommentLikes = commentInfoRepository.findByMember(member);

        // 좋아요 누른 관람평 목록을 HashSet 으로 변환
        Set<Long> CommentLikeSet = new HashSet<>();
        for (CommentInfoEntity CI : CommentLikes) {
            CommentLikeSet.add(CI.getMoviemember().getUmid());
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.stream().map(MovieMember ->
                movieCommentMapper.toDto(MovieMember, CommentLikeSet.contains(MovieMember.getUmid()))).collect(Collectors.toList());
    }
}
