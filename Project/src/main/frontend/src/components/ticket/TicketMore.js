import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  SELECT_SEAT_REQUEST,
  SELECT_INFOSEAT_REQUEST,
  CHECK_SEAT_REQUEST,
} from "../../reducer/seat";
import { Login } from "@mui/icons-material";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { PAYMENT_REQUEST, RESERVE_LOGIN_PAGE } from "../../reducer/ticket";

const TicketMore = ({ setPage, page }) => {
  const { movieData, theaterData, DayData, scheduleData } = useSelector(
    (state) => state.ticket
  );
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const { choiceSeat, choiceUser, price } = useSelector((state) => state.seat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  //사용자가 선택한 영화 및 정보를 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
  //좌석 페이지로 넘어가야함 데이터와 함께

  //제이쿼리 대신 선언
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  //
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init([["imp57612323"]]); // 결제 데이터 정의
    const date = new window.Date().getTime();
    IMP.request_pay(
      {
        pg: "kcp",
        pay_method: "card",
        merchant_uid: "merchant_" + date,
        name: "상품1", //결제창에서 보여질 이름
        amount: 100, //실제 결제되는 가격
        buyer_email: "iamport@siot.do",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울 강남구 도곡동",
        buyer_postcode: "123-456",
      },
      function (rsp) {
        if (rsp.success) {
          //[1] 서버단에서 결제정보 조회를 위해 imp_uid 전달하기

          dispatch({
            type: PAYMENT_REQUEST,
            data: rsp.imp_uid,
          }).done(function (data) {
            //[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
            if (rsp.success) {
              var msg = "결제가 완료되었습니다.";
              msg += "\n고유ID : " + rsp.imp_uid;
              msg += "\n상점 거래ID : " + rsp.merchant_uid;
              msg += "결제 금액 : " + rsp.paid_amount;
              msg += "카드 승인번호 : " + rsp.apply_num;

              alert(msg);
            } else {
              //[3] 아직 제대로 결제가 되지 않았습니다.
              //[4] 결제된 금액이 요청한 금액과 달라 결제를 자동취소처리하였습니다.
            }
          });
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;

          alert(msg);
        }
      }
    );
  };

  return (
    <TicketWrapper>
      <TicketStep page={page}>
        {movieData !== "" ? (
          <MoviePoster>
            <Poster>
              <Img
                className="imggg"
                src={`${movieData.imagepath}`}
                alt="영화"
              />
            </Poster>
            <Title>
              <span>{movieData.title}</span>
            </Title>
            <Title>{movieData.rating}세 관람가</Title>
          </MoviePoster>
        ) : (
          <MoviePoster>
            <Poster></Poster>
            <Title></Title>
          </MoviePoster>
        )}
        <MovieTheater>
          {theaterData !== "" ? (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                {theaterData.tarea} {theaterData.tname}점
              </span>
            </Name>
          ) : (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Name>
          )}
          <Date>
            <span>일시</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{DayData.miday}</span>
          </Date>
          {scheduleData !== "" ? (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span>
                {scheduleData.type} {scheduleData.name}
              </span>
            </Screen>
          ) : (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span></span>
            </Screen>
          )}
        </MovieTheater>
        <SeatMore>
          <Seat>
            좌석 :
            {choiceSeat.map((seat) => {
              return <span>&nbsp;{seat.location} </span>;
            })}
          </Seat>
          <Price>총금액 : {price}</Price>
        </SeatMore>
      </TicketStep>
      {page ? (
        <>
          <MovieChoice onClick={() => setPage(false)}>
            <ArrowCircleLeftIcon
              style={{
                width: "80px",
                height: "80px",
                left: "14px",
                position: "absolute",
              }}
            />
            <p>영화선택</p>
          </MovieChoice>
          <MovieSeat
            onClick={() => {
              if (choiceUser.length > choiceSeat.length) {
                alert("관람인원과 선택 좌석 수가 동일하지 않습니다.");
                return;
              } else {
                let seatnumber = "";
                choiceSeat.map((seat) => (seatnumber += seat.seat_id + ",")); //레디스
                dispatch({
                  type: CHECK_SEAT_REQUEST,
                  data: {
                    name: scheduleData.miid,
                    age: seatnumber,
                  },
                });
                onClickPayment();
              }
            }}
          >
            <ArrowCircleRightIcon
              style={{
                width: "80px",
                height: "80px",
                left: "14px",
                position: "absolute",
              }}
            />
            <p>결제하기</p>
          </MovieSeat>
        </>
      ) : (
        <MovieSeat
          onClick={() => {
            if (LOGIN_data.uid === "No_login") {
              if (
                !window.confirm(
                  "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
                )
              ) {
                return;
              } else {
                navigate(`/UserLogin`, {
                  state: {
                    pathname: pathname,
                    movie: movieData,
                    theater: theaterData,
                    Day: DayData,
                    schedule: scheduleData,
                  },
                });
                dispatch({
                  type: RESERVE_LOGIN_PAGE,
                });
              }
            } else if (
              LOGIN_data !== "" &&
              movieData !== "" &&
              theaterData !== "" &&
              DayData !== "" &&
              scheduleData !== ""
            ) {
              // setPage(true);
              // dispatch({
              //   type: SELECT_SEAT_REQUEST,
              //   data: scheduleData.cid,
              // });
              // dispatch({
              //   type: SELECT_INFOSEAT_REQUEST,
              //   data: scheduleData.miid,
              // });
              setPage(true);
              console.log("gg");
            }
          }}
        >
          <ArrowCircleRightIcon
            style={{
              width: "80px",
              height: "80px",
              left: "14px",
              position: "absolute",
            }}
          />
          <p>좌석선택</p>
        </MovieSeat>
      )}
    </TicketWrapper>
  );
};

const TicketWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 996px;
  height: 128px;
  background-color: #1d1d1c;
  color: white;
`;

const TicketStep = styled.div`
  margin: 0 auto;
  width: 996px;
  height: 108px;
  padding-top: 10px;
  padding-left: 150px;
  position: relative;

  left: ${(props) => (props.page === true ? "100px" : "0px")};
`;
const MoviePoster = styled.div`
  width: 180px;
  float: left;
  height: 108px;
  padding-right: 2px;
  padding-left: 20px;
  position: relative;
  color: #cccccc;
  font-size: 12px;
  font-weight: bold;
  border-right: 1px solid grey;
`;
const Poster = styled.span`
  float: left;
  width: 74px;
  height: 108px;
  line-height: 108px;
  margin-right: 11px;
  overflow: hidden;
`;
const Title = styled.div`
  margin-top: 14px;
  color: white;
`;
const MovieTheater = styled.div`
  width: 150px;
  float: left;
  height: 108px;
  padding-left: 20px;
  border-right: 1px solid grey;
  font-weight: bold;

  position: relative;
  color: #cccccc;
  font-size: 12px;
`;

const MovieChoice = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  left: 100px;
  width: 106px;
  height: 108px;
  cursor: pointer;
  margin-left: 180px;
  p {
    position: absolute;
    bottom: -10px;
    left: 23px;
    font-weight: bold;
  }
`;
const SeatMore = styled.div`
  width: 185px;
  float: left;
  height: 108px;
  padding-right: 2px;
  border-right: 1px solid grey;
  font-weight: bold;
  position: relative;
  color: #cccccc;
  font-size: 12px;
  padding-left: 10px;
`;
const Seat = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const Price = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const MovieSeat = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 300px;
  width: 106px;
  height: 108px;
  cursor: pointer;

  p {
    position: absolute;
    bottom: -10px;
    left: 23px;
    font-weight: bold;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: inline;
`;
const Name = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;

const Date = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const Screen = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;

export default TicketMore;
