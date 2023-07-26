import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {

  const [ username, setUsername ] = useState(null);
  const [ password, setPassword ] = useState(null);


  const login = () => {

  }


  return (
    <div className='content'>

        <div className='container'>

            <div className='title-container'>
                <div>Prijava</div>
                <div>
                    Nemate profil?
                    <Link to='/registration'>Registracija</Link>
                </div>
            </div>

            <div className='form-container'>
              
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

                <button className='login-btn'>PRIJAVA</button>
                <Link to='/password/reset'>Zaboravili ste sifru?</Link>

              </div>

            </div>

        </div>

    </div>
  );
}

export default Login;