/*
	23-02-18 영화 상세정보 관람평 분리(오병주)
	23-02-23 영화 상세정보 관람평 백엔드 연결(오병주)
*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { SmileFilled, MehFilled, FrownFilled, DeleteOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { USER_COMMENT_LIKE_REQUEST, USER_COMMENT_DELETE_REQUEST } from '../../reducer/R_user_movie';
import { useLocation } from "react-router-dom";

const DetailComment = ({ comment }) => {
	const dispatch = useDispatch();
	const location = useLocation(); 

	// 로그인 리덕스 상태
	const { LOGIN_data } = useSelector((state) => state.R_user_login);

	// 사용자가 보이는 like UI 변경을 위한 변수
  const [like, setlike] = useState(false);
  const [likes, setlikes] = useState(0);

  useEffect(() => {
    setlike(comment.like);
    setlikes(comment.upcnt);
  }, [comment]);

	// 사용자가 관람평의 좋아요를 누를 때 호출되는 함수
  const LikeChange = useCallback(() => {
    if (LOGIN_data.uid === "No_login") {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    dispatch({
      type: USER_COMMENT_LIKE_REQUEST,
      data: {
				uid: LOGIN_data.uid,
        umid: comment.umid,
        like: like,
      },
    });

    // 백엔드를 한번 더 호출하지 않고 like와 likes의 변수만 변경하여 사용자가 보고 있는 브라우저 UI를 변경
    if (like) {
      setlike(false);
      setlikes(likes - 1);
    } else {
      setlike(true);
      setlikes(likes + 1);
    }
  }, [LOGIN_data.uid, comment.umid, like, likes, dispatch]);

	// 관람평 삭제 버튼 누르면 실행되는 함수
	const CommentDelete = useCallback(() => {
		if (!window.confirm("관람평을 삭제하시겠습니까?")) {
      return;
    };

		dispatch({
      type: USER_COMMENT_DELETE_REQUEST,
			data: comment.umid
    });
		
		window.location.replace(location.pathname);
	}, [dispatch, comment.umid, location.pathname]);

	return (
		<>
			<CommentElement>
				<span className='img'>
					{comment.umscore > 6 ? <SmileFilled style={{fontSize: "40px", color: "#4a4321"}}/> 
					: comment.umscore > 3 ? <MehFilled style={{fontSize: "40px", color: "#4a4321"}} /> : <FrownFilled style={{fontSize: "40px", color: "#4a4321"}}/>}
				</span>
				<div className='top'>
					<span className='name'>
						{comment.uid}
					</span>
					<span className='score'>
						<RateCustom allowHalf value={comment.umscore/2}/> 
						<span className='score_num'>
							{comment.umscore}
						</span>
					</span>
					<span className='date'>
						{comment.umcommenttime}
					</span>
				</div>
				<div className='middle'>
					{comment.umcomment}
				</div>
				<div className='bottom'>
					{/* 공백을 넣어줘서 간격을 벌림 */}
					<span>
						&nbsp;
					</span>
					<ButtonCustom style={{paddingLeft: "1px"}} onClick={LikeChange}>
						<span className='cnt'>
							{likes}
						</span>
						{like ? <LikeFilled style={{color: "#e61919"}}/> : <LikeOutlined/>}
					</ButtonCustom>			
					{comment.uid === LOGIN_data.uid && <ButtonCustom style={{marginLeft: "2px"}} onClick={CommentDelete}>
						<DeleteOutlined/>
					</ButtonCustom>}
				</div>
			</CommentElement>
		</>
	);
};

const CommentElement = styled.li`
	position: relative;
	padding: 22px 0 17px 68px;
	border-top: 1px solid #eee;
	list-style: none;

	.img {
		display: block;
    position: absolute;
    top: 25px;
    left: 10px;
    width: 42px;
    height: 42px;
	}

	.top {
		position: relative;
    margin-bottom: 10px;

		.name {
			display: block;
			font-size: 14px;
			margin-bottom: 1px;
			font-weight: 600;
		}

		.score {
			position: relative;
			font-size: 14px;
    	margin-right: 11px;

			.score_num {
				margin-left: 5px;
				font-weight: 600;
				vertical-align: bottom;
			}
		}

		.date {
			position: absolute;
			top: 0;
			right: 10px;
			font-family: "Roboto";
			font-size: 14px;
			color: #999;
		}
	}

	.middle {
		margin-bottom: 0;
    line-height: 20px;
		font-size: 13px;
	}

	.bottom {
		margin-top: 12px;
		margin-bottom: 0;
    line-height: 20px;
    font-size: 13px;

		.cnt {
			float: right;
			vertical-align: top;
			line-height: 16px;
			margin-left: 8px;
		}
	}
`;

const RateCustom = styled(Rate)`
	pointer-events: none;
	color: #fea408;
	font-size: 16px;

	.ant-rate-star{
		margin-inline-end: 2px !important;
	}
`;

const ButtonCustom = styled.button`
	float: right;
  content: "";
  cursor: pointer;
  background-color: white;
  border: 0;
	padding: 0;
	margin-right: 12px;
`;

export default DetailComment;