import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { formatDate, formatTime } from '../../store/date-time'
import './HomePage.css';

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [tenEvents, setTenEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [venueList, setVenueList] = useState([]);
    const [membersAttending, setMembersAttending] = useState('')

    const GetTenEvents = async() => {
        const res = await csrfFetch('/api/events/homepageten');
        let events = await res.json();
        setTenEvents(events)
    };

    const GetMyEvents = async() => {
        const res = await csrfFetch(`/api/events/rsvps/${sessionUser.id}`);
        let rsvps = await res.json();
        setMyEvents(rsvps);

    };

    let homeRender;
    if (sessionUser) {
        homeRender = (
        <>
            <div className="upcoming">
                    <h2>My upcoming events:</h2>
                    <div className="event-card">
                        {myEvents.map(event => (
                             <div className="upcoming-individual" key={event.id}>
                             <img className="card-image" src={event.Event.image} />
                                <a href={`/events/${event.Event.id}`}>
                                    <div className="card-title">{event.Event.title}</div>
                                </a>
                                <h4>On {formatDate(event.Event.date)} starting at {formatTime(event.Event.startTime)}</h4>
                                <a href={`/venues/${event.Event.venueId}`}>Venue information </a>
                             </div>
                          ))}
                    </div>
             </div> 
        <div className="upcoming">
            <h2>Next five upcoming events on KickOff:</h2>
            <div className="event-card">
             {tenEvents.map(event => (
                 <div className="upcoming-individual" key={event.id}>
                    <img className="card-image" src={event.image} />
                    <a href={`/events/${event.id}`}>
                        <div className="card-title">{event.title}</div>
                    </a>
                    <h4>On {formatDate(event.date)} starting at {formatTime(event.startTime)}</h4>
                    <a className="location-name" href={`/venues/${event.venueId}`}>Located at {event.Venue.name}</a>
                 </div>
             ))}
             </div>
         </div>
        </>
        );
    } 
    else {
        homeRender = (
        <>
        <div className="upcoming">
            <h2>Next five upcoming events on KickOff:</h2>
            <div className="event-card">
             {tenEvents.map(event => (
                 <div className="upcoming-individual" key={event.id}>
                    <img className="card-image" src={event.image} />
                    <a href={`/events/${event.id}`}>
                        <div className="card-title">{event.title}</div>
                    </a>
                    <h4>On {formatDate(event.date)} starting at {formatTime(event.startTime)}</h4>
                    <a className="location-name" href={`/venues/${event.venueId}`}>Located at {event.Venue.name}</a>
                 </div>
             ))}
             </div>
         </div>
         </>
        );
    }

    useEffect(() => {
        GetTenEvents();
        if (sessionUser) {           
            GetMyEvents();
        }
    }, [setTenEvents, setMyEvents])

        console.log(myEvents);
    return (
       <div>
       {homeRender}
       </div>
    )
}

export default HomePage;