package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class ReservationDto {
    private Long rid;
    private Date rdate;
    private Long rpice;
    private MovieInfoEntity miid;
    private MemberEntity uid;

    @Builder
    public ReservationDto(Long rid ,Date rdate, Long rpice, MovieInfoEntity miid, MemberEntity uid) {
        this.rid=rid;
        this.rdate=rdate;
        this.rpice=rpice;
        this.miid=miid;
        this.uid=uid;
    }
}