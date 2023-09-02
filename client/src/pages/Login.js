import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import Navbar from '../components/Navbar';

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [emptyInput, setEmptyInput] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [error, setError] = useState(true);


  const reset = () => {
    setEmptyInput(false);
    setError(true);
  }

  const login = async (e) => {
    e.preventDefault();

    setLoginPressed(true);
    reset();

    if (!username || !password)
      setEmptyInput(true);

    else {

      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          'username': username,
          'password': password
        })
      });

      const data = await res.json();

      if (data.length !== 0) {
        const role = data[0].role;

        localStorage.setItem('authenticated', true);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        navigate('/'); // potrebno update-ovanje last_login
      }
      else setError(false);

    }
  }


  return (
    <div className='img-container'>

      <div className='content'>

        <Navbar />

        <div className='container'>

          <div className='title-container'>
            <div>Prijava</div>
            <div>
              Nemate profil?
              <Link to='/registration'>Registracija</Link>
            </div>
          </div>

          <div className='form-container'>

            {emptyInput && loginPressed && <div className='existing'>Popunite sva potrebna polja!</div>}

            {!error && loginPressed && <div className='existing'>Greska pri prijavi. Molim vas probajte ponovo.</div>}

            <div className='field'>
              <input type="text" name="username" autocomplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required />
              <label for="username" className='label-wrapper'>
                <span className='label-text'>Username</span>
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

            

            <div className='btn-container'>

              <button className='login-btn' onClick={(e) => login(e)}>PRIJAVA</button>
              <Link to='/password/reset'>Zaboravili ste sifru?</Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;