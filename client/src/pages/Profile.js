import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import './Profile.css';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

function Profile() {


    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('username'))
            setUsername(localStorage.getItem('username'));

        if (localStorage.getItem('role'))
            setRole(localStorage.getItem('role'));
    }, []);

    useEffect(() => {

        if (username)
            localStorage.setItem('username', username);
        else{
            localStorage.removeItem('username');
        }

    }, [username]);

    useEffect(() => {

        if (role)
            localStorage.setItem('role', role);
        else
            localStorage.removeItem('role');

    }, [role]);

    return (
        <>
            <div className='cover-img'>
                <div className='darken'>
                    <Navbar username={username} setUsername={setUsername} setRole={setRole} />
                </div>
            </div>
            <div className='profile-content'>
                <div className='profile-img'>
                    <Avatar name={username} size='100%' color='transparent' />
                </div>
                <div className='profile-name'>{username}</div>
            </div>
            <div className='settings'>
                <div className='profile-field'>
                    <label for='username' className='profile-label'>Username</label>
                    <input type='text' name='username' required />
                </div>

                <div className='profile-field'>
                    <label for='email' className='profile-label'>Email</label>
                    <input type='email' name='email' required />
                </div>

                <div className='profile-field'>
                    <label for='new-password' className='profile-label'>New password</label>
                    <input type='password' name='new-password' required />
                </div>

                <div className='profile-field'>
                    <label for='old-password' className='profile-label'>Old Password</label>
                    <input type='password' name='password' required />
                </div>
                
                <button className='save-btn'>Sacuvaj</button>
            </div>
        </>

    )
}

export default Profile;