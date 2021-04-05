import './AllVenues.css';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import { formatDate, formatTime } from '../../store/date-time';

const AllVenues = () => {
    const [allVenues, setAllVenues] = useState([]);

    const GetAllVenues = async() => {
        const res = await csrfFetch('/api/search/venues');
        let foundVenues = await res.json();
        setAllVenues(foundVenues);
    }

    useEffect(() => {
        GetAllVenues();
    }, [setAllVenues])

    console.log(allVenues)
    return (
        <div className="all-venues">
            <h2>Local Sports Bars:</h2>
            <div className="venue-cards">
                {allVenues.map(venue => (
                    <div className="individual-venue" key={venue.id}>
                        <a href={`/venues/${venue.id}`}>
                        <img className="venue-card-image" src={venue.image} />                            
                        </a>
                        <a href={`/venues/${venue.id}`}>
                            <div className="card-title">{venue.name}</div>
                        </a>
                        <h4 className="location-name">{venue.location}</h4>
                        <p className="venue-description">{venue.description}</p>
                    </div>
            ))}
            </div>
        </div>
    )

}

export default AllVenues;