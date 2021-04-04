import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import './VenuePage.css';
// May want to set up some redux shops for events, but I don't think that 
// it will be needed for venues, since they are relatively simple

const VenueDisplay = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [venue, setVenue] = useState('')
    const [events, setEvents] = useState([])
    const [eventRsvps, setEventRsvps] = useState([]);
    let { venueId } = useParams();
    venueId = parseInt(venueId)
    const GetVenue = async() => {
        // Pretty sure there is a better way to use the router to not have to
        // use an API connection, may be worth fixing if there's enough time
        const res = await csrfFetch(`/api/venues/${venueId}`)
        const newVenue = await res.json();
        setVenue(newVenue)
    };

    const GetVenueEvents = async() => {
        const res = await csrfFetch(`/api/venues/${venueId}/events`)
        const venueEvents = await res.json();
        setEvents(venueEvents);
    }

    const sessionLink = <a className="linkChoice" href={`/venues/${venue.id}/create`}>Don't see an event you were looking for? Create one here!</a>
    const signUpLink = <a className="linkChoice" href={`/signup`}>Want to create an event? Sign up for an account here!</a>
    const linkChoice = sessionUser ? sessionLink : signUpLink


    useEffect(() => {
        // This prevented the page from running on an infinite loop, 
        // It only runs when the venueId is changing again, probably a better way
        // for this to be accomplished?
        GetVenue()
        GetVenueEvents()
    }, [venueId])

    const mlbChoice = venue.mlb ? 'MLB Package' : '';
    const ncaaChoice = venue.ncaa ? 'NCAA' : '';

    return (
    <div>
    <div className="venue-page-div">
        <h2>{venue.name}</h2>
        <div className="venue-info">
            <div >
                <img className="bar-image" src={venue.image} alt={`${venue.name}`}/>
            </div>
            <div>
            <a href={venue.website}>Website</a>
            <h3>{venue.location}</h3>
            {/* Need to make sure these look better, they should not say true or false here
            ultimately */}
            <h4>{mlbChoice}</h4> 
            <h4>NFL: {`${venue.nfl}`}</h4>
            <h4>NBA: {`${venue.nba}`}</h4>
            <h4>NHL: {`${venue.nhl}`}</h4>
            <h4>{ncaaChoice}</h4>
            </div>
        </div>
        <p>{venue.description}</p>
    </div>
    <div className="headline">
        <h3>Events:</h3>
            {linkChoice}
            {events.map(event => (
                <div className="event-listings" key={event.id}>
                    <a href={`/events/${event.id}`}>{event.title}</a>
                       <div>
                           <h3>{event.date}</h3>
                           <h3>Starting at {event.startTime}</h3>
                       </div>
                </div>
            ))}
        </div>
    </div>
    )
};



export default VenueDisplay;