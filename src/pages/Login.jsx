import React, { useState } from "react";
import apiList from "components/ApiAddress";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [signId, setSignId] = useState('')
    const [signPw, setSignPw] = useState('')
    const [pwCheck, setPwCheck] = useState('')
    const [nickname, setNickName] = useState('')

    const login = () => {
        if(id === '' || pw === ''){
            alert('모든 칸에 입력해주세요.')
            return;
        }
        axios.post(`${apiList}/login`,
        {
            userId : id,
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
        ).then(()=>{
            alert('로그인 완료.')
            navigate("/");
        }).catch(()=>{
            alert('로그인 실패했습니다.')
        })
    }

    const signup = () => {
        if(signId === '' || signPw === '' || pwCheck === '' || nickname === ''){
            alert('모든 칸에 입력해주세요.')
            return;
        }
        if(signPw !== pwCheck){
            alert('비밀번호가 일치하지 않습니다.')
            return;
        }
        axios.post(`${apiList}/login`,
        {
            userId : signId,
            password : signPw,
            nickname : nickname,
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
            alert('로그인 완료.')
            navigate("/");
        }).catch(()=>{
            alert('로그인 실패했습니다.')
        })
    }

    return <><div>
        로그인<br></br>
        id<input type="text" value={id} onChange={(e)=>setId(e.target.value)}/><br></br>
        pw<input type="password" value={pw} onChange={(e)=>setPw(e.target.value)}/><br/>
        <button onClick={login}>로그인</button>
    </div>
    <hr></hr>
    <div>
        회원가입<br></br>
    id<input type="text" value={signId} onChange={(e)=>setSignId(e.target.value)}/><br></br>
        pw<input type="password" value={signPw} onChange={(e)=>setSignPw(e.target.value)}/><br/>
        pwcheck<input type="password" value={pwCheck} onChange={(e)=>setPwCheck(e.target.value)}/><br/>
        nickname<input type="text" value={nickname} onChange={(e)=>setNickName(e.target.value)}/><br/>
        <button onClick={signup}>회원가입</button>
    </div>
    </>;
};

export default Login;