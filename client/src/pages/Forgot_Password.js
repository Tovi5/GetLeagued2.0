import React from 'react'
import { Link } from 'react-router-dom';
import './Forgot_Password.css';

function Forgot_Password() {
  return (
    <div className='content-pass'>

        <div className='header'>
            <span>Reset Password</span>
        </div>

        <div className='container-pass'>

            <div className='field-pass'>
                <input type="email" name="email" autocomplete="off" required />
                <label for="email" className='label-wrapper'>
                    <span className='label-text'>Email</span>
                </label>
            </div>

            <div className='field-pass'>
                <input type="password" name="new-password" autocomplete="off" required />
                <label for="new-password" className='label-wrapper'>
                    <span className='label-text'>New password</span>
                </label>
            </div>

            <div className='field-pass'>
                <input type="password" name="conf-new-password" autocomplete="off" required />
                <label for="conf-new-password" className='label-wrapper'>
                    <span className='label-text'>Confirm new password</span>
                </label>
            </div>

            <button className='reset-btn'>RESET PASSWORD</button>

        </div>

    </div>
  )
}

export default Forgot_Password