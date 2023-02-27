/*
 23-01-24 로그인 상태확인 구현(오병주)
 23-01-25 페이지 이동 구현(오병주)
 23-01-27 로그아웃 구현(오병주)
*/
import React, { useCallback } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  USER_LOGOUT_REQUEST,
} from "../../reducer/R_user_login";

const TopButtons = () => {
  // 로그인 상태확인용 리덕스 상태
  const dispatch = useDispatch();
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

  // 현재 페이지의 정보와 페이지 이동을 위해 선언 
  const location = useLocation();
  const navigate = useNavigate();	

  // 로그아웃 버튼을 눌렀을 때 실행되는 함수
  const onLogout = useCallback(() => {

    if (!window.confirm("로그아웃 시 메인화면으로 이동합니다.")) {
      return;
    };

    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    navigate(`/`);
    
  }, [dispatch, navigate]);

  // const [search, setSearch] = useState("");

  // const onChange = useCallback((e) => {
  //   setSearch(e.target.value);
  // }, []);

  // const onClick = useCallback(() => {
  //   console.log(search);
  // }, [search]);

  return (
    <>
      <NavBar>
        <div className="nav">
          <div className="Top_left">
            <Link to="/">VIP LOUNGE</Link>
            <Link to="/">멤버쉽</Link>
            <Link to="/">고객센터</Link>
          </div>
          {LOGIN_data.uname === '' || LOGIN_data.uname === "error!!" ? (
            <div className="Top_right">
              {/* 로그인으로 갈때는 이전 url의 주소를 넘겨줘야함 */}
              <Link to={`/UserLogin`} state={{ url: location.pathname}}>
                로그인
              </Link>
              <Link to="/UserJoin">회원가입</Link>
            </div>
          ) : (
            <div className="Top_right">
              <span>{LOGIN_data.uname}님 환영합니다.</span>
              <button onClick={onLogout}>로그아웃</button>
            </div>
          )}
          <h2 className="logo">
            <Link to="/" style={{ content: "" }}>
              홈버튼
            </Link>
          </h2>
          <div className="LeftIcon">
            {/*} <input
              type="text"
              name="search"
              onChange={onChange}
              value={search}
              placeholder="검색"
              style={{ outline: "none", border: "none", height: "30px" }}
            /> Input 다시 해야댐 일단 주석처리 
            */}
            <Button>
              <SearchOutlined style={{ fontSize: "25px", color: "white" }} />
            </Button>
          </div>
          <div className="Menu">
            <ul className="MenuList">
              <li className="topMenuLi">
                <Link to="/">영화</Link>
              </li>
              <li className="topMenuLi">
                <Link to="/">예매</Link>
              </li>
              <li className="topMenuLi">
                <Link to="/">극장</Link>
              </li>
              <li className="topMenuLi">
                <Link to="/">이벤트</Link>
              </li>
              <li className="topMenuLi">
                <Link to="/">혜택</Link>
                <div className="Black_SubMenu"></div>
              </li>
              <li className="topMenuLi">
                <Link to="/">개발진</Link>
              </li>
              <div className="menu_pan">
                <div className="w_1350">
                  <div className="menu_category">
                    <div className="title_category">영화</div>
                    <div className="category">
                      <Link to="/movie">전체영화</Link>
                    </div>
                    <div className="category">큐레이션</div>
                    <div className="category">무비포스트</div>
                  </div>
                  <div className="menu_category">
                    <div className="title_category">예매</div>
                    <div className="category">
                      {" "}
                      <Link to="/reserve">빠른예매</Link>
                    </div>
                    <div className="category">상영시간표</div>
                  </div>
                  <div className="menu_category">
                    <div className="title_category">극장</div>
                    <div className="category">전체극장</div>
                    <div className="category">특별관</div>
                  </div>
                  <div className="menu_category">
                    <div className="title_category">이벤트</div>
                    <div className="category">전체극장</div>
                    <div className="category">특별관</div>
                  </div>
                  <div className="menu_category">
                    <div className="title_category">혜택</div>
                    <div className="category">맴버쉽</div>
                    <div className="category">제휴할인</div>
                  </div>
                  <div className="menu_category">
                    <div className="title_category">개발진</div>
                    <div className="category">개발진</div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div className="RightIcon">
            <Button style={{ marginRight: "5px" }}>
              <CalendarOutlined
                style={{
                  fontSize: "25px",
                  marginRight: "15px",
                  color: "white",
                }}
              />
            </Button>
            <Button>
              <UserOutlined style={{ fontSize: "25px", color: "white" }} />
            </Button>
          </div>
        </div>
      </NavBar>
    </>
  );
};

const NavBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  color: white;
  text-align: center;
  justify-content: center;
  height: 92px;
  border-bottom: 1px solid #fff;
  background-color: black;
  z-index: 2;
  .logo {
    position: absolute;
    left: 53.5%;
    width: 75px;
    height: 90px;
    margin: 0 0 0 -70px;
    padding: 0;
    background: url(/img/logo_black.jpg);
    background-size: cover;
    a {
      display: block;
      width: 75px;
      height: 90px;
      margin: 0;
      padding: 0;
      font-size: 0;
      line-height: 0;
    }
    // 로고 누르면 홈으로 돌아가게끔 설정, 로고 이미지는 img 안에 있음
  }
  .nav {
    position: absolute;
    background-color: black;
    width: 1150px;
  }
  .Top_left {
    position: absolute;
    top: 15px;
    left: 0;
    font-size: 0.8667em;
    font-family: NanumBarunGothic, Dotum, "돋움", sans-serif;
    a {
      color: #888;
      float: left;
      margin-right: 20px;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
  .Top_right {
    position: absolute;
    top: 15px;
    right: 0;
    font-size: 0.8667em !important;
    font-family: NanumBarunGothic, Dotum, "돋움", sans-serif !important;
    a {
      margin-top: 1.2px;
      color: #888;
      float: left;
      margin-right: 20px;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
    button {
      color: #888;
      float: left;
      margin-right: 20px;
      text-decoration: none;
      background-color: black;
      padding: 0;
      border: 0;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
    span {
      margin-top: 1.4px;
      color: #888;
      float: left;
      margin-right: 15px;
      text-decoration: none;
      background-color: black;
      padding: 0;
      border: 0;
      font-weight: 600;
      font-family: NanumBarunGothic, Dotum, "돋움", sans-serif !important;
    }
  }
  .LeftIcon {
    display: flex;
    position: absolute;
    top: 50px;
    left: -40px;
    width: 36px;
    margin-left: 10px;
  }
  .RightIcon {
    display: flex;
    position: absolute;
    top: 50px;
    width: 36px;
    right: 50px;
  }
  .Menu {
    position: relative;
    width: 100%;
    margin: 90px auto 0 auto;
    .MenuList {
      position: relative;
      top: -40px;
      .topMenuLi:hover ~ .menu_pan {
        display: block;
      }
      .menu_pan {
        width: 1414px;
        position: absolute;
        left: -260px;
        top: 43px;
        z-index: 999;
        padding-left: 180px;
        font-size: 15px;
        display: none;
        background-color: black;
        &:hover {
          display: block;
        }
      }
      .menu_category {
        float: left;
        margin: 30px 0;
        transition: 0.2s ease-in-out;
        transform: translateY (-20px);
      }
      .menu_category .category {
        transition: 0.2s ease-in-out;
        transform: translateY (-20px);
      }
      .menu_category:nth-child(1) {
        position: relative;
        left: 150px;
      }
      .menu_category:nth-child(2) {
        position: relative;
        left: 170px;
      }
      .menu_category:nth-child(3) {
        position: relative;
        left: 190px;
      }
      .menu_category:nth-child(4) {
        position: relative;
        left: 210px;
      }
      .menu_category:nth-child(5) {
        position: relative;
        left: 230px;
      }
      .menu_category:nth-child(6) {
        position: relative;
        left: 250px;
      }
      .caterogy:nth-child(1) {
        font-weight: bold;
      }
      .category {
        padding: 9px 0px;
        margin-right: 100px;
        cursor: pointer;
      }
      .title_category {
        padding-right: 100px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .category:hover {
        text-decoration: underline;
      }
      li {
        list-style-type: none;
        width: 110px;
        position: absolute;
        height: 45px;
      }
      li:nth-child(1) {
        left: 176px;
      }
      li:nth-child(2) {
        left: 266px;
      }
      li:nth-child(3) {
        left: 356px;
      }
      li:nth-child(4) {
        left: 710px;
      }
      li:nth-child(5) {
        left: 820px;
      }
      li:nth-child(6) {
        left: 930px;
      }
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
  // 서브 메뉴가 길경우 사용하면 됨
  // ex) 이벤트의 하위 메뉴는 6글자, 5글자라서 이 클래스이름 사용
`;

const Button = styled.button`
  content: "";
  cursor: pointer;
  background-color: black;
  padding: 0;
  margin-left: 10px;
  border: 0;
`;

export default TopButtons;
