import React from "react";
import TopButtons from "../Common_components/TopButtons";
import { createGlobalStyle } from "styled-components";
import BoxList from "../boxoffice/BoxList";
import HomeBanner from "../Common_components/HomeBanner";

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <TopButtons />
      <HomeBanner />
      <BoxList />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default Home;
