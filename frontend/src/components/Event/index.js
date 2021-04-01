import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import './Event.css';


const EventDisplay = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [event, setEvent] = useState('');
    const [venue, setVenue] = useState('')

    let { eventId } = useParams();
    eventId = parseInt(eventId)
    const GetEvent = async() => {
        const res = await fetch(`/api/events/${eventId}`);
        let currentEvent = await res.json();
         setEvent(currentEvent);
         setVenue(currentEvent.Venue)
    }

    useEffect(() => {
        GetEvent();
    }, [eventId])
        console.log('This is the event =>',event)

        // Page seems to be loaded 3 times instead of a single. Need to ask about this, but the render is looking fine.
    return (
        <div>
            <h2>{event.title}</h2>
            <h3>{event.date}</h3>
            <h3>From {event.startTime} until {event.endTime}</h3>
            {/* Need to make this look better when there is more time */}
        < img src={event.image}/>
        <div>
            <label>
                <h2>Location:</h2>
                <a href={`/venues/${event.venueId}`}>{venue.name}</a>
                <h4>{venue.location}</h4>
            </label>
        </div>
            <p>{event.description}</p>
        <div>

        </div>
        </div>
    )

}

export default EventDisplay;