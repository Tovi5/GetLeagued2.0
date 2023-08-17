import React from 'react'
import { styled } from 'styled-components'
const Container = styled.div`
    position:sticky;
    top:0;
    height:100px;
    background-color: rgb(11, 12, 16, 0.8);
`;//navbar ce imati button za prijavu i imace home page slicicu za vracanje na home page
const Wrapper=styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    padding:0px 20px;
    position:relative;
`;


const Button = styled.button`
    
    background-color: rgb(102, 252, 241, 0.3);
    border: 2px solid #66FCF1;
    border-radius: 10px;
    padding: 20px 25px;
    margin-right: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top:25px;
    color: #c5c6c7;
`;

const Houm = styled.div`
    position:absolute;
    left:10px;
    
`;

function Navbar() {
  return (
      <Container>
        <Wrapper>
        <Houm>Home</Houm>
        <Button>Prijava</Button>
        </Wrapper>
    </Container>
  )
}

export default Navbar