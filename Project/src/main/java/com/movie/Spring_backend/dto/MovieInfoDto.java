package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@NoArgsConstructor
public class MovieInfoDto {

    private Long miid;

    private Date miday;
    private String mistarttime;

    private String miendtime;

    private MovieEntity movie;

    private CinemaEntity cinema;

    private Long cid;
    private String type;
    private String name;
    private Integer allcount; //전체 좌석
    private Integer count;   // 점유 좌석
    @Builder
    public MovieInfoDto(Long miid, Date miday, String mistarttime, String miendtime, MovieEntity movie, CinemaEntity cinema,
                        Long cid,  String name,      String type,  Integer allcount,  Integer count) {
        this.miid= miid;
        this.miday=miday;
        this.mistarttime=mistarttime;
        this.miendtime=miendtime;
        this.movie=movie;
        this.cinema=cinema;
        this.cid=cid;
        this.name=name;
        this.type=type;
        this.allcount=allcount;
        this.count=count;
    }


}
