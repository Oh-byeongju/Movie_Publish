package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.SeatEntity;
import com.movie.Spring_backend.exceptionlist.SeatOccupyException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.OcuppyMapper;
import com.movie.Spring_backend.repository.SeatRepository;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SeatService {
    private final SeatRepository seatRepository;

    public List<SeatDto> findBySeat(Long id){

        List<SeatEntity> datas = seatRepository.findByCinemaCid(id);

        return datas.stream().map(data -> SeatDto.builder().sid(data.getSid()).sname(data.getSname())
                .build()).collect(Collectors.toList());
    }
    private final RedisTemplate redisTemplate; //redis
    private final JwtValidCheck jwtValidCheck;
    public List<OcuppyMapper> setValues(String name, String age , HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");
        List<OcuppyMapper> array2 = new ArrayList<>();
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        String [] SeatNumber = age.split(",");
        for(String k :SeatNumber){
            String keys="";
            keys =name+","+k;
            try{
            if(!redisTemplate.hasKey(keys)){ //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                System.out.println("key 가 없습니다.");
                //키 set                  values.set(keys, "hello", Duration.ofMinutes(1)); // 1분 뒤 메모리에서 삭제된다.
            }
            else {
                throw new SeatOccupyException("점유된 좌석입니다."); //키가 있으면 종료 시킴
            }
            }
            catch(SeatOccupyException e){
                System.out.println("에러메세지:" + keys);
                e.printStackTrace();
                array2.add(new OcuppyMapper( Long.parseLong(name),  Long.parseLong(k)));
            }


        }
        if(array2.isEmpty()==true) {
            for (String k : SeatNumber) {
                String keys = "";
                keys = name + "," + k;
                if (!redisTemplate.hasKey(keys)) { //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                    System.out.println("key 삽입");
                    values.set(keys, "hello", Duration.ofMinutes(1)); // 1분 뒤 메모리에서 삭제된다.
                } else {
                    throw new SeatOccupyException("점유된 좌석입니다."); //한번더 검사
                }
            }
        }
        else{
            System.out.println("비었다");
        }
        for (OcuppyMapper t : array2){
            System.out.println(t.getMiid()+ "," +t.getSeatid());
        }
        return array2;
    }
    // 데이터 가져오기
    public String getValues(){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        return setOperations.toString();
    }

}
