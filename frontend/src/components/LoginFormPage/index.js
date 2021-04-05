import React, { useState } from 'react';
import * as sessionsActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
//CSS style needs to be done

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to='/' />
    );

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionsActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const handleDemoSubmit = e => {
        e.preventDefault();
        setCredential('DemoLogin');
        setPassword('password');
        return dispatch(sessionsActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
            });
    }
    
    return (
        <div className="whole-form">
        <form onSubmit={handleSubmit} className="login-form">
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li> )}
        </ul>
        <div className="login-username">
        <label>
            Username    
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
        </label>
        </div>
        <div className="login-password">
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
        <button className="login-button" type="submit">Log in</button>
        </form>
        <form onSubmit={handleDemoSubmit}>
        <button className="demo-login-button" type="submit">Demo Log in</button>
        </form>
    </div>
    );
}

export default LoginFormPage;