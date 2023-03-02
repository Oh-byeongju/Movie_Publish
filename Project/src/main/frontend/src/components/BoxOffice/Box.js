/*
 23-02-02 css 수정 및 Like수 적용(오병주)
 23-02-08 사용자가 누른 Like 적용(오병주)
 23-02-15 페이지 css 수정(오병주)
*/
import React from "react";
import styled from "styled-components";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { USER_MLIKE_REQUEST } from "../../reducer/R_user_movie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Box = ({ movie }) => {

  // 반올림 없이 소수점 생성해주는 함수
  const getNotRoundDecimalNumber = (number, decimalPoint = 1) => {
    let num = typeof number === "number" ? String(number) : number;
    const pointPos = num.indexOf(".");
  
    if (pointPos === -1) return Number(num).toFixed(decimalPoint);
  
    const splitNumber = num.split(".");
    const rightNum = splitNumber[1].substring(0, decimalPoint);
    return Number(`${splitNumber[0]}.${rightNum}`).toFixed(decimalPoint);
  };

  // 리덕스 로그인 상태 정보
  const { LOGIN_data } = useSelector((state) => state.R_user_login)
  const dispatch = useDispatch();

  // 사용자가 보이는 like UI 변경을 위한 변수
  const [like, setlike] = useState(false);
  const [likes, setlikes] = useState("");

  useEffect(() => {
    setlike(movie.like);
    setlikes(movie.likes);
  },[movie]);

  // 사용자가 영화의 좋아요를 누를 때 호출되는 함수
  const LikeChange = useCallback(() => {
    if (LOGIN_data.uid === 'No_login') {
      alert("로그인이 필요한 서비스입니다.")
      return;
    }   

    dispatch({
      type: USER_MLIKE_REQUEST,
      data: {
        mid: movie.id,
        mlike: like,
        uid: LOGIN_data.uid
      }
    })

    // 백엔드를 한번 더 호출하지 않고 like와 likes의 변수만 변경하여 사용자가 보고 있는 브라우저 UI를 변경
    if (like) {
      setlike(false);
      setlikes(likes - 1);
    }
    else {
      setlike(true);
      setlikes(likes + 1);
    }
  }, [movie.id, LOGIN_data.uid, like, likes, dispatch]);

  return (
    <LI>
      <div className="Image">
        <div className="banner_img">
          <Link to={`/moviedetail/${movie.id}`}>
            <Img
            className="imggg"
            src={`${movie.imagepath}`}
            alt="영화"
            />
          </Link>
          <div className="middle">
            <Link to={`/moviedetail/${movie.id}`}>
              <Text className="hover_text">
                상세정보
              </Text>
              <TextScore>
                관람평 : &nbsp;<span>{movie.score ? movie.score.toFixed(1) : 0.0.toFixed(1)}</span>
              </TextScore> 
            </Link>
          </div>
        </div>
        <Button>
          <Like onClick={LikeChange}>
            <span>
              {like === true ? <HeartFilled style={{color: "red"}} /> : <HeartOutlined />}
            </span>
            <span>
              {likes > 999 ? getNotRoundDecimalNumber(likes / 1000) + "K" : likes}
            </span>
          </Like>
          <Ticket>
            예매
          </Ticket>
        </Button>
      </div>
    </LI>
  );
};

const LI = styled.li`
  float: left;
  padding-right: 105px;
  width: 250px;
  height: 420px;

  .banner_img {
    position: relative;

    .middle {
      transition: 0.5s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    &:hover .imggg {
      filter: brightness(0.2);
    }

    &:hover .middle {
      opacity: 1;
    }
  }
`;

const Img = styled.img`
  opacity: 1;
  display: block;
  width: 100%;
  height: 370px;
  transition: 0.5s ease;
  backface-visibility: hidden;
  cursor: pointer;
  border-radius: 10px;
`;

const Text = styled.div`
  position: absolute;
  width: 200px;
  top: -42px;
  left: -127px;
  color: white;
  font-size: 18px;
  padding: 16px 32px;
  cursor: pointer;
  border-color: #fff;
  text-decoration : underline;
`;

const TextScore = styled.div`
  position: absolute;
  width: 200px;
  top: -7px;
  left: -130px;
  color: white;
  font-size: 1em;
  padding: 16px 32px;
  cursor: pointer;
  border-color: #fff;
  font-weight: 500;

  span {  
    font-size: 1.5em;
    color: #00CCCC;
  }
`;

const Button = styled.div`
  position: absolute;
  display: flex;
  padding-top: 15px;
  width: 250px;
`;

const Like = styled.div`
  position: absolute;
  cursor: pointer;
  text-align: center;
  width: 64px;
  height: 33.4px;
  border: 1px solid;
  vertical-align: middle;
  margin: 0;
  line-height: 33.4px;
  border-radius: 4px;

  span:first-child {
    margin-right: 3px;
  }
`;

const Ticket = styled.button`
  margin: 0;
  padding-top: 0 !important;
  border-top: 0 !important;
  position: absolute;
  right: 0; 
  margin-left: 10px;
  text-align: center;
  width: 72%;
  padding-left: 10px;
  border-radius: 4px;
  height: 36px;
  text-align: center;
  background-color: white;
  cursor: pointer;
`; //예매하기 버튼

export default Box;
