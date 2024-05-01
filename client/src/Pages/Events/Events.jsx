import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Events = () => {
  const [events, setEvents] = React.useState([]);
  const decoded = jwtDecode(localStorage.getItem('token'));
  const inteam = decoded.inTeam || false;

  const getEvents = async () => {
    const response = await axios.get('http://localhost:3010/events', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    setEvents(response.data);
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-between">
          {inteam
            ? events
                .filter((event) => event.eventType === 'Team')
                .map((event, index) => (
                  <div className="card text-center w-25 p-3 mt-5 mr-3" key={index}>
                    <div className="card-body">
                      <h1 className="card-title"><span style={{fontWeight: "700"}}>Name:</span> {event.eventName}</h1>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Type:</span> {event.eventType}</p>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Category:</span> {event.eventCategory}</p>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Points:</span> {event.points}</p>
                      <Link to={`/events/${event.id}`} className="btn btn-primary mt-3">Subscribe</Link>
                    </div>
                  </div>
                ))
            : events
                .filter((event) => event.eventType === 'Individual')
                .map((event, index) => (
                  <div className="card text-center w-25 p-3 mt-5 mr-3" key={index}>
                    <div className="card-body">
                      <h1 className="card-title"><span style={{fontWeight: "700"}}>Name:</span> {event.eventName}</h1>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Type:</span> {event.eventType}</p>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Category:</span> {event.eventCategory}</p>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Points:</span> {event.points}</p>
                      <Link to={`/events/${event.id}`} className="btn btn-primary mt-3">Subscribe</Link>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
