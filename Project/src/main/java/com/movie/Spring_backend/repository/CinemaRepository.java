package com.movie.Spring_backend.repository;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Set;

@Repository
public interface CinemaRepository extends JpaRepository<CinemaEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
    //엔티티의 CRUD 기능 사용할 수 있게 해준다.
    @Query("SELECT c FROM CinemaEntity as c JOIN FETCH c.theater WHERE c.cid IN (:cid) ")
     public List<CinemaEntity> findByCidIn(@Param("cid") Set<Long> cid);


    @Query("SELECT c FROM CinemaEntity as c JOIN FETCH c.theater WHERE c.cid NOT IN (:cid) ")
    public List<CinemaEntity> findByCidNotIn(@Param("cid") Set<Long> cid);


     public List<CinemaEntity> findByTheater(TheaterEntity id);

    public List<CinemaEntity> findByCidIn(@Param("cid") List<Long> cid);
}
//디비접근

