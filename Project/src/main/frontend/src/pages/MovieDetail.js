import React from "react";
import Details from "../components/AllMovie/Details";
import DetailCommentWrite from "../components/AllMovie/DetailCommentWrite";
import DetailCommentList from "../components/AllMovie/DetailCommentList";

const MovieDetail = () => {
  return (
    <>
      <Details/>
      <DetailCommentWrite/>
      <DetailCommentList/>
    </>
  );
};

export default MovieDetail;
