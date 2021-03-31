import { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './CreateEventForm.css'

function CreateEventForm() {
    const SPORTS = [
        "NFL",
        "MLB",
        "NBA",
        "NHL",
        "NCAA"
    ];
    let { venueId } = useParams();
    venueId = parseInt(venueId)
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [sport, setSport] = useState(SPORTS[0]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const [userId] = useState(sessionUser.id);
    const [date, setDate] = useState('');
    // also need to add in an event date to have separate from start/end time
    //need to make changes to the database, should ask advisors before I do this though
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const errors = [];
        if ((startTime && endTime) && endTime <= startTime) {
            errors.push('Invalid timeframe.')
        };
        if (!sessionUser) {
            errors.push('Create an account to make an event!')
        }
        setErrors(errors)
    }, [endTime, startTime]);

//     const createEvent = (async(req, res) => {
//         try {
//       const res = await fetch(`/${venueId}/create`, {
//         method: "POST",
//         body: JSON.stringify(event),
//         headers: {
//           "Content-Type": "application/json"
//         }})
//     } catch (err){
//       console.log(err);
//   }})

    const onSubmit = async(e) => {
        e.preventDefault();
        const event = {
            title,
            description,
            image,
            sport,
            startTime,
            endTime,
            date,
            venueId,
            userId,
        };
        console.log(event)
        try {
      const res = await fetch(`/${venueId}/create`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json"
        }})
    } catch (err){
      console.log(err);
  }
//      history.push(`/venues/${venueId}`)
  };

    return (
        <form className="event-form" onSubmit={onSubmit}>
        <a href={`/venues/${venueId}`}>Return to previous page</a>
        <h2>Create an Event</h2>
            <ul className="errors">
                {errors.map(error => (
                    <li key={error}>{error}</li>
        ))}
      </ul>
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
                        >
                        {SPORTS.map(sport => (
                            <option
                            key={sport}
                            value={sport}
                            required
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
                value={image}
                onChange={(e) => setImage(e.target.value)}
                >
                </input>
            </div>
            <div>
                <button disabled={!!errors.length} type="submit" className="submitForm">Create Event</button>
            </div>
        </form>
    )

};
export default CreateEventForm;