import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import {AiOutlineDown} from 'react-icons/ai';


const Container = styled.div`
    top:0;
    height:100px;
    width: 99vw;
    padding: 10px 0 50px 0;
    background-color:transparent;
    
    
`;//navbar ce imati button za prijavu i imace home page slicicu za vracanje na home page


const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    padding:0px 20px;
    position:relative;
`;


const Button = styled.button`
    
    background-color:transparent;
    border: 2px solid #C5C6C7;
    border-radius: 10px;
    padding: 20px 40px;
    margin-right: 50px;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    transition: color 0.2s ease;
    transition: border-color 0.2s ease;
    margin-top:25px;
    color: #c5c6c7;

    &:hover{
        color: rgb(102, 252, 241);
        border: 2px solid rgb(102, 252, 241);
    }

`;

const Houm = styled.div`
    position:absolute;
    left:30px;
    font-size: 20px;
    font-weight: 700;
    color:white;
    margin-left:50px;
    
`;

const Profile = styled.button`
    background-color: transparent;
    border: 1px solid #c5c6c7;
    color: #c5c6c7;
    font-size: 16px;
    padding: 20px 40px;
    margin-right: 50px;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
    column-gap: 15px;
`;

function Navbar() {

    const [authenticated, setAuthenticated] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const loggedIn = localStorage.getItem('authenticated');
        if (loggedIn)
            setAuthenticated(loggedIn);
    }, []);

    const signOut = () => {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setAuthenticated(false);
    }

    return (
        <Container>
            <Wrapper>
                <Link to="/"><Houm>Home</Houm></Link>
                {!authenticated && <Link to="/login"><Button>Prijava</Button></Link>}
                {authenticated && <Profile onClick={() => signOut()}>{username} <AiOutlineDown /></Profile>}
            </Wrapper>
        </Container>
    )
}

export default Navbar