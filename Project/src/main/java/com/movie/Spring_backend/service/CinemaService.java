package com.movie.Spring_backend.service;

import com.movie.Spring_backend.util.DeduplicationUtil;
import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.CinemaRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;
    private final MovieInfoRepository movieInfoRepository;
    private final MovieService movieService;
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;






    //cid로 tid추출하기

        @Transactional
    public List<Long> findByCidIn(Set<Long> id) {
            List<CinemaEntity> datasIn = cinemaRepository.findByCidIn(id);
            List<CinemaDto> cinemaIn = datasIn.stream().map(data -> CinemaDto.builder()
                    .cid(data.getCid())
                    .cname(data.getCname())
                    .cseat(data.getCseat())
                    .ctype(data.getCtype())
                    .theater(data.getTheater())
                    .build()).collect(Collectors.toList());
            List<Long> tid = new ArrayList<>();
            for (CinemaDto tt : cinemaIn) {
                tid.add(tt.getTheater().getTid());
            }
            return tid;
        }



    @Transactional
    public List<Long> SelectTid(List<Long> id) {
        List<CinemaEntity> datasIn = cinemaRepository.findByCidIn(id);
        List<CinemaDto> cinemaIn = datasIn.stream().map(data -> CinemaDto.builder()
                .cid(data.getCid())
                .cname(data.getCname())
                .cseat(data.getCseat())
                .ctype(data.getCtype())
                .theater(data.getTheater())
                .build()).collect(Collectors.toList());
        List<Long> tid = new ArrayList<>();
        for (CinemaDto tt : cinemaIn) {
            tid.add(tt.getTheater().getTid());
        }
        return tid;
    }



    //극장으로 cid뽑아서 movie able disable 검색
    @Transactional
    public List<MovieDto> findByTheater(Long id) {
        //외래키 검색을 위해 엔티티 매핑
        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        //위에서 매핑한 theater엔티티를 이용해서 cinema에서 cid 추출하기
        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for(CinemaEntity cc :datas){
            mappedcid.add(cc.getCid());
        }
        //건들거 없음 여기서 이제 not과 not in 검색을 따로 해줘야됨
        System.out.print(mappedcid);
        //cid in을 이용해서 movieinfo에서 mid 추출
        //IN
        List <MovieInfoEntity> IndataM = movieInfoRepository.findByCinemaCidIn(mappedcid);
        List<Long> InmappedMid = new ArrayList<>();

        for(MovieInfoEntity mm :IndataM){
            InmappedMid.add(mm.getMovie().getMid());
        }
        List<MovieEntity> able = movieRepository.findByMidInAble(InmappedMid);
        //여기서 able 에 전체 in 데이터가 넘어감


        //able dto mapping
    List<MovieDto> AbleDto= able.stream().map((movie->movieMapper.toAble(movie))).collect(Collectors.toList());
        //NOTIN cid 구하고
        List <MovieInfoEntity> NotIndataM= movieInfoRepository.findByCinemaCidNotIn(mappedcid);
        List<Long> NotmappedMid = new ArrayList<>();
        for(MovieInfoEntity mm :NotIndataM){
            NotmappedMid.add(mm.getMovie().getMid());
        }
        List<MovieEntity> disable = movieRepository.findByMidInDisAble(NotmappedMid);
        for(MovieEntity mm :disable){
            able.add(mm);
        }
        //disable dto mapping

        List<MovieDto> DisAbleDto= able.stream().map((movie->movieMapper.toDisable(movie))).collect(Collectors.toList());

        for(MovieDto mm : DisAbleDto){
            AbleDto.add(mm);
        }
        List <MovieDto> dedupication = DeduplicationUtil.deduplication(AbleDto,MovieDto::getMid);

        //mid 검색을 통해 무비 조회
         return dedupication;
    }



    //tid로 cid추출함
    @Transactional
    public List<Long> findByTheaterday(Long id) {
        //외래키 검색을 위해 엔티티 매핑
        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        //위에서 매핑한 theater엔티티를 이용해서 cinema에서 cid 추출하기
        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for (CinemaEntity cc : datas) {
            mappedcid.add(cc.getCid());
        }
        return mappedcid;
    }




    }

