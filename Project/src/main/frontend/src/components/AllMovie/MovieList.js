/*
 23-02-02 css 수정 및 Like수 적용(오병주)
 23-02-08 사용자가 누른 Like 적용(오병주)
*/
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALLMOVIE_REQUEST, MOVIE_SEARCH_REQUEST } from "../../reducer/movie";
import Movie from "./Movie";
import MovieSearchLoading from "../Common_components/MovieSearchLoading";
import styled from "styled-components";
import { Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Search } = Input;

const MovieList = () => {
  const dispatch = useDispatch();

  // UL의 높이를 구하기 위한 useRef
  const UL_Ref = useRef();
  const [Height, setHeight] = useState(962.2);

  const [Limit, setLimit] = useState(8); //더보기 리미트
  const L = 8;

  const { allMovie, movie_search_loading } = useSelector(
    (state) => state.movie
  );

  // 로그인 리덕스 상태
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

  // 로그인 상태에 따라 전체 검색이 다름(좋아요 표시 때문)
  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
      data: LOGIN_data.uid,
    });
  }, [LOGIN_data.uid, dispatch]);

  // 검색 버튼 누를때 실행되는 함수
  const onSearch = (value) => {
    dispatch({
      type: MOVIE_SEARCH_REQUEST,
      data: {
        title: value,
        uid: LOGIN_data.uid,
      },
    });

    setLimit(L);
    // UL의 높이 갱신
    var UL_Ref_style = window.getComputedStyle(UL_Ref.current);
    var UL_Ref_height = UL_Ref_style.getPropertyValue("height");
    setHeight(parseInt(UL_Ref_height) + 32.4);
  };

  const onMoreClick = useCallback(() => {
    setLimit(Limit + 8);
  }, [Limit]);

  return (
    <Container>
      <InnerWraps>
        <div className="titleMenu">
          <h1>전체영화</h1>
        </div>
        <div className="search">
          <p>
            {`${allMovie.slice(0, Limit).length}개의 영화가 검색되었습니다.`}
          </p>
          <div className="search_button">
            <SearchWarp
              placeholder="영화명 검색"
              allowClear
              onSearch={onSearch}
              style={{
                width: 200,
                height: 10,
              }}
            />
          </div>
        </div>
        {/* 처음 랜더링 될때 로딩화면 */}
        {allMovie.length === 0 && Height === 962.2 ? (
          <div>
            <MovieSearchLoading height={Height} />
          </div>
        ) : null}
        {movie_search_loading ? (
          <MovieSearchLoading height={Height} />
        ) : (
          <div className="movie-list">
            <UL ref={UL_Ref}>
              {/* 영화 검색 결과에 따라 다른 화면을 출력 */}
              {allMovie.length !== 0 ? (
                allMovie
                  .slice(0, Limit)
                  .map((movie) => <Movie movie={movie} key={movie.id} />)
              ) : (
                <NoSearch>
                  <p>현재 상영중인 영화가 없습니다.</p>
                </NoSearch>
              )}
            </UL>
          </div>
        )}
        {Limit >= allMovie.length ? (
          ""
        ) : (
          <More onClick={onMoreClick}>
            더보기 <DownOutlined />
          </More>
        )}
      </InnerWraps>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
  width: 1235px;
  margin : 0 auto;
  box-sizing: border-box; 
  margin-bottom: 0;
`;

const InnerWraps = styled.div`
  width: 100%;
  padding-left: 10px;

  .titleMenu {
    position: relative;
    top: 18px;
  }
  .search {
    position: relative;
    width: 98.4%;
    border-bottom: 3px solid #241d1e;
    padding-bottom: 8px;
    margin-top: 30px;

    p {
      font-weight: 1000;
      padding-top: 8px;
    }

    .search_button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const SearchWarp = styled(Search)`
  span {
    .ant-input-clear-icon {
      display: none;
    }
    .ant-input-affix-wrapper {
      border-color: #a0a0a0;
    }
    .ant-input-group-addon {
      border-color: #a0a0a0;
    }
    .ant-btn {
      border-color: #a0a0a0;
    }
    .ant-input::placeholder {
      color: #a0a0a0;
    }
  }
`;

const UL = styled.ul`
  align-items: center;
  list-style-type: none;
  width: 100%;
  height: 100%;
  padding: 0;

  &:after {
    content: "";
    clear: both;
    display: block;
  }

  li:nth-child(4n) {
    padding-right: 0px !important;
  }
`;

const NoSearch = styled.div`
  width: 98.4%;
  padding: 95px 0 95px 0;
  color: #222;
  text-align: center;
  font-size: 1.3333em;

  p {
    margin: 0;
    padding: 90px 0;
    border: 2px solid #f5f5f5;
    border-width: 2px 0 2px 0;
  }
`;

const More = styled.button`
  margin-bottom: 70px;
  width: 98.5%;
  height: 40px;
  background-color: transparent;
  border: 1px solid gainsboro;
  color: #666;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.15;
  &:hover {
    border: 1px solid black;
  }
`;

export default MovieList;
