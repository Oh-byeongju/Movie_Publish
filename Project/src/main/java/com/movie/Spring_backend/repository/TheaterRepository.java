package com.movie.Spring_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TheaterEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
    List<TheaterEntity> findAll();

    List <TheaterEntity> findByTidIn(List<Long> tid);

    List <TheaterEntity> findByTidNotIn(List<Long> tid);

    List <TheaterEntity> findByTidInAndTarea(List<Long> id, String area);


}