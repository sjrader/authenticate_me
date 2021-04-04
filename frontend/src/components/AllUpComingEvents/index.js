import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import './AllUpComingEvents.css';

const AllEvents = () => {
    const [allEvents, setAllEvents] = useState([]);

    const GetAllEvents = async() => {
        const res = await csrfFetch('/api/search/all');
        let foundEvents = await res.json();
        setAllEvents(foundEvents);
    }

    useEffect(() => {
        GetAllEvents();
    }, [setAllEvents])

    console.log(allEvents)
    return (
        <div className="upcoming">
            <h2>Upcoming Events:</h2>
            <div className="event-cards">
                {allEvents.map(event => (
                    <div className="upcoming-individual" key={event.id}>
                        <a href={`/events/${event.id}`}>
                        <img className="card-image" src={event.image} />                            
                        </a>
                        <a href={`/events/${event.id}`}>
                            <div className="card-title">{event.title}</div>
                        </a>
                        <h4>On {event.date} starting at {event.startTime}</h4>
                        <a className="location-name" href={`/venues/${event.venueId}`}>Located at {event.Venue.name}</a>
                        <p className="event-description">{event.description}</p>
                    </div>
            ))}
            </div>
        </div>
    )

}

export default AllEvents;