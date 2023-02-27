package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.MovieInfoMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor

public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;
    private final MovieRepository movieRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final MovieInfoMapper movieInfoMapper;

    private final JwtValidCheck jwtValidCheck;
    @Transactional
    public List<MovieInfoDto> findAllMiday() {
            List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
    }


    //movieinfo에서 movie 데이터를 받아서 cid 추출하는 서비스
    @Transactional
    public Set<Long> findByMovie(Long id){
        //외래키로 엔티티 검색 위해 매핑
        MovieEntity movieEntity= MovieEntity.builder().mid(id).build();
        List<MovieInfoEntity> datas = movieInfoRepository.findByMovie(movieEntity);

        Set<Long> mappedcid = new HashSet<>();
        //cid 추출
        for(MovieInfoEntity cc :datas){
            mappedcid.add(cc.getCinema().getCid());
        }
        return mappedcid;
        //cid 추출
    }
    //영화로 날짜 검색
    @Transactional
    public List<MovieInfoDto> findByMovieToDay(Long id){
        //외래키로 엔티티 검색 위해 매핑

        List<MovieInfoEntity> datas = movieInfoRepository.findByMovieToDay(id);

      return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }






    //~ing
    //극장 in 데이터 검색
    @Transactional
    public List<MovieInfoDto> findByCinemaCidIn(List<Long> cid){
        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidIn(cid);
        if(!datas.isEmpty()){
            List<MovieInfoDto> datad = datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
            return datad;
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }

    //극장과 영화로 데이터 추출
    @Transactional
    public List<MovieInfoDto> findByMovieTheaterDay(List<Long> cid, Long mid){

        List<MovieInfoEntity> datas= movieInfoRepository.findByCinemaCidInAndMovieMid(cid, mid);
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }

    @Transactional
    public List<Long> findByMidayToMid(Date miday){
        List<MovieInfoEntity> datas = movieInfoRepository.findByMiday(miday);
        //여기서 mid를 추출
        List<Long> mid = new ArrayList<>();
        for(MovieInfoEntity mm :datas){
            mid.add(mm.getMovie().getMid());
        }

     return mid;

    }
    @Transactional
    public Set<Long> findByMidayToCid(Date miday){
        List<MovieInfoEntity> datas = movieInfoRepository.findByMiday(miday);
        //여기서 mid를 추출
        Set<Long> cid = new HashSet<>();
        for(MovieInfoEntity mm :datas){
            cid.add(mm.getCinema().getCid());
        }

        return cid;

    }

    @Transactional
    public List<Long> findByMidayAndCinemaCidIn(Date miday, List<Long> cid){
        List<MovieInfoEntity> datas= movieInfoRepository.findByMidayAndCinemaCidIn(miday,cid);
        //여기서 mid를 추출

        List<Long> mid = new ArrayList<>();
        for(MovieInfoEntity mm :datas){
            mid.add(mm.getMovie().getMid());
        }
        return mid;
    }
    @Transactional
    public List<Long> findByMidayAndMovieMid(Date miday, Long mid){
        List<MovieInfoEntity> datas=movieInfoRepository.findByMidayAndMovieMid(miday,mid);

        List<Long> cid= new ArrayList<>();
        for(MovieInfoEntity mm :datas){
            cid.add(mm.getCinema().getCid());
        }
        return cid;
    }

    @Transactional
    public List<MovieInfoDto> findBySchedule(Date miday, Long mid, List<Long> cid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findBySchedule(miday, mid, cid);

        return datas.stream().map(data -> movieInfoMapper.CountDto(data,data.getCinema().getCid(),data.getCinema().getCname(),data.getCinema().getCtype(),data.getCntSeatInfo(),data.getCinema().getCseat())).collect(Collectors.toList());

    }
}