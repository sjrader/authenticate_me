import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import mlbLogo from '../../Images/mlb-logo.jpg';
import nhlLogo from '../../Images/NHL-logo.jpg'
import nflLogo from '../../Images/nfl-logo.jpg';
import nbaLogo from '../../Images/nba-logo.jpg';
import ncaaLogo from '../../Images/ncaa-logo.jpg';
import { formatDate, formatTime } from '../../store/date-time';
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
    };

    const sessionLink = <a className="linkChoice" href={`/venues/${venue.id}/create`}>Don't see an event you were looking for? Create one here!</a>
    const signUpLink = <a className="linkChoice" href={`/signup`}>Want to create an event? Sign up for an account here!</a>
    const linkChoice = sessionUser ? sessionLink : signUpLink
    const mlbChoice = venue.mlb ? mlbLogo : '';
    const nflChoice = venue.nfl ? nflLogo: '';
    const nbaChoice = venue.nba ? nbaLogo : '';
    const nhlChoice = venue.nhl ? nhlLogo : '';
    const ncaaChoice = venue.ncaa ? ncaaLogo : '';


    useEffect(() => {
        // This prevented the page from running on an infinite loop, 
        // It only runs when the venueId is changing again, probably a better way
        // for this to be accomplished?
        GetVenue()
        GetVenueEvents()
    }, [venueId])


    return (
        <div className="whole-render">
            <div className="venue-page-div">
                <h2 className="venue-name">{venue.name} </h2>
                <a className="venue-website" href={venue.website}>Website</a>
                <h4 className="venue-location">{venue.location}</h4>
                <div className="venue-card">
                    <div >
                        <img className="bar-image" src={venue.image} alt={`${venue.name}`}/>
                    </div>
                    <div className="venue-options">
                        <h4>Sports shown here:</h4>
                        <img className="league-logo" src={mlbChoice}/>
                        <img className="league-logo" src={nflChoice} />
                        <img className="league-logo" src={nbaChoice} />
                        <img className="league-logo" src={nhlChoice} />
                        <img className="league-logo" src={ncaaChoice} />
                    </div>
                </div>
                <p className="venue-description">{venue.description}</p>
            </div>
            <div>
                <div className="event-headline">
                    <h3>Upcoming Events at {venue.name}:</h3>
                    {linkChoice}
                </div>
                <div className="venue-event-card">
                    {events.map(event => (
                        <div className="upcoming-individual-event" key={event.id}>
                            <img className="card-image" src={event.image} />
                            <a href={`/events/${event.id}`}>
                            <div className="card-title">{event.title}</div>
                            </a>
                               <div>
                                   <h3>{formatDate(event.date)}</h3>
                                   <h3>From {formatTime(event.startTime)} until {formatTime(event.endTime)}</h3>
                                   <p>{event.description}</p>
                               </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};



export default VenueDisplay;