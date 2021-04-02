import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import VenueDisplay from './components/Venue';
import CreateEventForm from './components/CreateEventForm';
import EventDisplay from './components/Event';
import HomePage from './components/HomePage';
import AllEvents from './components/AllUpComingEvents'
import * as sessionsActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionsActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (  
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage /> 
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/venues/:venueId'>
            <VenueDisplay />
          </Route>
          <Route path='/venues/:venueId/create'>
            <CreateEventForm />
          </Route>
          <Route path='/events/:eventId'>
            <EventDisplay />
          </Route>
          <Route path='/search/all'>
            <AllEvents />
          </Route>
          <Route>
            <h2>Nothing found here</h2>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
