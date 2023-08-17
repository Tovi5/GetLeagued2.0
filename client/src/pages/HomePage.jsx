import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import yasuo from "../img/yas.jpg";

const Container = styled.div`
  background-image: url(${yasuo});
  height: 100vh;
  background-size: cover;
`; //ovdje ce biti navbar i content home pagea

const Wrapper = styled.div`
  background-color: rgb(11, 12, 16, 0.8);
  height: 100%;
  display:flex;  
  flex-direction:column;
  align-items:center;
  padding-top:100px;
`; //ovdje ce bit home page

const Naslov = styled.div`
  
  color:white;
  
  font-size:48px;
`;

const Pretraga=styled.input`
  
  height:20px;
  

`;

function HomePage() {
  return (
    <Container>
      <Navbar>Navbar</Navbar>
      <Wrapper>
        <Naslov>Pretrazite sta vas interesuje</Naslov>
        <Pretraga placeholder="Pretraga"/>
      </Wrapper>
    </Container>
  );
}

export default HomePage;
