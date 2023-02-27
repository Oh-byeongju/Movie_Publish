package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@NoArgsConstructor
public class CommentInfoDto {
    private Long umid;
    private Integer umscore;
    private String umcomment;
    private Date umcommenttime;
    private String uid;
    private Integer upcnt; // 현재 관람평의 좋아요 수
    private Boolean like;  // 사용자의 관람평 좋아요 여부

    @Builder
    public CommentInfoDto(Long umid, Integer umscore, String umcomment, Date umcommenttime,
                          String uid, Integer upcnt, Boolean like) {
        this.umid = umid;
        this.umscore = umscore;
        this.umcomment = umcomment;
        this.umcommenttime = umcommenttime;
        this.uid = uid;
        this.upcnt = upcnt;
        this.like = like;
    }
}