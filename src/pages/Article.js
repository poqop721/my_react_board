// src/pages/article.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { articlesAtom } from "./modules/dataAtoms";
import { useNavigate } from "react-router-dom";
import apiList from 'components/ApiAddress';
import MyEditor from 'components/MyEditor';
import MyButton from 'components/MyButton';
import Button from '@mui/material/Button';


function Article() {
  const navigate = useNavigate();
  const [datas,] = useAtom(articlesAtom)
  const [isUpdate, setIsUpdate] = useState(false)
  const contentRef = useRef();
  const param = useParams();

  const [article, setArticle] = useState(datas.find((data) => data.postid === parseInt(param.name)))
  const [content, setContent] = useState(article.content)
  const [title, setTitle] = useState(article.title)
  const [password, setPassword] = useState(article.password)
  const [inpComment, setInpComments] = useState('')
  const [comments, setComments] = useState([])
  const [commentChanging, setcommentChanging] = useState('')
  const [isCommentUpdate, setIsCommentUpdate] = useState(false)
  const [curId, setCurId] = useState('')

  const articleStyle = {
    padding: "30px",
    background: "white",
    borderRadius: "10px",
  }

  useEffect(() => {
    showComments()
    const inputElements = document.querySelectorAll('.input');
    inputElements.forEach(input => {
      input.style.display = 'none';
    });
  }, [])


  // useEffect(()=>{
  //   contentRef.current.focus()
  // },[content])

  // useEffect(()=>{
  //   titleRef.current.focus()
  // },[title])

  const deleteArticle = () => {
    axios.delete(`${apiList}/posts/${article.postid}`, {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'authorization': localStorage.getItem('token'),
      }
    })
      .then((Response) => {
        alert('게시글을 삭제했습니다.')
        navigate("/articles");
      })
      .catch((res) => { alert(res.response.data.message) })
  }

  const changeArticle = () => {
    axios.put(`${apiList}/posts/${article.postid}`,
      {
        title: title,
        content: content,
        password: password
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'authorization': localStorage.getItem('token'),
        }
      },
      {
        withCredentials: true
      }
    ).then((response) => {
      console.log(response)
      alert('게시물 수정 완료')
      navigate("/");
    }).catch((res) => {
      alert(res.response.data.message);
    })
  }

  const showComments = () => {
    axios.get(`${apiList}/posts/${article.postid}/comments`,
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
      console.log(response.data.data)
      setComments(response.data.data)
    }).catch((res) => {
      alert(res);
    })
  }

  const postComments = () => {
    axios.post(`${apiList}/posts/${article.postid}/comments`,
      {
        content: inpComment,
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'authorization': localStorage.getItem('token'),
        }
      },
      {
        withCredentials: true
      }
    ).then((response) => {
      alert('댓글 작성 완료.')
      showComments()
    }).catch((res) => {
      alert(res.response.data.message);
    })
  }

  const changeComments = () => {
    axios.put(`${apiList}/comments/${curId}`, {
      content: commentChanging
    },
      {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'authorization': localStorage.getItem('token'),
        }
      },
      {
        withCredentials: true
      }
    ).then((response) => {
      alert('댓글 수정 완료.')
      setIsCommentUpdate(!isCommentUpdate)
      showComments()
      setcommentChanging('')
    }).catch((res) => {
      alert(res.response.data.message);
    })
  }

  const deleteComments = (id) => {
    axios.delete(`${apiList}/comments/${id}`,
      {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'authorization': localStorage.getItem('token'),
        }
      },
      {
        withCredentials: true
      }
    ).then((response) => {
      alert('댓글 삭제 완료.')
      showComments()
      setcommentChanging('')
    }).catch((res) => {
      alert(res.response.data.message);
    })
  }

  const setIsUpdateState = () => {
    setIsUpdate(!isUpdate)
  }

  function inputDisplayBlock(e, content, id) {
    setcommentChanging(content)
    setIsCommentUpdate(!isCommentUpdate)
    setCurId(id)
  }

  const ShowArticle = () => {
    return (
      <div className='article'>
        <div className='article_box'>
          <div className='article_box_box'>
            <h1>{article.title}</h1>
            <p>생성일 : {article.createdAt}<br></br>수정일 : {article.updatedAt}</p>
          </div>
          <div className='writeBox' style={articleStyle} dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
        <div className='commentBox'>
          <div className='commentBoxBox'>
            <h2>댓글</h2>
            <div>
              <h3>댓글달기</h3>
              <input type='text' autoFocus value={inpComment} onChange={(e) => setInpComments(e.target.value)} />
              <MyButton onClickEvent={postComments} content={"댓글 달기"} useRef={contentRef} />
            </div>
          <div>
            <h3>댓글</h3>
            {comments.map((comment) => {
              return (
                <div  className="commentContent" key={comment.commentId}>
                  <div className=''>{comment.content}</div>
                  <div><MyButton onClickEvent={(e) => inputDisplayBlock(e, comment.content, comment.commentId)} content={"수정"} /><MyButton onClickEvent={() => deleteComments(comment.commentId)} content={"삭제"} /></div>
                </div>
              );
            })}<br/>
            <input type='text' autoFocus value={commentChanging} onChange={(e) => setcommentChanging(e.target.value)} />
            <MyButton onClickEvent={() => changeComments()} content={"수정"} />
            <MyButton onClickEvent={() => { setIsCommentUpdate(!isCommentUpdate); setcommentChanging('') }} content={"취소"} />
          </div>
          </div>
        </div>
        <MyButton onClickEvent={setIsUpdateState} content={"게시물 수정"} />
        <MyButton onClickEvent={deleteArticle} content={"게시물 삭제"} />

      </div>
    )
  }

  return (<>
    {isUpdate ? <><MyEditor title={title} onWriteTitle={(e) => setTitle(e.target.value)}
      initVal={article.content} contentRef={contentRef} onWriteContent={(e) => setContent(contentRef.current.getInstance().getHTML())} />

      <MyButton onClickEvent={setIsUpdateState} content={"취소"} />
      <MyButton onClickEvent={changeArticle} content={"게시물 수정"} />
    </> : <ShowArticle key="component2" />}
  </>
  );
}

export default Article;
