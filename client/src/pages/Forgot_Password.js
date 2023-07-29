import React, { useEffect, useState } from 'react'
import './Forgot_Password.css';
import { useNavigate } from 'react-router-dom';

function Forgot_Password() {

    const navigate = useNavigate();


    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ confPass, setConfPass ] = useState(null);

    const [ emptyInput, setEmptyInput ] = useState(false);
    const [ exstEmail, setExstEmail ] = useState(true);
    const [ correctPass, setCorrectPass ] = useState(true);
    const [ exstPassword, setExstPassword ] = useState(false);
    const [ resetPressed, setResetPressed ] = useState(false);

    const [ userInfo, setUserInfo ] = useState([]);

    useEffect(() => {

        const getUserInfo = async () => {

            try {

                const res = await fetch('http://localhost:5000/getUserInfo', {
                    method: 'GET'
                });

                const data = await res.json();
                
                if(data) setUserInfo(data);
                
            } catch (error) {
                console.log(error.message);
            }

        }

        getUserInfo();

    }, []);


    const existingEmail = () => {

        return userInfo.filter(info => info.email === email).length !== 0 ? true : false;

    }

    const samePassword = () => {

        return userInfo.filter(info => info.password === password && info.email === email).length !== 0 ? true : false;

    }

    const reset = () => {
        setExstEmail(false);
        setExstPassword(false);
        setEmptyInput(false);
    }

    const cp = () => {
        
        return password === confPass ? true : false;
    }

    const resetPassword = async (e) => {
        e.preventDefault();

        setResetPressed(true);
        reset();

        if(!email || !password || !confPass)
            setEmptyInput(true);

        else{
            if(password === confPass)
                setCorrectPass(true);
            else
                setCorrectPass(false);

            const correctPassword = cp();

            if(existingEmail())
                setExstEmail(true);

            if(samePassword())
                setExstPassword(true);

            if(existingEmail() && !samePassword() && correctPassword){
                await fetch(`http://localhost:5000/updatePassword/${email}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({ 'password': password })
                });

                navigate('/login');
            }

        }
    }


    return (
        <div className='content-pass'>

            <div className='header-container'>
                <div className='header'>
                    <span>Reset Password</span>
                </div>
            </div>            

            <div className='container-pass'>

                {emptyInput && resetPressed && <div className='error'>Popunite sva potrebna polja!</div>}

                <div className='field-pass'>
                    <input type="email" name="email" autocomplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                    <label for="email" className='label-wrapper'>
                        <span className='label-text'>Email</span>
                    </label>
                </div>

                {!exstEmail && !emptyInput && resetPressed && <div className='error'>Email ne postoji!</div>}

                <div className='field-pass'>
                    <input type="password" name="new-password" autocomplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                    <label for="new-password" className='label-wrapper'>
                        <span className='label-text'>New password</span>
                    </label>
                </div>

                <div className='pass-container'>
                    
                </div>

                {exstPassword && !emptyInput && resetPressed && <div className='error'>Ne mozete koristiti prethodni password kao novi!</div>}

                <div className='field-pass'>
                    <input type="password" name="conf-new-password" autocomplete="off"
                    onChange={(e) => setConfPass(e.target.value)}
                    required />
                    <label for="conf-new-password" className='label-wrapper'>
                        <span className='label-text'>Confirm new password</span>
                    </label>
                </div>

                {!correctPass && !emptyInput && resetPressed && <div className='error'>Pogresna sifra</div>}

                <button className='reset-btn' onClick={(e) => resetPassword(e)}>RESET PASSWORD</button>

            </div>

        </div>
    )
}

export default Forgot_Password