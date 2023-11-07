import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import "../App.css";

const Home = () => {
    const navigate = useNavigate();
    return (
    <><div className="home">
        <Stack direction={"row"}>
        <button className="homeBtns"
                onClick={() => {
                  navigate("/write");
                }}
              >
                새 글 쓰기
              </button>
              <button className="homeBtns"
                onClick={() => {
                  navigate("/articles");
                }}
              >
                글들 보기
              </button>
              <button className="homeBtns"
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </button>
        </Stack>
        </div>
  </>
  )
};

export default Home;