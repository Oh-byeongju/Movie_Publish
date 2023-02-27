package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieActorEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieActorRepository extends JpaRepository<MovieActorEntity, Long> {

    // movie id로 엔티디 값 들고오는 메소드
    List<MovieActorEntity> findByMovie(MovieEntity movie);
}
