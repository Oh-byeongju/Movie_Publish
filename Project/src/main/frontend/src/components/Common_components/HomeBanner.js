import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  width: "100%",
  lineHeight: "160px",
  textAlign: "center",
};

const HomeBanner = () => {
  return (
    <div style={{ zIndex: "0" }}>
      <Carousel autoplay>
        <div>
          <img alt ='carousel1' src={"img/carousel/a1.jpg"} style={contentStyle} />
        </div>
        <div>
          <img alt ='carousel1' src={"img/carousel/a2.jpg"} style={contentStyle} />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeBanner;
