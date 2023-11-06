import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const Home = () => {
    const navigate = useNavigate();
    return (
    <>
        <Stack direction={"row"}>
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
        </Stack>
  </>
  )
};

export default Home;