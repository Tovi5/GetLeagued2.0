import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import './Profile.css';
import Avatar from 'react-avatar';
import { TiTickOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

function Profile() {


    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [newPass, setNewPass] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');

    const [successful, setSuccessful] = useState(false);

    const [incorrectPass, setIncorrectPass] = useState(false);
    const [samePass, setSamePass] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);

    const [odjavljen, setOdjavljen] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        if (localStorage.getItem('username')){
            setUsername(localStorage.getItem('username'));
            setNewUsername(localStorage.getItem('username'));
        }

        if (localStorage.getItem('role'))
            setRole(localStorage.getItem('role'));

        if (localStorage.getItem('id'))
            setId(localStorage.getItem('id'));

        if (localStorage.getItem('email')){
            setEmail(localStorage.getItem('email'));
            setNewEmail(localStorage.getItem('email'));
        }            
        
        if (localStorage.getItem('password'))
            setPassword(localStorage.getItem('password'));

        if(JSON.parse(localStorage.getItem('odjavljen')))
            setOdjavljen(JSON.parse(localStorage.getItem('odjavljen')));
    }, []);

    useEffect(() => {

        if (username)
            localStorage.setItem('username', username);
        else
            localStorage.removeItem('username');

        if (role)
            localStorage.setItem('role', role);
        else
            localStorage.removeItem('role');

        if (email)
            localStorage.setItem('email', email);
        else
            localStorage.removeItem('email');

        if(!odjavljen)
            localStorage.setItem('odjavljen', JSON.stringify(odjavljen));
        else{
            localStorage.removeItem('odjavljen');
            navigate('/');
        }

    }, [username]);


    const reset = () => {
        setEmptyInput(false);
        setSamePass(false);
        setIncorrectPass(false);
    }

    const onSave = async (e) => {
        e.preventDefault();
        setSaveClicked(true);

        reset();

        if(!oldPass){
            setEmptyInput(true);
        }
        else if(oldPass !== password){
            setIncorrectPass(true);
        }
        else if(oldPass === newPass){
            setSamePass(true);
        }
        else{
            await fetch(`http://localhost:5000/updateUser/${id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body : JSON.stringify({
                    'username': newUsername,
                    'email': newEmail,
                    'password': newPass
                })
            });

            setSuccessful(true);

            setPassword(newPass);
            setEmail(newEmail);
            setUsername(newUsername);
        }

    }

    const onBack = () => {
        setSuccessful(false);
        setSaveClicked(false);
    }

    return (
        <>
            {successful && <div className='successful-change'>
                <div className='msg-container'>
                    <div className='avatar'><TiTickOutline className='check-icon'/></div>
                    <div className='succ-title'>Uspjesno!</div>
                    <div className='succ-desc'>Vasi podaci su uspjesno azurirani.</div>
                    <button className='go-back' onClick={() => onBack()}>Nazad</button>
                </div>
            </div>}
            <div className='cover-img'>
                <div className='darken'>
                    <Navbar username={username} setUsername={setUsername} setRole={setRole} role={role} setOdjavljen={setOdjavljen} />
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
                    <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} required value={username} />
                </div>

                <div className='profile-field'>
                    <label for='email' className='profile-label'>Email</label>
                    <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} required value={email} />
                </div>

                <div className='profile-field'>
                    <label for='new-password' className='profile-label'>Nova sifra</label>
                    <input type='password' name='new-password' onChange={(e) => setNewPass(e.target.value)} required placeholder='Nova sifra' />
                </div>
                {saveClicked && samePass && <div className='error'>Nova i stara sifra moraju da se razlikuju.</div>}

                <div className='profile-field'>
                    <label for='old-password' className='profile-label'>Trenutna sifra</label>
                    <input type='password' name='password' onChange={(e) => setOldPass(e.target.value)} required placeholder='Trenutna sifra' />
                </div>
                {saveClicked && emptyInput && <div className='error'>Molim vas popunite ovo polje.</div>}
                {saveClicked && incorrectPass && <div className='error'>Pogresna sifra.</div>}
                
                <button className='save-btn' onClick={(e) => onSave(e)}>Sacuvaj</button>
            </div>
        </>
    )
}

export default Profile;