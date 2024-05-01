import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { PointsContext } from './EventDetails'
import axios from 'axios'

const EventResults = () => {
  const {points} = React.useContext(PointsContext)
  const decoded = jwtDecode(localStorage.getItem('token'));
  const userId = decoded.id;
  const {id: eventId} = useParams();

  React.useEffect(() => {
    console.log(points);
    axios.post(`http://localhost:3010/event/${eventId}/results`, {userId, eventId, points}, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    } )
  }, [])
  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 text-center">           
          <h2 className='m-2'>User Details</h2>
          <h2 className='m-2'></h2>
          <h2 className='m-2'>sdadassdasadadsdsa</h2>
          <h2 className='m-2'>dasdsadsa</h2> 
          <Link  className='btn btn-primary me-2 m-2'>Edit</Link>
          <Link  className='btn btn-info m-2'>Back</Link>
      </div>
    </div>
  )
}

export default EventResults