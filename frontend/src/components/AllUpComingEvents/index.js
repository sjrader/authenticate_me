import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';

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
        <div>
            {allEvents.map(event => (
                <div key={event.id}>
                <h2>{event.title}</h2>
                <h3><a href ={`/venues/${event.Venue.id}`}>{event.Venue.name}</a></h3>
                <h4>On {event.date} starting at {event.startTime}</h4>
                </div>
        ))}
        </div>
    )

}

export default AllEvents;