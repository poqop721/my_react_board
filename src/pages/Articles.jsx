import React , { useEffect }from "react";
import axios from 'axios'
import { useAtom } from 'jotai';
import apiList from "components/ApiAddress";
import { Link } from 'react-router-dom';
import { articlesAtom } from "./modules/dataAtoms";

async function getArticles(){

    try {
        const response = await axios.get(`${apiList}/posts`);
        return(response.data)
    } catch {
        console.log('error!!!')
    }
}

const Articles = () => {
    const [datas, setDatas] = useAtom(articlesAtom)
    useEffect(()=>{
        getArticles().then(res=>{
            console.log(res)
            setDatas(res.data)
        })
    },[])
    console.log(datas)
    return (
        <div>
          {datas.map((article) => {
            return (
              <div key={article.postid}>
                <Link to={`/article/${article.postid}`}>
                  <span style={{ cursor: 'pointer' }}>{article.title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      );
};

export default Articles;