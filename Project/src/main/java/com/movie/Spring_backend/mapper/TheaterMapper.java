package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.TheaterEntity;
import org.springframework.stereotype.Component;

@Component

public class TheaterMapper {


    public TheaterDto toDto(TheaterEntity entity) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .build();
    }
    public TheaterDto toAble(TheaterEntity entity) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .able("able").build();
    }

    public TheaterDto toDisable(TheaterEntity entity,int count) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return TheaterDto.builder().tid(entity.getTid()).tname(entity.getTname())
                .taddr(entity.getTaddr()).tarea(entity.getTarea())
                .able("disable").count(count).build();
    }
}
