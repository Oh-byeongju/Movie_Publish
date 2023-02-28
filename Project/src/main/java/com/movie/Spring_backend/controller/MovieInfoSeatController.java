package com.movie.Spring_backend.controller;


import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.MovieInfoSeatDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.service.MovieInfoSeatService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/seat")
public class MovieInfoSeatController {

    private final MovieInfoSeatService movieInfoSeatService;

    @GetMapping("/normal/movieinfoseat")
    public List<MovieInfoSeatDto> findByInfoSeat( @RequestParam Long miid) {
        List<MovieInfoSeatDto> dataseat= movieInfoSeatService.findByInfoMovie(miid);
        return dataseat;
    }
/*
    @GetMapping("/normal/seatedRow")
    public List<MovieInfoDto> findCount (){

        return movieInfoSeatService.findCount();
    }*/
}
