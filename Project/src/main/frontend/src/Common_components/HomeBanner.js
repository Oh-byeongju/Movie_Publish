import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import a1 from "../images/a1.jpg";
import a2 from "../images/a2.jpg";

const contentStyle = {
  height: "650px",

  lineHeight: "160px",
  textAlign: "center",
};

const HomeBanner = () => {
  return (
    <Carousel autoplay>
      <div>
        <img src={a1} style={contentStyle} />
      </div>
      <div>
        <img src={a2} style={contentStyle} />
      </div>
    </Carousel>
  );
};

export default HomeBanner;
