package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.ReservationEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SeatDto {
    private Long sid;
    private String sname;

    private CinemaEntity cinema;
    @Builder
    public SeatDto(Long sid ,String sname, CinemaEntity cinema) {
        this.sid=sid;
        this.sname=sname;
        this.cinema=cinema;
    }
}
