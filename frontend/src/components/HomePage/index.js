import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [tenEvents, setTenEvents] = useState([]);
    const TenUpComingEvents = async() => {

    }

    return (
        <h2> Test</h2>
    )
}

export default HomePage;