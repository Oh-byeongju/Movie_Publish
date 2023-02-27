package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieInfoSeatRepository  extends JpaRepository<MovieInfoSeatEntity,Long> {
    @Query(value = "SELECT mis from MovieInfoSeatEntity as mis where mis.info.miid=(:miid)")
    @EntityGraph(attributePaths = {"seat","info", "seat.cinema","seat.cinema.theater","info.movie"})
    List<MovieInfoSeatEntity> findByInfoMovie(@Param("miid") Long miid);


    @Query(value = "SELECT count(mis) from MovieInfoSeatEntity as mis where mis.info.miid=(:miid)")
   List<Long> findByCount(@Param("miid") List<Long> miid);
}
