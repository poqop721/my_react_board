import React, { useRef, useState } from "react";
import axios from 'axios'
import '@toast-ui/editor/dist/toastui-editor.css';
import apiList from "components/ApiAddress";
import MyEditor from "components/MyEditor";
import { useNavigate } from "react-router-dom";
import MyButton from "components/MyButton";

const Write = () => {
    const contentRef = useRef();
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const postArticle = () => {
        if(title.length < 10 || title.length === ''){
            alert('제목은 10자 이상으로 입력해주세요.')
            return;
        }
        axios.post(`${apiList}/posts`,
        {
            title: title,
            content: content,
        },
        {
            headers:{ 
                'Content-type': 'application/json', 
                'Accept': 'application/json' ,
                'authorization' : localStorage.getItem('token'),
                  } 
        },
        {
            withCredentials: true
        }
        ).then(()=>{
            alert('게시물 등록 완료.')
            navigate("/");
        }).catch((res)=>{
            alert(res.response.data.message)
        })
    }

    return (
        <>
            <MyEditor title={title} onWriteTitle={(e)=>setTitle(e.target.value)} 
            initVal={"여기에 새 글 입력"} contentRef={contentRef} onWriteContent={(e)=>setContent(contentRef.current.getInstance().getHTML())}/>

            <MyButton onClickEvent={postArticle} content={"글쓰기"}/>
        </>);
};

export default Write;