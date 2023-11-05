import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
    <>
    <button
    onClick={() => {
      navigate("/write");
    }}
  >
    새 글 쓰기
  </button>
  <button
    onClick={() => {
      navigate("/articles");
    }}
  >
    글들 보기
  </button>
  <button
    onClick={() => {
      navigate("/login");
    }}
  >
    로그인
  </button>
  </>
  )
};

export default Home;