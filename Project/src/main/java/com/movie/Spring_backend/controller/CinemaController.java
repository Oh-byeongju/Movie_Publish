package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.movie.Spring_backend.dto.CinemaDto;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServlet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class CinemaController {
    //리액트 -> 컨트롤러 전달
    private final CinemaService cinemaservice;
    private final MovieInfoRepository movieInfoRepository;
    private final MovieService movieService;

    //끝
    //옮기기 서비스로 이상x
    private final MovieInfoService movieInfoService;
    @GetMapping("/normal/theatertomovie")
    public List<MovieDto> getData(@RequestParam Long id) {
        return cinemaservice.findByTheater(id);
    }

    //극장 선택 시 영화 목록 전송
    //able, disable
}