package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.SeatOccupyException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.OcuppyMapper;
import com.movie.Spring_backend.mapper.SeatMapper;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.RedisSeatRepository;
import com.movie.Spring_backend.repository.SeatRepository;
import com.movie.Spring_backend.util.SortUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SeatService {
    private final RedisTemplate redisTemplate; //redis
    private final JwtValidCheck jwtValidCheck;
    private final RedisSeatRepository redisSeatRepository;
    private final SeatRepository seatRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final SeatMapper seatMapper;

    public List<SeatDto> findBySeat(Long id,Long miid) {

        List<SeatEntity> allDatas = seatRepository.findByCinemaCid(id);  //전체 시트
        List<MovieInfoSeatEntity> ocuppyDatas = movieInfoSeatRepository.findByInfoMovie(miid);
        //인포 시트 //점유된 좌석
        List<SeatEntity> ableDatas = new ArrayList<>();
        List<SeatEntity> disableDatas = new ArrayList<>();


        List<RedisSeatEntity> datad = redisSeatRepository.findAll();
        System.out.println(datad);
        List<String> abcd= new ArrayList<>();
        for (RedisSeatEntity r : datad) {
            if (r != null) {//null 값 제외하고 받아옴
                abcd.add(r.getMiid());
                System.out.println(abcd);
            }
        }
        //try catch대신 bollean으로 for문돌림
        for (SeatEntity s : allDatas) {
            boolean check=false;
            for (MovieInfoSeatEntity se : ocuppyDatas) {
                if (s.getSid() == se.getSeat().getSid()) {  //점유된좌석이면 점유된 좌석 배열에 넣음
                    ableDatas.add(s);
                    check=true;
                    break;
                }

            }
            if(check==false){
                disableDatas.add(s);  //점유된 좌석이 아닌것
            }
        }
        List<SeatDto> able = ableDatas.stream().map((seat) -> seatMapper.toAble(seat, "able")).collect(Collectors.toList());
        List<SeatDto> disable = disableDatas.stream().map((seat) -> seatMapper.toAble(seat, "disable")).collect(Collectors.toList());
        //able과 disalbe로 dto 매핑후 합침
        for (SeatDto seat : disable) {
            able.add(seat);
        }
        Collections.sort(able, new SortUtil()); //이 함수는 뒤죽박죽인 자리를 순서대로 되돌려둠
        return able;

    }

    public   List<RedisSeatEntity> setValues(String name, String age , HttpServletRequest request) {
        jwtValidCheck.JwtCheck(request, "ATK");
        List<OcuppyMapper> array2 = new ArrayList<>();
        String[] SeatNumber = age.split(",");
        for (String k : SeatNumber) {
            String keys = "";
            keys = "seat:" + name + "," + k;
            try {
                if (!redisTemplate.hasKey(keys)) { //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                    System.out.println("key 가 없습니다.");
                    //키 set                  values.set(keys, "hello", Duration.ofMinutes(1)); // 1분 뒤 메모리에서 삭제된다.
                } else {
                    throw new SeatOccupyException("점유된 좌석입니다."); //키가 있으면 종료 시킴
                }
            } catch (SeatOccupyException e) {
                System.out.println("에러메세지:" + keys);
                e.printStackTrace();
                array2.add(new OcuppyMapper(Long.parseLong(name), Long.parseLong(k)));
            }


        }
        if (array2.isEmpty() == true) {
            for (String k : SeatNumber) {
                String keys = "";
                keys = name + "," + k;
                if (!redisTemplate.hasKey(keys)) { //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                    System.out.println("key 삽입");
                    RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, k);
                    redisSeatRepository.save(redisSeatEntity);
                } else {
                    throw new SeatOccupyException("점유된 좌석입니다."); //한번더 검사
                }
            }
        } else {
            System.out.println("비었다");
        }

        //키 전체 검색
        List<RedisSeatEntity> datad = redisSeatRepository.findAll();
        System.out.println(datad);
        List<String> abcd= new ArrayList<>();
        for (RedisSeatEntity r : datad) {
            if (r != null) {//null 값 제외하고 받아옴
                abcd.add(r.getMiid());
                System.out.println(abcd);
            }
        }

        return datad;
    }

    // 데이터 가져오기
    public String getValues(){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        return setOperations.toString();
    }

}