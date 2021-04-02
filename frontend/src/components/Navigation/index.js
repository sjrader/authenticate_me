import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
//later on import Font Awesome

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
        <>
            <NavLink to="/login" >Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </>
        );
    }

    const onSearch = async(e) => {
        e.preventDefault();
        history.push('/venues/1')
    }

    return (
        <div>
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
        <div>
            <form onSubmit={onSearch}>
                <input placeholder='Search for events'></input>
                <button type="submit">Search K/O</button>
            </form>
        </div>
        </div>
    );
}

export default Navigation;