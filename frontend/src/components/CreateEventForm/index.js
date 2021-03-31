import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateEventForm.css'

function CreateEventForm() {
    const SPORTS = [
        "",
        "NFL",
        "MLB",
        "NBA",
        "NHL",
        "NCAA"
    ];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [sport, setSport] = useState('');
    const [startTime, setStartTime] = useState(SPORTS[0]);
    const [endTime, setEndTime] = useState('')
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    // also need to add in an event date to have separate from start/end time
    //need to make changes to the database, should ask advisors before I do this though
    const [errors, setErrors] = useState([]);

    const { venueId } = useParams();
    
    const onSubmit = e => {
        e.preventDefault();
        console.log(
            venueId

        )
    };

    return (
        <form className="event-form">
        {/* {console.log('Testing',venueId)} */}
        <h2>Create an Event</h2>
            <input
                type="text"
                name="title"
                placeholder="Event Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            >
            </input>
            <div>
                <label>
                Select a sport
                    <select
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                        required
                        >
                        {SPORTS.map(sport => (
                            <option
                            key={sport}
                            value={sport}
                            >
                            {sport}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>Date:
                    <input 
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    >
                    </input>
                </label>
                <label>Start Time:
                    <input 
                        type="time"
                        nam="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    >
                    </input>
                </label>
                <label>End Time:
                    <input 
                        type="time"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    >
                    </input>
                </label>
            </div>
            <div>
                <label>
                </label>
                <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event!"
                required
                ></textarea>
            </div>
            <div>
                <input
                type="text"
                placeholder="Optional image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                >
                </input>
            </div>
            <div>
                <button type="submit" className="submitForm">Create Event</button>
            </div>
        </form>
    )

};
export default CreateEventForm;