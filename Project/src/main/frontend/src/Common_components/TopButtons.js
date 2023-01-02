import React, {useState} from 'react';
import styled from "styled-components";
import {
  MenuOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LoginModal from '../Login_components/LoginModal';

const TopButtons = () => {

	// 로그인 시 뜨는 모달창 on/off용 변수 및 함수
	const [login, setlogin] = useState(false);
	const toggle_login = () => setlogin(true);

	return (
  <>
		<div>
			{/* login변수와 Login모달창을 앤드로 묶어서 상태관리 */}
			{login && <LoginModal setlogin = {setlogin}/>}
		</div>
		<NavBar>
			<div className="nav">
				<div className="Top_left">
					<a href="./">VIP LOUNGE</a>
					<a href="./">멤버쉽</a>
					<a href="./">고객센터</a>
				</div>
				<div className="Top_right">
					<button onClick={toggle_login}>
						로그인
					</button>
					<a href="./">회원가입</a>
				</div>
				<h2 className="logo">
					<a href="./">
					</a>
				</h2>
				<div className="LeftIcon">
					<Button style ={{marginRight: "5px"}}>
						<MenuOutlined style={{ fontSize: "25px", marginRight: "15px", color: 'white' }} />
					</Button>
					<Button>
						<SearchOutlined style={{ fontSize: "25px", color: 'white' }} />
					</Button>
				</div>
				<div className="Menu">
					<ul className="MenuList">
						<li className="topMenuLi">
							<a href="./">
								영화
							</a>
							<ul className="submenu">
								<li>
									<a href="./" className="submenuLink longLink">
										전체영화
									</a>
								</li>
								<li>
									<a href="./" className="submenuLink longLink">
										큐레이션
									</a>
								</li>
								<li>
									<a href="./" className="submenuLink longLink">
										포스터
									</a>
								</li>
							</ul>
						</li>
						<li className="topMenuLi">
							<a href="./">
								예매
							</a>
							<ul className="submenu">
								<li>
									<a href="./" className="submenuLink longLink">
										영화예매
									</a>
								</li>
								<li>
									<a href="./" className="submenuLink longLink">
										상영시간
									</a>
								</li>
							</ul>
						</li>
						<li className="topMenuLi">
							<a href="./">
								극장
							</a>
							<ul className="submenu">
								<li>
									<a href="./" className="submenuLink longLink">
										극장검색
									</a>
								</li>
								<li>
									<a href="./" className="submenuLink longLink">
										특별관
									</a>
								</li>
							</ul>
						</li>
						<li className="topMenuLi">
							<a href="./">
								이벤트
							</a>
							<ul className="submenu">
								<li className='long_text'>
									<a href="./" className="submenuLink longLink">
										진행중 이벤트
									</a>
								</li>
								<li className='long_text2'>
									<a href="./" className="submenuLink longLink">
										당첨자 발표
									</a>
								</li>
							</ul>
						</li>
						<li className="topMenuLi">
							<a href="./">
								혜택
							</a>
							<ul className="submenu">
								<li>
									<a href="./" className="submenuLink longLink">
										멤버쉽
									</a>
								</li>
								<li>
									<a href="./" className="submenuLink longLink">
										할인정보
									</a>
								</li>
							</ul>
						</li>
						<li className="topMenuLi">
							<a href="./">
								개발진
							</a>
						</li>
					</ul>
				</div>
				<div className="RightIcon">
					<Button style = {{marginRight: "5px"}}>
						<CalendarOutlined	style={{ fontSize: "25px", marginRight: "15px", color: "white" }}/>
					</Button>
					<Button>
						<UserOutlined style={{ fontSize: "25px", color: "white" }} />
					</Button>
				</div>
			</div>
		</NavBar>
	</>
	)
};

const NavBar = styled.div`
position: relative;
display: flex;
width: 100%;
color: white;
text-align: center;
justify-content: center;
height: 92px;
border-bottom: 1px solid rgba(255,255,255, .2);

.logo {
	position: absolute;
	left: 51.5%;
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
	font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;

	a {
		color: #888;
		float: left;
		margin-right: 20px;
		text-decoration: none;
		:hover{
 			text-decoration : underline;
		}
	}
}

.Top_right {
	position: absolute;
	top: 15px;
	right: 0;
	font-size: 0.8667em !important;
	font-family: NanumBarunGothic,Dotum,'돋움',sans-serif !important;

	a {
		margin-top: 1.3px;
		color: #888;
		float: left;
		margin-right: 20px;
		text-decoration : none;
		:hover{
 			text-decoration : underline;
		}
	}

	button {
		color: #888;
		float: left;
		margin-right: 20px;
		text-decoration : none;
		background-color: black;
		padding: 0;
		border: 0;
		cursor: pointer;
		:hover{
 			text-decoration : underline;
		}
	}
}

.LeftIcon {
	display: flex;
	position: absolute;
	top: 50px;
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

.submenuLink {
	border: solid 1px black;
	margin-right: -1px;
	font-size: 14px;
}

.submenuLink_longtext {
	border: solid 1px black;
	margin-right: -1px;
	font-size: 14px;
	width: 555px;
}

.submenu {
	/* 하위 메뉴 스타일 설정 */
	position: absolute;
	height: 0px;
	overflow: hidden;
	right: -305px;
	top: 50px;
	transition: height 0.2s;
	-webkit-transition: height 0.2s;
	-moz-transition: height 0.2s;
	-o-transition: height 0.2s;
	width: 550px;
	/* [변경] 가로 드랍다운 메뉴의 넓이 */
}

.submenu li {
	display: inline-block;
	margin-right: 1px;
	/* [변경] 가로로 펼쳐지도록 설정 */
}

.topMenuLi {
	font-size: 18px;
}

.topMenuLi:hover {
	color: #FFF;
  border-bottom: 3px solid #FFF;
}

.topMenuLi:hover .submenu {
	/* 상위 메뉴에 마우스 모버한 경우 그 안의 하위 메뉴 스타일 설정 */
	height: 32px;
	/* [변경] 높이를 32px로 설정 */
}

.submenuLink:hover {
	/* 하위 메뉴의 a 태그의 마우스 오버 스타일 설정 */
	color: #FFF;
  border-bottom: 1px solid #FFF;
}
.Menu {
	position: relative;
	width: 100%;
	margin: 90px auto 0 auto;
	.MenuList {
		position: absolute;
		top: -53px;
		li {
			list-style-type: none;
			width: 60px;
			position: absolute;
			height: 38px;
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
.long_text {
	list-style-type: none;
	width: 90px !important;
	position: absolute;
	height: 38px;
}
.long_text2 {
	list-style-type: none;
	width: 90px !important;
	position: absolute;
	height: 38px;
	margin-left: 20px !important;
}
// 서브 메뉴가 길경우 사용하면 됨 
// ex) 이벤트의 하위 메뉴는 6글자, 5글자라서 이 클래스이름 사용
`;

const Button = styled.button`
	content: "";
	cursor: pointer;
	background-color: black;
	padding: 0;
	margin: 0;
	border: 0;
`;

export default TopButtons;