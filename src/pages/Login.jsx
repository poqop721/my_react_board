import React, { useEffect, useState, useRef } from "react";
import apiList from "components/ApiAddress";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import MyButton from "components/MyButton";

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [signName, setSignName] = useState('')
    const [signPw, setSignPw] = useState('')
    const [pwCheck, setPwCheck] = useState('')
    const [nickname, setNickName] = useState('')
    const loginBtn = useRef(null);
    const signUpBtn = useRef(null);

    useEffect(()=>{
        if(id === '' || pw === ''){
            loginBtn.current.disabled = true;
        }else{
            loginBtn.current.disabled = false;
        }
    },[id,pw])

    useEffect(()=>{
        if(signName === '' || signPw === '' || pwCheck === '' || nickname === ''){
            signUpBtn.current.disabled = true;
        }else{
            signUpBtn.current.disabled = false;
        }
    },[signName,signPw,pwCheck,nickname])

    const login = () => {
        axios.post(`${apiList}/login`,
        {
            nickname : id,
            password : pw,
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
        ).then((res)=>{
            alert('로그인 완료.')
            let token = res.headers["authorization"]
            console.log(token)
            localStorage.setItem('token', token);
            navigate("/");
        }).catch((res)=>{
            alert(res.response.data.message)
        })
    }

    const signup = () => {
        axios.post(`${apiList}/users`,
        {
            nickname : signName,
            password : signPw,
            name : signName,
            confirmPassword : pwCheck,
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
        ).then((res)=>{
            console.log(res)
            alert('회원가입 완료.')
            navigate("/");
        }).catch((res)=>{
            alert(res.response.data.message)
        })
    }

    return <><div>
        로그인<br></br>
        id<input type="text" value={id} onChange={(e)=>setId(e.target.value)}/><br></br>
        pw<input type="password" value={pw} onChange={(e)=>setPw(e.target.value)}/><br/>
        <MyButton onClickEvent={login} content={"로그인"} useRef={loginBtn}/>

    </div>
    <hr></hr>
    <div>
        회원가입<br></br>
        nickname<input type="text" value={nickname} onChange={(e)=>setNickName(e.target.value)}/><br/>
    이름<input type="text" value={signName} onChange={(e)=>setSignName(e.target.value)}/><br></br>
        pw<input type="password" value={signPw} onChange={(e)=>setSignPw(e.target.value)}/><br/>
        pwcheck<input type="password" value={pwCheck} onChange={(e)=>setPwCheck(e.target.value)}/><br/>
        <MyButton onClickEvent={signup} content={"회원가입"} useRef={signUpBtn}/>
    </div>
    </>;
};

export default Login;