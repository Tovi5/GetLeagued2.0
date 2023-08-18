import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import yasuo from "../img/yas.jpg";
import kayne from "../img/snow_moon_kayn.jpg";

const Container = styled.div`
  background-image: url(${kayne});
  height: 100vh;
  background-size: cover;
`; //ovdje ce biti navbar i content home pagea

const Wrapper = styled.div`
  /* background-color: rgb(11, 12, 16, 0.8);*/
  background-color: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`; //ovdje ce bit home page

const Naslov = styled.div`
  color: white;

  font-size: 48px;
`;

const Pretraga = styled.input`
  height: 60px;
  background-color: rgb(197, 198, 199, 0.1);
  border: none;
  width: 37%;
  border-radius: 10px;

  &:focus {
    color: red;
  }
`;
const Content = styled.div`
  background-color: rgb(11, 12, 16, 0.8);
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const BlogPostPlaceholder=styled.div`
background-color: rgb(11, 12, 16, 0.5);
  color:white;
  display:flex;
  flex-direction:column;
  width:37%;
  border:2px solid #1f2833;
  margin-top:50px;
  padding:10px;

`;

const Blog=styled.div`
  background-color:transparent;
`

function HomePage() {
  return (
    <Container>
      <Content>
        <Navbar>Navbar</Navbar>
        <Wrapper>
          <Naslov>Pretrazite sta vas interesuje</Naslov>
          <Pretraga placeholder="Pretraga" />
          <BlogPostPlaceholder>
            <Blog>Blog</Blog>
            <Blog>Blog</Blog>
            <Blog>Blog</Blog>
          </BlogPostPlaceholder>
        </Wrapper>
      </Content>
    </Container>
  );
}

export default HomePage;
