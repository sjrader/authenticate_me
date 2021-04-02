import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [tenEvents, setTenEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [venueList, setVenueList] = useState([]);

    const GetTenEvents = async() => {
        const res = await csrfFetch('/api/events/homepageten');
        let events = await res.json();
        setTenEvents(events)
    };

    const GetMyEvents = async() => {
        const res = await csrfFetch(`/api/events/rsvps/${sessionUser.id}`);
        let rsvps = await res.json();
        setMyEvents(rsvps);
        console.log('Testing ===>', rsvps)

    };

    useEffect(() => {
        GetTenEvents();
        GetMyEvents();
    }, [setTenEvents])

    return (
       <div>
       <h1>Next ten upcoming events on KickOff:</h1>
        {tenEvents.map(event => (
            <div key={event.id}>
            <h2><a href={`/events/${event.id}`}>{event.title}</a></h2>
            <h4>On {event.date} from {event.startTime} until {event.endTime}</h4>
            <a href={`/venues/${event.venueId}`}>Located at {event.Venue.name}</a>
            </div>
        ))}
       </div>
    )
}

export default HomePage;