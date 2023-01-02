import React from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";
const Box = ({ src, id, description }) => {
  return (
    <LI>
      <div className="Image">
        <div className="banner_img">
          <Img src={src} alt="영화" />
          <Text className="hover_text">{description}</Text>
        </div>
        <Button>
          <Like>
            <HeartOutlined /> 0
          </Like>
          <Ticket
            onClick={() => {
              console.log("hello");
            }}
          >
            예매
          </Ticket>
        </Button>
      </div>
    </LI>
  );
};

const LI = styled.li`
  float: left;
  padding-right: 65px;
  width: 250px;
  .Image {
    position: relative;

   
    .banner_img:hover:after,
    .banner_img:hover > .hover_text{
      display:block;
    }
    .banner_img:after, .hover_text{
      display:none;
    }
    

  }

  }
`; //하나의 div
const Img = styled.img`
  width: 250px;
  height: 350px;
  border-radius: 7px;

  &:hover {
    filter: brightness(0.4);
  }
  cursor: pointer;
`;

const Text = styled.p`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 25;
  font-weight: 500;
  font-size: 15px;
`;
const Like = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  width: 45px;
  height: 30px;
  border: 1px solid;
`;
const Button = styled.div`
  position: absolute;
  bottom: -40px;
  display: flex;
  padding-top: 10px;
  width: 250px;
`;

const Ticket = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-left: 10px;
  text-align: center;
  width: 80%;
  padding-left: 10px;
  border-radius: 4px;
  height: 36px;
  text-align: center;
  background-color: white;
  cursor: pointer;
`; //예매하기 버튼
export default Box;
