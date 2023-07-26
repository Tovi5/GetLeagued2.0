import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css';

function Registration() {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [ correctPass, setCorrectPass ] = useState(false);
    const [ userInfo, setUserInfo ] = useState([]);

    const [ emptyInput, setEmptyInput ] = useState(true);
    const [ exstUsername, setExstUsername ] = useState(false);
    const [ exstEmail, setExstEmail ] = useState(false);
    const [ exstPassword, setExstPassword ] = useState(false);

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


    const register = (e) => { //async kasnije kad budem dodavao redirect na homepage posle registracije
        e.preventDefault();

        if(!existingEmail() && !existingPassword() && !existingUsername() && correctPass)
            console.log('REGISTRACIJA USPJESNA');
        else if(!username || !email || !password)
            console.log('Popunite sva potrebna polja!');
        else if(existingUsername())
            console.log('Username vec postoji.');
        else if(existingEmail())
            console.log('Email je vec u upotrebi.');
        else if(existingPassword())
            console.log('Password je zauzet.');
        else if(!correctPass)
            console.log('Pogresan password.');
    }


    return (
        <div className='content'>

            <div className='container'>

                <div className='title-container'>
                    <div>Registracija</div>
                    <div>
                        Vec imas profil?
                        <Link to='/login'>Prijava</Link>
                    </div>
                </div>

                <div className='form-container'>

                    {<div>Popunite sva potrebna polja!</div>}

                    <div className='field'>
                        <input type="text" name="username" autocomplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                        <label for="username" className='label-wrapper'>
                            <span className='label-text'>Username</span>
                        </label>
                    </div>

                    <div className='field'>
                        <input type="email" name="email" autocomplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                        <label for="email" className='label-wrapper'>
                            <span className='label-text'>Email</span>
                        </label>
                    </div>

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
                        onChange={(e) => {e.target.value === password ? setCorrectPass(true) : setCorrectPass(false)}}
                        required />
                        <label for="conf-password" className='label-wrapper'>
                            <span className='label-text'>Confirm password</span>
                        </label>
                    </div>

                    <button className='register' onClick={(e) => register(e)}>REGISTRACIJA</button>

                </div>

            </div>

        </div>
    )
}

export default Registration