import React , { useEffect }from "react";
import axios from 'axios'
import { useAtom } from 'jotai';
import apiList from "components/ApiAddress";
import { Link } from 'react-router-dom';
import { articlesAtom } from "./modules/dataAtoms";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import "../App.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "black",
    fontSize:'1.2rem',
    margin:'7px',
    boxShadow: '0px 3px 10px 2px rgb(192, 192, 192)',
    padding : '15px'
  }));

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
        <Box sx={{ width: '80%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {datas.map((article) => {
            return (
              <Grid className="grids" item xs={6} key={article.postid}>
                <Link to={`/article/${article.postid}`}style={{ textDecoration: "none"}}>
                <Item>
                  <span style={{ cursor: 'pointer' }}>{article.title}</span>
                  </Item>
                </Link>
              </Grid>
            );
          })}
        </Grid>
    </Box>
      );
};

export default Articles;