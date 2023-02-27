/*
  23-02-09 JPQL을 이용하여 좋아요 순으로 영화 조회 하도록 재설계(오병주)
  23-02-10 영화 세부내용을 위한 메소드 설계(오병주)
 */
package com.movie.Spring_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Long> {

    // 모든 영화 조회 메소드(좋아요 순으로 내림차순 --> 나중에 예매율로 바꿔야함)
    @Query(value = "SELECT m FROM MovieEntity as m " +
                   "ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findAllDESC();

    // 사용자가 영화 검색시 조회 메소드(좋아요 순으로 내림차순 --> 나중에 예매율로 바꿔야함)
    @Query(value = "SELECT m FROM MovieEntity as m " +
                   "WHERE m.mtitle LIKE CONCAT('%',:title,'%') " +
                   "ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findSearchDESC(@Param("title") String title);

    // 영화 Id를 이용한 검색 메소드
    MovieEntity findByMid(Long id);

    // 극장 클릭 시 영화 id list를 활용하여 검색
    @Query(value ="SELECT m ,'able' as able FROM MovieEntity as m where m.mid IN (:mid) ORDER BY m.cntMovieLike DESC")
    List<MovieEntity> findByMidInAble(@Param("mid") List<Long> mid);

    @Query(value ="SELECT m ,'disable' as disable From MovieEntity as m where m.mid NOT IN (:mid) ORDER BY m.cntMovieLike DESC" )
    List<MovieEntity> findByMidInDisAble(@Param("mid") List<Long> mid); 

}