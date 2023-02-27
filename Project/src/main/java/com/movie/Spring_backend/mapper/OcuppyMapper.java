package com.movie.Spring_backend.mapper;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Getter
@NoArgsConstructor
public class OcuppyMapper {
    private Long miid;
    private Long seatid;

    @Builder
    public OcuppyMapper(Long miid, Long seatid) {
        this.miid=miid;
        this.seatid=seatid;
    }
}
