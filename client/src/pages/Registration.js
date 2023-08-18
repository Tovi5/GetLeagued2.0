import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css';

function Registration() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confPass, setConfPass] = useState(null);

    const [correctPass, setCorrectPass] = useState(true);
    const [userInfo, setUserInfo] = useState([]);

    const [emptyInput, setEmptyInput] = useState(false);
    const [exstUsername, setExstUsername] = useState(false);
    const [exstEmail, setExstEmail] = useState(false);
    const [regPressed, setRegPressed] = useState(false);


    useEffect(() => {

        const getUserInfo = async () => {
            try {

                const res = await fetch('http://localhost:5000/getUserInfo', {
                    method: 'GET'
                });

                const data = await res.json();

                if (data) setUserInfo(data);

            } catch (error) {
                console.log(error.message);
            }
        }

        getUserInfo();

    }, []);


    const existingEmail = () => {

        const userEmail = userInfo.filter(info => info.email === email);

        return userEmail.length !== 0 ? true : false;

    }

    const existingUsername = () => {

        const userUsername = userInfo.filter(info => info.username === username);

        return userUsername.length !== 0 ? true : false;

    }

    const existingPassword = () => {

        const userPassword = userInfo.filter(info => info.password === password);

        return userPassword.length !== 0 ? true : false;

    }

    const reset = () => {
        setExstEmail(false);
        setExstUsername(false);
        setCorrectPass(true);
        setEmptyInput(false);
    }


    const register = async (e) => {
        e.preventDefault();

        setRegPressed(true);
        reset();

        if (!username || !email || !password || !confPass)
            setEmptyInput(true);

        else {
            if (password === confPass)
                setCorrectPass(true);
            else
                setCorrectPass(false);

            if (existingUsername())
                setExstUsername(true);

            if (existingEmail())
                setExstEmail(true);

            if (!existingEmail() && !existingPassword() && !existingUsername() && correctPass) {
                await fetch('http://localhost:5000/insertUser', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        'email': email,
                        'password': password,
                        'registered_at': new Date(),
                        'last_login': new Date(),
                        'intro': null,
                        'profile': null,
                        'username': username,
                        'role': 'regular'
                    })
                });

                navigate('/');
            }
        }
    }


    return (
        <div className='img-container'>

            <div className='content'>

                <div className='separator' />

                <div className='container'>

                    <div className='title-container'>
                        <div>Registracija</div>
                        <div>
                            Vec imas profil?
                            <Link to='/login'>Prijava</Link>
                        </div>
                    </div>

                    <div className='form-container'>

                        {emptyInput && regPressed && <div className='existing'>Popunite sva potrebna polja!</div>}

                        <div className='field'>
                            <input type="text" name="username" autocomplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                            <label for="username" className='label-wrapper'>
                                <span className='label-text'>Username</span>
                            </label>
                        </div>

                        {exstUsername && <div className='existing'>Username je zauzet</div>}

                        <div className='field'>
                            <input type="email" name="email" autocomplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <label for="email" className='label-wrapper'>
                                <span className='label-text'>Email</span>
                            </label>
                        </div>

                        {exstEmail && <div className='existing'>Email je zauzet</div>}

                        <div className='field'>
                            <input type="password" name="password" autocomplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <label for="password" className='label-wrapper'>
                                <span className='label-text'>Password</span>
                            </label>
                        </div>
                        

                        <div className='field'>
                            <input type="password" name="conf-password" autocomplete="off"
                                onChange={(e) => setConfPass(e.target.value)}
                                required />
                            <label for="conf-password" className='label-wrapper'>
                                <span className='label-text'>Confirm password</span>
                            </label>
                        </div>

                        {!correctPass && regPressed && <div className='existing'>Pogresan password</div>}

                        <button className='register' onClick={(e) => register(e)}>REGISTRACIJA</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Registration