// /*
//   추후 모달 UI에 사용
// */
// import React, { useState } from "react";
// import styled from "styled-components";
// import { CloseOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { USER_LOGIN_REQUEST } from '../../reducer/R_user_login';
// import { useLocation } from "react-router-dom";

// const LoginModal = ({ setlogin }) => {
//   const dispatch = useDispatch(); //useDispatch를 dispatch로 선언
//   const { LOGIN_data } = useSelector((state) => state.R_user_login);

//   // x버튼 클릭시 setlogin을 false로 해서 모달창을 닫음
//   const closeLogin = () => {
//     setlogin(false);
//   };

//   const [inputs, setInputs] = useState({
//     id: "",
//     pw: "",
//   }); //input창 두개 관리를 위해 만든것

//   const { id, pw } = inputs; // 비구조화 할당을 통해 값 추출

//   const onChange = (e) => {
//     const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
//     setInputs({
//       ...inputs, // 기존의 input 객체를 복사한 뒤
//       [name]: value, // name 키를 가진 값을 value 로 설정
//     });
//   };

//   // 로그인 버튼 누를 때 적용되는 함수
//   const submit = ()=> {
//     const datas = {
//       uid: id,
//       upw: pw
//     };

//     dispatch({
//       type: USER_LOGIN_REQUEST,
// 			data: datas
//     });

//     console.log(LOGIN_data.uname);

//     // LOGIN_status에 토큰이 담겨져 옴 이제 이걸 어떻게 쓰냐를 생각
//   };
 

//   // id, pw 입력에 따른 로그인 버튼 활성화 함수
//   const [isActive, setActive] = useState(true);

//   // id, pw 입력마다 실행되는 함수 (id, pw 둘다 빈칸이 아닌경우 로그인 버튼이 활성화됨)
//   const ActiveIsPassedLogin = () => {
//     console.log(LOGIN_data);
//     return id !== "" && pw !== "" ? setActive(false) : setActive(true);
//   };

//   return (
//     <>
//       <Modal>
//         <LoginLayout>
//           <div className="header_layout">
//             <LoginText>영화관 로그인</LoginText>
//             <Close onClick={closeLogin}>
//               <CloseOutlined style={{ fontSize: "25px", color: "white" }} />
//             </Close>
//           </div>
//           <ModalContents>
//             <LoginId
//               name="id"
//               type="text"
//               placeholder="아이디"
//               onChange={onChange}
//               value={id}
//               onKeyUp={ActiveIsPassedLogin}
//             ></LoginId>
//             <LoginPw
//               name="pw"
//               type="password"
//               placeholder="비밀번호"
//               onChange={onChange}
//               value={pw}
//               onKeyUp={ActiveIsPassedLogin}
//             ></LoginPw>
//             <LoginMid>
//               <label className="autoLogin" htmlFor="hint">
//                 {" "}
//                 <input type="checkbox" id="hint" /> 로그인 유지하기
//               </label>
//             </LoginMid>
//             <LoginButton onClick={submit} disabled={isActive}>
//               로그인
//             </LoginButton>
//             <Link>
//               <a href="/">회원가입</a>
//               <a href="/">ID/PW 찾기</a>
//               <a href="/">비회원 예매조회</a>
//             </Link>
//             <SocialBox>
//               <button className="kakao">
//                 <img
//                   style={{marginLeft: "5px"}}
//                   alt="kakao"
//                   className="kakaoLogo"
//                   src="/img/login/kakao.jpg"
//                 />
//                 <div className="kakaoText">카카오 계정으로 신규가입</div>
//               </button>
//               <button className="facebook">
//                 <img
//                   alt="facebook"
//                   className="facebookLogo"
//                   src="/img/login/facebook.png"
//                 />
//                 <div className="facebookText">페이스북 계정으로 신규가입</div>
//               </button>
//             </SocialBox>
//           </ModalContents>
//         </LoginLayout>
//       </Modal>
//     </>
//   );
// };

// const Modal = styled.div`
//   background-color: rgba(0, 0, 0, 0.6);
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0px;
//   left: 0px;
//   z-index: 10001; ///배경에 픽스를 주고 투명도를 준다.
// `;

