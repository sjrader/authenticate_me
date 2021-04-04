import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import './Event.css';


const EventDisplay = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [event, setEvent] = useState('');
    const [venue, setVenue] = useState('');
    const [eventRsvps, setEventRsvps] = useState([]);
    const [attendStatus, setAttendStatus] = useState('');

    let { eventId } = useParams();
    eventId = parseInt(eventId)
    const GetEvent = async() => {
        const res = await csrfFetch(`/api/events/${eventId}`);
        let currentEvent = await res.json();
         setEvent(currentEvent);
         setVenue(currentEvent.Venue);
    };

    const GetRsvps = async() => {
        const res = await csrfFetch(`/api/events/${eventId}/rsvps`);
        let rsvps = await res.json()
        setEventRsvps(rsvps);
    }

    const onSubmitRSVP = async(e) => {
        e.preventDefault();
        const userId = sessionUser.id
        const rsvp ={
            eventId,
            userId,
            attendStatus
        } 
            try {
                const res = await csrfFetch(`/api/events/${eventId}`, {
                    method: 'POST',
                    body: JSON.stringify(rsvp),
                    headers: {
                        "Content-Type": "application/json"
                    }
                    }   
                    )
                if (res.ok) {
                    const attendStatus = await res.json();
                    setAttendStatus(attendStatus)
                }
            } catch (err) {
                console.log(err)
            }
    }

    useEffect( async() => {
        GetEvent();
        GetRsvps();
            console.log(event.image)
    }, [eventId, setEventRsvps])

    const buttonText = sessionUser ? 'RSVP!' : 'Sign up to RSVP!'

        // Page seems to be loaded 3 times instead of a single. Need to ask about this, but the render is looking fine.
    return (
        <div className="event-page-div">
            <h2 className="event-page-title">{event.title}</h2>
            <div className="event-page-top">
                <img className="event-page-picture" src={event.image} />
                    <div className="attendance-div">
                        <h3 className="event-page-date">{event.date}</h3>
                        <h3 className="event-page-time">Starting at {event.startTime} until {event.endTime}</h3>
                        {/* Need to make this look better when there is more time */}
            <div className="event-page-location"> 
                    <h4>Location: <a href={`/venues/${event.venueId}`}>{venue.name}</a></h4>
                    <h4>{venue.location}</h4>
            </div> 
                <div>
                    <form onSubmit={onSubmitRSVP}>
                    <select
                        value={attendStatus}
                        onChange={(e) => setAttendStatus(e.target.value)}
                        >
                        <option value={'null'}>Want to attend?</option>
                        <option value={'attending'}>I am Attending</option>
                        <option value={'notAttending'}>Will Not Be Attending</option>
                        <option value={'maybeAttending'}>Maybe Attending?</option>
                    </select>
                    <button disabled={!sessionUser} type="submit" onSubmit={onSubmitRSVP}>{buttonText}</button>
                    </form>
                </div>
            </div>
            </div>
            <div>
                <p className="event-page-description">{event.description}</p>
            </div>
        </div>
    )

}

export default EventDisplay;