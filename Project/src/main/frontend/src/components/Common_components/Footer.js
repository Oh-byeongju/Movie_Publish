import React from "react";
import styled from "styled-components";
import {
  GithubOutlined,
  HomeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      <div className="l-Footer">
        <FooterLayout>
          <FooterLink>
            <FooterLinkList>
              <FooterLinkListItemHide>
                <a
                  href="https://github.com/Oh-byeongju/Movie_Project"
                  target="_blank"
                  rel="noreferrer"
                >
                  프로젝트 소개
                </a>
              </FooterLinkListItemHide>
              <FooterLinkListItem>
                <Link to="/">공지사항</Link>
              </FooterLinkListItem>
              <FooterLinkListItem>
                <Link to="/">영화예매</Link>
              </FooterLinkListItem>
              <FooterLinkListItem>
                <Link to="/">극장조회</Link>
              </FooterLinkListItem>
              <FooterLinkListItem>
                <Link to="/">이벤트</Link>
              </FooterLinkListItem>
              <FooterLinkListItemHide>
                <Link to="/">개발진</Link>
              </FooterLinkListItemHide>
            </FooterLinkList>
          </FooterLink>
          <Content>
            <CorpInfo style={{ fontSize: "15px" }}>
              <CorpLogo>
                <h1 style={{ fontSize: "36px" }}>MOVIE_PROJECT</h1>
              </CorpLogo>
              오병주 (프로젝트 제작)
              <br></br>
              E-mail : dhqudwn0@naver.com &nbsp; | &nbsp; Github :
              https://github.com/Oh-byeongju
              <br></br>
              <br></br>
              강경목 (프로젝트 제작)
              <br></br>
              E-mail : 여기 이메일좀 &nbsp; | &nbsp; Github :
              https://github.com/kmsjkh12
              <br></br>
            </CorpInfo>
            <CorpSns>
              <CorpSnsList>
                <CorpSnsListItem>
                  <Link to="/">
                    <HomeOutlined
                      style={{ fontSize: "25px", color: "#97a0a7" }}
                    />
                  </Link>
                </CorpSnsListItem>
                <CorpSnsListItem>
                  <Link to={`/UserJoin`} state={{ url: location.pathname}}>
                    <UserAddOutlined
                      style={{ fontSize: "25px", color: "#97a0a7" }}
                    />
                  </Link>
                </CorpSnsListItem>
                <CorpSnsListItem>
                  <a
                    href="https://github.com/Oh-byeongju/Movie_Project"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubOutlined
                      style={{ fontSize: "25px", color: "#97a0a7" }}
                    />
                  </a>
                </CorpSnsListItem>
              </CorpSnsList>
            </CorpSns>
          </Content>
        </FooterLayout>
      </div>
    </>
  );
};

const FooterLayout = styled.div`
  background: #ebeef1;
  position: relative;
`;

const FooterLink = styled.div`
  background: #dddfe4;
  overflow: hidden;
  height: 56px;
  border-left: none;
`;

const FooterLinkList = styled.ul`
  padding-left: 16px;
  padding-right: 16px;
  max-width: 1044px;
  margin: 19px auto 19px -33px;
  height: 19px;
  padding: 0;
  margin: 19px auto 18px;
  list-style: none;

  li {
    &:first-child {
      padding-left: 0;
      margin-left: 0;
      border-left: 0;
    }
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const FooterLinkListItem = styled.li`
  float: left;
  border-left: 1px solid #c5cbd0;
  color: #7b858e;
  line-height: 19px;
  font-size: 16px;
  list-style: none;
  padding-left: 16px;
  margin-left: 16px;
`;

const FooterLinkListItemHide = styled.li`
  display: block;
  float: left;
  border-left: 1px solid #c5cbd0;
  color: #7b858e;
  line-height: 19px;
  font-size: 16px;
  padding-left: 16px;
  margin-left: 16px;
`;

const Content = styled.div`
  position: relative;
  padding: 8px 0px 8px 0px;
  max-width: 1044px;
  margin: 0 auto;
  height: 212px;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const CorpInfo = styled.div`
  line-height: 20px;
  font-size: 14px;
  color: #7b858e;
`;

const CorpLogo = styled.div`
  display: block;
  width: 93px;
  margin-bottom: 24px;
`;

const CorpSns = styled.div`
  margin-top: 0;
  position: absolute;
  bottom: 32px;
  right: 5px;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const CorpSnsList = styled.ul`
  list-style: none;
  li {
    &:first-child {
      margin-left: 0px;
    }
  }
`;

const CorpSnsListItem = styled.li`
  float: left;
  margin-left: 15px;
  background-color: #eaeef1;
`;

export default Footer;
