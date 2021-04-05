import React, { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionsActions from '../../store/session';
import './SignupFormPage.css'
//CSS style needs to be done


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionsActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };
    return (
        <div>
        <h2>Signup for KickOff</h2>
        <div className="whole-form">
        <form onSubmit={handleSubmit} className="event-form">
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="signup-email"></div>
            <label>
                Email
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <div className="signup-username">
            <label>
                Username
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            </div>
            <div className="signup-password">
            <label>
                Password
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> 
            </label>
            </div>
            <div className="signup-confirm">
            <label>
                Confirm Password
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            </div>
            <button className="signup-submit" type="submit">Sign Up</button>
        </form>
        </div>
    </div>
    ); 
}

export default SignupFormPage;