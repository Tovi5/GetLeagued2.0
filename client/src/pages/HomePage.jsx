import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import kayne from "../img/snow_moon_kayn.jpg";

const Container = styled.div`
  background-image: url(${kayne});
  height: 100vh;
  width: 99.05vw;
  background-size: cover;
  margin: 0;
`; //ovdje ce biti navbar i content home pagea

const Wrapper = styled.div`
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  gap: 50px;
`; //ovdje ce bit home page

const Naslov = styled.div`
  color: #C5C6C7;
  font-weight: 700;
  font-size: 48px;
`;

const Pretraga = styled.input`
  height: 60px;
  background-color: rgb(197, 198, 199, 0.1);
  border: 2px solid #45A29E;
  width: 45%;
  border-radius: 10px;
  font-size: 16px;
  backdrop-filter: blur(7px);
  color: #c5c6c7;
  padding: 5px 20px;
`;

const Content = styled.div`
  background-color: rgb(11, 12, 16, 0.8);
  height: 100vh;
  width: 99.05vw;
  margin: 0;
  padding: 0;
`;

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1F2833;
  width: 99.05vw;
  margin: 0;
  padding: 100px 0 75px 0;

  & span{
    font-size: 48px;
    color: white;
    font-weight: 700;
  }

  & hr{
    border: 1px solid #66FCF1;
    width: 20%;
    margin-top: 30px;
  }
`;

const BlogPostPlaceholder=styled.div`
  background-color: transparent;
  color:white;
  display:flex;
  flex-wrap: wrap;
  width:75%;
  margin-top:50px;
  padding:15px;
  column-gap: 2.3%;
  row-gap: 10px;
`;

const Blog=styled.div`
  display: flex;
  flex-direction: column;
  background-color: #13151C;
  width: 30%;
  height: 150px;
  border-radius: 10px;
  padding: 10px;
  color: #C5C6C7;
`;

const BlogTitle = styled.div`
  background-color: inherit;
  font-size: 24px;
`;

const BlogSummary = styled.div`
  overflow: auto;
`;

const ViewAll = styled.button`
  background-color: #66FCF1;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 800;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;

  &:hover{
    background-color: #45A29E;
  }
`;

function HomePage() {


  const [newsList, setNewsList] = useState([]);
  const loadNews = 3;

  //const [authenticated, setAuthenticated] = useState(null);


  useEffect(() => {

    const getNews = async () => {
      try {

        let res = await fetch('http://localhost:5000/getAllNews', {
          method: 'GET'
        });

        const data = await res.json();
        if (data.length > 0) setNewsList(data)
        
      } catch (error) {
        console.error(error.message);
      }
    }

    getNews();

  }, []);

  return (
    <Container>
      <Content>
        <Navbar>Navbar</Navbar>
        <Wrapper>
          <Naslov>Spremni da postanete bolji?</Naslov>
          <Pretraga placeholder="Pretraga" />
        </Wrapper>
      </Content>
      <BlogContainer>
        <span>Najnovije vijesti</span>
        <hr />
        <BlogPostPlaceholder>

          {newsList.slice(0, loadNews).map((news, index) => (
            <Blog key={index}>
              <BlogTitle>{news.title}</BlogTitle>
              <BlogSummary>{news.summary}</BlogSummary>
            </Blog>
          ))}

        </BlogPostPlaceholder>

        <Link to="/news"><ViewAll>Sve vijesti</ViewAll></Link>

      </BlogContainer>  
    </Container>
  );
}

export default HomePage;
