// src/pages/article.js

import React, { useState, useRef } from 'react';
import axios from 'axios'
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { articlesAtom } from "./modules/atoms";
import { useNavigate } from "react-router-dom";
import apiList from 'components/ApiAddress';
import MyEditor from 'components/MyEditor';


function Article() {
  const navigate = useNavigate();
  const [datas,] = useAtom(articlesAtom)
  const [isUpdate, setIsUpdate] = useState(false)
  const contentRef = useRef();
  const param = useParams();

  const article = datas.find((data) => data.postid === parseInt(param.name));

  const [content, setContent] = useState(article.content)
  const [title, setTitle] = useState(article.title)
  const [password, setPassword] = useState(article.password)

  const articleStyle = {
    padding: "30px",
    background: "#e3e3e3",
    borderRadius: "10px"
  }

  const deleteArticle = () => {
    axios.delete(`${apiList}/${article.postid}`, {
    })
      .then((Response) => {
        alert('게시글을 삭제했습니다.')
        navigate("/articles");
      })
      .catch((Error) => { alert('게시글을 삭제하는데 문제가 생겼습니다.') })
  }

  const postArticle = () => {
    axios.put(`${apiList}/${article.postid}`,
      {
        title: title,
        content: content,
        password: password
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      },
      {
        withCredentials: true
      }
    ).then((response) => {
      console.log(response)
      alert('게시물 수정 완료')
      navigate("/");
    }).catch((response) => {
      console.log('Error!');
    })
  }

  const HideArticle = () => {
    return (
      <><MyEditor title={title} onWriteTitle={(e)=>setTitle(e.target.value)} password={password}
          onWritePassword={(e)=>setPassword(e.target.value)} initVal={article.content} contentRef={contentRef} onWriteContent={(e)=>setContent(contentRef.current.getInstance().getHTML())} />

        <button onClick={() => setIsUpdate(!isUpdate)}>취소</button>
        <button onClick={postArticle}>수정</button>
      </>
    )
  }

  const ShowArticle = () => {
    return (
      <>
        <div>
          <h1>{article.title}</h1>
          <p>생성일 : {article.createdAt}</p>
          <p>수정일 : {article.updatedAt}</p>
          <div style={articleStyle} dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
        <button onClick={() => setIsUpdate(!isUpdate)}>수정</button>
        <button onClick={deleteArticle}>삭제</button>
      </>
    )
  }

  return (<>
    {isUpdate ? <HideArticle /> : <ShowArticle />}
  </>
  );
}

export default Article;
