package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    // 사용자 id와 영화정보 id를 이용하여 엔티티 조회하는 메소드
    List<ReservationEntity> findByMemberAndMovieInfoIn(MemberEntity member, List<MovieInfoEntity> movieInfos);
}
