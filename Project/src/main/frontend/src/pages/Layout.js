import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import TopButtons from "../components/Common_components/TopButtons";
import Footer from "../components/Common_components/Footer";
import { USER_LOGIN_STATUS_REQUEST } from "../reducer/R_user_login";
import { useSelector, useDispatch } from "react-redux";

// 공통으로 쓰는 TopButton과 Footer의 리랜더링을 방지하기 위해 만든 컴포넌트(부모 컴포넌트)
const Layout = () => {


  return (
    <div className = "Parent_Component" >
      <TopButtons />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
