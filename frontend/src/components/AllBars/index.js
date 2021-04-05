import './AllBars';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import { formatDate, formatTime } from '../../store/date-time';

const AllEvents = () => {
    const [allBars, setAllBars] = useState([]);

    const GetAllEvents = async() => {
        const res = await csrfFetch('/api/search/bars');
        let foundEvents = await res.json();
        setAllEvents(foundEvents);
    }

    useEffect(() => {
        GetAllBars();
    }, [setAllBars])

    console.log(allEvents)
    return (
        <div className="all-bars">
            <h2>Upcoming Events:</h2>
            <div className="bar-cards">
                {allEvents.map(event => (
                    <div className="individual-bar" key={event.id}>
                        <a href={`/events/${event.id}`}>
                        <img className="card-image" src={event.image} />                            
                        </a>
                        <a href={`/events/${event.id}`}>
                            <div className="card-title">{event.title}</div>
                        </a>
                        <h4>On {formatDate(event.date)} starting at {formatTime(event.startTime)}</h4>
                        <a className="location-name" href={`/venues/${event.venueId}`}>Located at {event.Venue.name}</a>
                        <p className="event-description">{event.description}</p>
                    </div>
            ))}
            </div>
        </div>
    )

}

export default AllEvents;