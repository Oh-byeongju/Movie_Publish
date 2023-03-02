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
          <ul className="MenuListLeft">
            <li className="topMenuLiLeft">
              <strong>
                영화  
              </strong>
            </li>
            <li className="topMenuLiLeft">
              <strong>
                예매
              </strong>
            </li>
            <li className="topMenuLiLeft">
              <strong>
                극장
              </strong>
            </li>
          </ul>
          <ul className="MenuListRight">
            <li className="topMenuLiRight">
              <strong>
                이벤트
              </strong>
            </li>
            <li className="topMenuLiRight">
              <strong>
                혜택
              </strong>
            </li>
            <li className="topMenuLiRight">
              <strong>
                개발진
              </strong>
            </li>
          </ul>
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
          <div className="menu_pan">
            <div className="layout">
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
                <div className="category">진행 이벤트</div>
                <div className="category">종료된 이벤트</div>
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
  height: 5.75rem;
  border-bottom: 1px solid #fff;
  background-color: black;
  z-index: 2;

  .logo {
    position: absolute;
    left: 50%;
    top: 0;
    width: 4.688rem;
    height: 5.625rem;
    margin: 0 0 0 -70px;
    padding: 0;
    background: url(/img/logo_black.jpg);
    background-size: cover;
    transform: translate(-50%, 0);
    margin: 0;

    a {
      display: block;
      width: 4.688rem;
      height: 5.625rem;
      margin: 0;
      padding: 0;
      font-size: 0;
      line-height: 0;
    }
  }

  .nav {
    position: relative;
    background-color: black;
    width: 100%;
  }

  .Top_left {
    position: absolute;
    top: 0.938rem;
    left: 13%;
    font-size: 0.8667em;
    font-family: NanumBarunGothic, Dotum, "돋움", sans-serif;
    transform: translate(-13%);
    a {
      color: #888;
      float: left;
      margin-right: 1.25rem;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }

  .Top_right {
    position: absolute;
    top: 0.938rem;
    right: 13%;
    font-size: 0.8667em !important;
    font-family: NanumBarunGothic, Dotum, "돋움", sans-serif !important;
    transform: translate(13%);
    a {
      margin-top: 0.075rem;
      color: #888;
      float: left;
      margin-right: 1.25rem;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
    button {
      color: #888;
      float: left;
      margin-right: 1.25rem;
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
      margin-top: 0.088rem;
      color: #888;
      float: left;
      margin-right: 0.938rem;
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
    top: 75%;
    left : 10.5%;
    width: 36px;
    transform: translate(-10.5%, -75%);
  }

  .RightIcon {
    display: flex;
    position: absolute;
    top: 75%;
    right : 13%;
    width: 36px;
    transform: translate(13%, -75%);
  }

  .MenuListLeft {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 100%;
    left : 28%;
    transform: translate(-28%, -95%);
    display : flex;
    width: 23%;

    :hover ~ .menu_pan{
      display: block;
    }
      // translate는 좌우, 상하
    .topMenuLiLeft {
      list-style-type: none;
      width: 33.3%;
      float: left;
      height: 40px;

      strong {
        cursor: pointer;
        font-weight: 500;
      }
    }
  }

  .MenuListRight {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 100%;
    right : 28%;
    transform: translate(28%, -95%);
    display : flex;
    width: 23%;

    :hover ~ .menu_pan{
      display: block;
    }

    .topMenuLiRight {
      list-style-type: none;
      width: 33.3%;
      float: right;
      height: 40px;

      strong {
        cursor: pointer;
        font-weight: 500;
      }
    }
  }

  .menu_pan {
    width: 100%;
    position: absolute;
    font-size: 15px;
    display: none;
    z-index: 999;
    top: 93px;
    background-color: black;
    &:hover {
      display: block;
    }
  }

  .layout {
    position: relative;
    height: 204px;
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
    position: absolute;
    left: 22%;
    transform: translate(-22%);
  }

  .menu_category:nth-child(2) {
    position: absolute;
    left: 35%;
    transform: translate(-35%);
  }

  .menu_category:nth-child(3) {
    position: absolute;
    left: 47%;
    transform: translate(-47%);
  }

  .menu_category:nth-child(4) {
    position: absolute;
    left: 60%;
    transform: translate(-60%);
  }

  .menu_category:nth-child(5) {
    position: absolute;
    left: 73%;
    transform: translate(-73%);
  }

  .menu_category:nth-child(6) {
    position: absolute;
    left: 84%;
    transform: translate(-84%);
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

  a {
    text-decoration: none;
    color: white;
  }
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
