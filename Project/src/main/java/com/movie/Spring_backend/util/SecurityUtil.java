// 23-01-16 Security 기본적인 설정 구현(오병주)
package com.movie.Spring_backend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

// SecurityContext의 유저 정보를 확인하는 클래스
public class SecurityUtil {

    // SecurityContext의 유저 정보중 id를 리턴해주는 메소드
    public static String getCurrentMemberId(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
}