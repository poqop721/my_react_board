import React, { useRef, useState } from "react";
import axios from 'axios'
import '@toast-ui/editor/dist/toastui-editor.css';
import apiList from "components/ApiAddress";
import MyEditor from "components/MyEditor";
import { useNavigate } from "react-router-dom";

const Write = () => {
    const contentRef = useRef();
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const postArticle = () => {
        axios.post(apiList,
        {
            title: title,
            content: content,
            writer: writer,
            password: password
        },
        {
            headers:{ 
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
                  } 
        },
        {
            withCredentials: true
        }
        ).then(()=>{
            alert('게시물 등록 완료.')
            navigate("/");
        }).catch(()=>{
            alert('게시물을 등록하는데 실패했습니다.')
        })
    }

    return (
        <>
            <MyEditor title={title} onWriteTitle={(e)=>setTitle(e.target.value)} writer={writer} 
            onWriteWriter={(e)=>setWriter(e.target.value)} password={password} onWritePassword={(e)=>setPassword(e.target.value)} 
            initVal={"여기에 새 글 입력"} contentRef={contentRef} onWriteContent={(e)=>setContent(contentRef.current.getInstance().getHTML())}/>

            <button type="submit" onClick={postArticle}>글쓰기</button>
        </>);
};

export default Write;