// const LoginLayout = styled.div`
//   width: 480px;
//   height: 500px;
//   background-color: white;
//   position: relative;
//   box-sizing: border-box;
//   margin: 50px auto;
//   margin-top: 150px !important;
//   padding: 20px;
//   background: #fff; //로그인 배경이다

//   .header_layout {
//     overflow: hidden;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 45px;
//     background: #503396; // 로그인 윗쪽 배경
//   }
// `;

// const LoginText = styled.h3`
//   color: #fff;
//   float: left;
//   padding-left: 15px;
//   padding-top: 10px;
//   margin: 0;
// `;

// const Close = styled.button`
//   background-color: #503396;
//   float: right;
//   margin-right: 10px;
//   margin-top: 10px;
//   padding: 0;
//   border: 0;
//   cursor: pointer;
// `;

// const ModalContents = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   padding: 50px 50px 20px 50px;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   //padding 순서는 상우하좌
// `;

// const LoginId = styled.input`
//   margin-top: 10px;
//   border-radius: 2px;
//   width: 100%;
//   height: 40px;
//   border: 1px solid #e5e5e5;
//   padding: 9px 12px;
//   outline: none;
//   box-sizing: border-box;
// `;

// const LoginPw = styled.input`
//   margin-top: 15px;
//   border-radius: 2px;
//   width: 100%;
//   height: 40px;
//   border: 1px solid #e5e5e5;
//   padding: 9px 12px;
//   outline: none;
//   box-sizing: border-box;
// `;

// const LoginMid = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 5px;

//   .autoLogin {
//     font-size: 12px;
//     color: #8d8d8d;
//     line-height: 3;
//     cursor: pointer;
//   }

//   .btn {
//     font-size: 12px;
//     color: #8d8d8d;
//     line-height: 3;
//     cursor: pointer;
//     border: none;
//     background-color: white;
//   }
// `;

// const LoginButton = styled.button`
//   position: relative;
//   line-height: 19px;
//   text-align: center;
//   background-color: #503396;
//   font-weight: 700;
//   cursor: pointer;
//   line-height: 48px;
//   padding: 0 20px;
//   margin-top: 10px;
//   width: 100%;
//   font-size: 16px;
//   border-radius: 3px;
//   display: inline-block;
//   text-decoration: none;
//   color: #fff;
//   border: 0;
//   height: 48px;

//   &:disabled {
//     background-color: #dddfe4 !important;
//     cursor: default !important;
//   }
// `;

// const Link = styled.div`
//   padding: 20px 0 30px 0;
//   text-align: center;
//   line-height: 1.1;

//   a:first-child {
//     margin-left: 0;
//     padding-left: 0;
//   }

//   a:first-child:before {
//     display: none;
//   }

//   a {
//     display: inline-block;
//     position: relative;
//     vertical-align: middle;
//     margin: 0 0 0 27px;
//     padding: 0;
//     font-size: 0.9333em;
//     color: #666;
//     text-decoration: none;
//   }

//   a:before {
//     content: "";
//     display: block;
//     position: absolute;
//     left: -15px;
//     top: 50%;
//     width: 2px;
//     height: 16px;
//     margin-top: -8px;
//     background-color: #d8d9db;
//     pointer-events: none;
//   }
// `;

// const SocialBox = styled.div`
//   margin-bottom: 30px;
//   .kakao {
//     width: 100%;
//     background-color: #feec34;
//     border-color: #feec34;
//     height: 48px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-sizing: border-box;
//     margin-bottom: 10px;
//     border-radius: 3px;
//     border: none;
//     cursor: pointer;

//     .kakaoLogo {
//       width: 24px;
//       height: 25px;
//     }

//     .kakaoText {
//       width: 300px;
//       text-align: center;
//       display: inline-block;
//       box-sizing: border-box;
//       font-size: 16px;
//       font-weight: 700;
//     }
//   }
//   .facebook {
//     width: 100%;
//     background-color: #21538a;
//     border-color: #21538a;
//     height: 48px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-sizing: border-box;
//     border-radius: 3px;
//     border: none;
//     cursor: pointer;

//     .facebookText {
//       width: 310px;
//       color: #fff;
//       font-size: 15px;
//       font-weight: 700;
//       text-align: center;
//       box-sizing: border-box;
//     }

//     .facebookLogo {
//       width: 24px;
//       height: 25px;
//       margin-left: 5px;
//     }
//   }
// `;

// export default LoginModal;
