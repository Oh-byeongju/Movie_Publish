// 23-01-13 아이디 중복 검사 메소드 구현(오병주)
// 23-01-16 아이디 검색을 위한 메소드 구현(오병주)
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    // 아이디 중복 검사를 위한 select
    boolean existsByUid(String uid);
    // 아이디를 검색하는 select
    Optional<MemberEntity> findByUid(String uid);
}
