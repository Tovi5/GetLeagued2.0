import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineUp } from 'react-icons/ai';
import { PiUploadSimpleDuotone } from 'react-icons/pi';
import { IconContext } from 'react-icons/lib';


const Container = styled.div`
    top:0;
    height:100px;
    width: 100%;
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

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 30px 0 0;
    aspect-ratio: 1/1;
    height: 40px;
    border-radius: 50%;

    &:hover{
        background-color: rgb(50, 51, 52, 0.7);
    }
`

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

const Options = styled.div`
    position: absolute;
    top: 110px;
    right: 70px;
    width: 175px;
    color: white;
    font-weight: 600;
    border: 1px solid rgb(197, 198, 199, 0.3);
    border-radius: 10px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    background-color: rgb(11, 12, 16);
`;

const Option = styled.div`
    padding: 10px 30px;
    font-size: 16px;
    transition: background-color 0.15s ease;
    cursor: pointer;

    &:hover{
        background-color: #45A29E;
    }
`;

function Navbar({ username, setUsername, setRole, role, setOdjavljen }) {

    const [profileClicked, setProfileClicked] = useState(false);

    const signOut = () => {
        setUsername('');
        setRole('');
        setProfileClicked(false);
        setOdjavljen(true);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Link to="/"><Houm>Home</Houm></Link>

                    {role === 'admin' && <Link to='/upload'>
                        <IconContainer>
                            <IconContext.Provider
                            value={{color: '#c5c6c7', size: '20px'}}>
                                <PiUploadSimpleDuotone/>
                            </IconContext.Provider>
                        </IconContainer>
                    </Link>}
                    
                    
                    {username && <Profile onClick={() => setProfileClicked(!profileClicked)}>{username}
                        {!profileClicked && <AiOutlineDown />}
                        {profileClicked && <AiOutlineUp />}
                    </Profile>}
                    {!username && <Link to="/login"><Button>Prijava</Button></Link>}
                </Wrapper>
            </Container>
            
            {profileClicked &&
                <Options>
                    <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}><Option>Profil</Option></Link>
                    <Option onClick={() => signOut()}>Odjava</Option>
                </Options>}
        </>
    )
}

export default Navbar;