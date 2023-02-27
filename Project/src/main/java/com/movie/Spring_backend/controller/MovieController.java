package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/movie")

public class MovieController {
    private final MovieService movieService;

    // 전체 영화 가져오는 메소드
    @GetMapping("/normal/allmovie")
    public ResponseEntity<List<MovieDto>> AllMovie(@RequestParam("uid") String uid) {
        return ResponseEntity.ok().body(movieService.getAllMovie(uid));
    }

    // 사용자가 영화를 검색할때 사용되는 메소드
    @GetMapping("/normal/searchmovie")
    public ResponseEntity<List<MovieDto>> SearchMovie(@RequestParam(value = "title") String title, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getSearchMovie(title, uid));
    }

    // 영화 세부내용을 보여줄 때 사용되는 메소드
    @GetMapping("/normal/moviedetail/{mid}")
    public ResponseEntity<MovieDto> MovieDetail(@PathVariable("mid") Long mid, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getMovieDetail(mid, uid));
    }

    // 영화 세부내용의 관람평을 가져오는 메소드 (최신순)
    @GetMapping("/normal/recentcomment/moviedetail/{mid}")
    public ResponseEntity<List<CommentInfoDto>> MovieDetailCommentRecent(@PathVariable("mid") Long mid, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getMovieDetailCommentRecent(mid, uid));
    }

    // 영화 세부내용의 관람평을 가져오는 메소드 (공감순)
    @GetMapping("/normal/likecomment/moviedetail/{mid}")
    public ResponseEntity<List<CommentInfoDto>> MovieDetailCommentLike(@PathVariable("mid") Long mid, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.getMovieDetailCommentLike(mid, uid));
    }
}