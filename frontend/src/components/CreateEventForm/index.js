import { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
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
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const [userId] = useState(sessionUser.id);
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

    const onSubmit = async(e) => {
        e.preventDefault();
        const event = {
            title,
            description,
            image,
            sport,
            date,
            startTime,
            endTime,
            date,
            venueId,
            userId,
        };
        console.log(event)
        try {
        const res = await csrfFetch(`/api/venues/${venueId}/create`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json"
        }})
    } catch (err){
      console.log(err);
  }
     history.push(`/venues/${venueId}`)
  };

    return (
        <div className="whole-form">
          <a href={`/venues/${venueId}`}>Return to previous page</a>
          <form className="event-form" onSubmit={onSubmit}>
          <h2>Create an Event</h2>
              <ul className="errors">
                  {errors.map(error => (
                      <li key={error}>{error}</li>
          ))}
        </ul>
              <input
                  type="text"
                  name="title"
                  className="create-event-title"
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
                          className="select-sport"
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
                <div className="create-date">
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
                  </div>
                  <div className="create-time">
                  <label>   Start Time:
                      <input 
                          type="time"
                          nam="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required                    
                      >
                      </input>
                  </label>
                  <label>    End Time:
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
              <div className="create-description">
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
              <div className="create-image">
                  <input
                  type="text"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  >
                  </input>
              </div>
              <div>
                  <button disabled={!!errors.length} type="submit" className="submitForm">Create Event</button>
              </div>
          </form>
    </div>
    )

};
export default CreateEventForm;