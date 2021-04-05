import React, { useState } from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { csrfFetch } from '../../store/csrf';
import './Navigation.css';
//later on import Font Awesome

function Navigation({ isLoaded }) {
    const history = useHistory();
    const [searchTitles, setSearchTitles] = useState('')
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
        console.log('search title => ', searchTitles)
        const res = await csrfFetch('/api/search/');
        const events = await res.json();
        console.log(events)
    }

    return (
        <div className="nav-div">
            <div className="kickoff">
                <NavLink className="kickoff-header" exact to="/">KickOff</NavLink>
            </div>
            <div>
                <NavLink to='/search/all'>
                    <button className="navButton" type='submit'>See all upcoming events</button>
                </NavLink>
            </div>
            <div>
                <NavLink to='/search/venues'>
                    <button className="navButton" type='submit'>Find local bars</button>
                </NavLink>
            </div>
            {/* Will come back and finish the search bar at another time
            <div>
            <form onSubmit={onSearch}>
                <input
                className="search-bar" 
                    value={searchTitles}
                    onChange={(e) => setSearchTitles(e.target.value)} 
                    placeholder='Search for a team name'
                    ></input>           
                <button
                className="kevin-owens-search" 
                type="submit"
                >Search K/O</button>
            </form>
            </div> */}
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;