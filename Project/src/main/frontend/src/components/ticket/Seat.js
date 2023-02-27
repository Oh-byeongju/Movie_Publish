import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { style } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { set } from "date-fns";
import {
  SEAT_CHOICE,
  SEAT_REMOVE,
  USER_CHOICE,
  USER_REMOVE,
  PAGE_RESET,
  SELECT_SEAT_REQUEST,
  SELECT_INFOSEAT_REQUEST,
} from "../../reducer/seat";
import SeatButton from "./SeatButton";
import { Schedule } from "@mui/icons-material";

const ButtonGroup = Button.Group;
const Seat = () => {
  const [numAdult, setNumAdult] = useState(0); //어른
  const [numTeenager, setNumTeenager] = useState(0); //학생
  const [numKid, setNumKid] = useState(0); //애기
  const [selectedUser, setSelectedUser] = useState([]); //선택한 값
  const [priceInfo, setPriceInfo] = useState([]); //값 더하기 //여기 배열로 값을 저장
  const [selectedRows, setSelectedRows] = useState([]);
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const [isChecked, setIschecked] = useState(true);

  const { rows, choiceSeat, selectseat, selectinfoseat, ocuppyseat } =
    useSelector((state) => state.seat);
  const { movieData, theaterData, DayData, scheduleData } = useSelector(
    (state) => state.ticket
  );
  //결국 데이터를 받아오려면 한번에 다 받아와야함{location: A1,A id:2}2,A3,A4,A5,A6~B1,B2,B3,B4,B5,B6 이런식
  // 열의 차이를 줘야함 그리고 점유 확인, id값을 받아오고
  const dispatch = useDispatch();
  let is_reserved;

  useEffect(() => {
    if (
      LOGIN_data !== "" &&
      movieData !== "" &&
      theaterData !== "" &&
      DayData !== "" &&
      scheduleData !== ""
    ) {
      dispatch({
        type: SELECT_SEAT_REQUEST,
        data: scheduleData.cid,
      });
      dispatch({
        type: SELECT_INFOSEAT_REQUEST,
        data: scheduleData.miid,
      });
    }
    return () => {
      dispatch({
        type: PAGE_RESET,
      });
    };
  }, []);
  const totalNumber = numTeenager + numAdult + numKid; //셋이 더해 8 이 넘으면 안됨
  const plusHandlerAdult = () => {
    if (totalNumber < selectseat.length - selectinfoseat.length) {
      setNumAdult((prev) => prev + 1);
      dispatch({
        type: USER_CHOICE,
        data: "ADULT",
        price: 12000,
      });
    }
  };

  const plusHandlerTeenager = () => {
    if (totalNumber < selectseat.length - selectinfoseat.length) {
      setNumTeenager((prev) => prev + 1);
      dispatch({
        type: USER_CHOICE,
        data: "TEENAGER",
        price: 8000,
      });
    }
  };

  const plusHandlerKid = () => {
    if (totalNumber < selectseat.length - selectinfoseat.length) {
      setNumKid((prev) => prev + 1);
      dispatch({
        type: USER_CHOICE,
        data: "KID",
        price: 6000,
      });
    }
  };

  const minusHandlerAdult = () => {
    if (totalNumber <= choiceSeat.length) {
      alert("선택한 좌석이 예매 인원 보다 많습니다.");
    } else if (numAdult) {
      setNumAdult((prev) => prev - 1);
      dispatch({
        type: USER_REMOVE,
        data: "ADULT",
        price: 12000,
      });
    }
  };
  const minusHandlerTeenager = () => {
    if (totalNumber <= choiceSeat.length) {
      alert("선택한 좌석이 예매 인원 보다 많습니다.");
    } else if (numTeenager) {
      setNumTeenager((prev) => prev - 1);
      dispatch({
        type: USER_REMOVE,
        data: "TEENAGER",
        price: 8000,
      });
    }
  };

  const minusHandlerKid = () => {
    if (totalNumber <= choiceSeat.length) {
      alert("선택한 좌석이 예매 인원 보다 많습니다.");
    } else if (numKid) {
      setNumKid((prev) => prev - 1);
      dispatch({
        type: USER_REMOVE,
        data: "KID",
        price: 6000,
      });
    }
  };

  const addSeats = (row) => {
    if (totalNumber > selectedRows.length) {
      setSelectedRows((prev) => [...prev, row]);
      dispatch({
        type: SEAT_CHOICE,
        data: {
          user_id: 1,
          seat_id: row.sid,
          location: row.sname,
        },
      });
    }
  };

  const removeSeats = (seat) => {
    setSelectedRows((prev) =>
      prev.filter((choiceSeat) => choiceSeat.sid !== seat)
    );
    dispatch({
      type: SEAT_REMOVE,
      data: seat,
    });
  };
  return (
    <SeatWrapper>
      <SeatContent>
        <Title
          onClick={() => {
            console.log("selecteduser : " + selectedUser);
            console.log("princeinfo : " + priceInfo);
          }}
        >
          인원 / 좌석
        </Title>
        <PersonScreen>
          <NumberOfPeople>
            <NumberContainer>
              <People>
                <span>유아</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button
                    onClick={minusHandlerKid}
                    icon={<MinusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <Button
                    value={numKid}
                    style={{
                      width: "52px",
                      paddingLeft: "18px",
                    }}
                  >
                    {numKid}
                  </Button>
                  <Button
                    onClick={plusHandlerKid}
                    icon={<PlusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                </ButtonGroup>
              </People>
              <People>
                <span>학생</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button
                    onClick={minusHandlerTeenager}
                    icon={<MinusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <Button
                    disable="disable"
                    value={numTeenager}
                    style={{
                      width: "52px",
                      paddingLeft: "18px",
                    }}
                  >
                    {numTeenager}
                  </Button>
                  <Button
                    onClick={plusHandlerTeenager}
                    icon={<PlusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                </ButtonGroup>
              </People>
              <People>
                <span>어른</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button
                    onClick={minusHandlerAdult}
                    icon={<MinusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <Button
                    disable="disable"
                    value={numAdult}
                    style={{
                      width: "52px",
                      paddingLeft: "18px",
                    }}
                  >
                    {numAdult}
                  </Button>
                  <Button
                    onClick={plusHandlerAdult}
                    icon={<PlusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                </ButtonGroup>
              </People>
            </NumberContainer>
          </NumberOfPeople>
          <MovieInfo>
            <Movie></Movie>
          </MovieInfo>
        </PersonScreen>
        <ScreenSelect>
          <Screen></Screen>

          <SeetReserve>
            {selectseat.map((seat, index) => {
              is_reserved = false;
              selectinfoseat.find((info) => {
                if (info.seat.sid === seat.sid) {
                  is_reserved = true;
                }
              });
              ocuppyseat.find((ocuppy) => {
                if (
                  scheduleData.miid === ocuppy.miid &&
                  seat.sid === ocuppy.seatid
                ) {
                  console.log(ocuppy.miid);
                  is_reserved = true;

                  //초기화시키기 점유된 영화가있을경우
                }
              });

              return (
                <div>
                  <SeatButton
                    seat={seat}
                    key={seat.sid}
                    addSeats={addSeats}
                    is_reserved={is_reserved}
                    totalNumber={totalNumber}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    removeSeats={removeSeats}
                    choiceSeat={choiceSeat}
                  />
                </div>
              );
            })}
          </SeetReserve>
        </ScreenSelect>
      </SeatContent>
    </SeatWrapper>
  );
};

const SeatWrapper = styled.div`
  display: block;
  min-height: 710px;
  width: 930px;
  height: 100%;
  padding-left: 10px;
`;
const SeatContent = styled.div`
  float: none;
  width: 100%;
  min-height: 528px;
  position: relative;
  float: left;
  height: 100%;
  margin-left: 2px;
  background-color: #f2f0e5;
  overflow: hidden;
  left: 280px;
`;

const Title = styled.div`
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background-color: #333333;
  color: white;
  font-weight: bold;
`;

const ScreenSelect = styled.div`
  display: flex;
  min-height: 600px;
  width: 100%;
`;

const SeetReserve = styled.div`
  width: 420px;
  height: 100%;
  padding-left: 250px;
  position: absolute;
  top: 250px;
`;
const Screen = styled.div`
  background-color: #fff;
  position: absolute;
  margin-top: 30px;
  left: 250px;
  width: 420px;
  height: 80px;
  transform: rotateX(-20deg);
  box-shadow: 0 3px 10px rgb(255 255 255 / 70%);
`;

const PersonScreen = styled.div`
  position: relative;
  border-bottom: 2px solid #d4d3c9;
  display: inline-block;
  width: 100%;
`;
const MovieInfo = styled.div`
  width: 100%;
`;
const Movie = styled.div``;
const NumberOfPeople = styled.div`
  width: 100%;
`;
const NumberContainer = styled.div`
  min-height: 52px;
  padding: 10px 0 10px 20px;
  background-color: #f2f4f5;
  border: 1px solid #d8d9db;
`;
const People = styled.div`
  display: block;
  float: left;
  position: relative;
  left: 200px;
  top: 10px;
  padding-right: 30px;
`;

export default Seat;
