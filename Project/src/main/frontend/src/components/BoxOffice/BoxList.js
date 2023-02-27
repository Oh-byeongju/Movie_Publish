/*
 23-02-02 css 수정 및 Like수 적용(오병주)
 23-02-08 사용자가 누른 Like 적용(오병주)
*/
import React, { useEffect } from "react";
import Box from "./Box";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ALLMOVIE_REQUEST } from "../../reducer/movie";

const BoxList = () => {
  const dispatch = useDispatch();

  return (
    <CardList>
      <div style={{ paddingBottom: "40px" }}>
        <Title>박스오피스</Title>
        <Link to="/movie">
          <More>
            더 많은 영화보기 <PlusOutlined />
          </More>
        </Link>
      </div>
      <UL>
        
      </UL>
    </CardList>
  );
};

const CardList = styled.div`
  color: #fff;
  position: relative;
  margin-top: 30px;
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  left: 720px;
  width: 80px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const More = styled.div`
  position: absolute;
  font-size: 13px;
  top: 11px;
  right: 100px;
  color: #808080;
  cursor: pointer;
`;

const UL = styled.ul`
  align-items: center;
  list-style-type: none;
  padding-left: 160px;
  margin-bottom: 45px;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;

export default BoxList;
