import axios from 'axios';
import * as React from 'react';
import { useParams, Link } from 'react-router-dom';

export const PointsContext = React.createContext(0)

const EventDetails = () => {
    const {id} = useParams();
    const [event, setEvent] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState({});
    const [points, setPoints] = React.useState(0);


    const getEvents = async() =>{
        const response = await axios.get(`http://localhost:3010/event/${id}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          setEvent(response.data.event)
          setQuestions(response.data.questions)
          setAnswers(Object.fromEntries(response.data.questions.map((q, index) => [`answer-${index}`, ''])));
        }
        
        const handleAnswerChange = (e) => {
            const { name, value } = e.target;
        setAnswers({...answers, [name]: value});
    }
    
    React.useEffect(() => {
        getEvents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission with answers
        const maxPoints = parseFloat(event.points); // Ensure event.points is parsed to a number
        const rate_of_increasing = maxPoints / 5;
        setPoints(points);
        questions.forEach((question, index) => {
            const answerKey = `answer-${index}`;
            if (answers[answerKey] == question.answer) { // Check if the user's answer matches the correct answer
                points += rate_of_increasing;
            }
        });
        console.log(points);
        console.log(answers["answer-1"]);
        // console.log(q);
        console.log('Answers submitted:', answers);
    };
    
    
    return (
        <PointsContext.Provider value={points}>
            <div className='container-fluid vh-100 d-flex justify-content-center align-items-center'>
                <form onSubmit={handleSubmit} className="container">
                    <header>
                        <h1 style={{fontSize: "30px", fontWeight: "bold"}}>{event.eventName} - Questions</h1>
                    </header>
                    {
                        questions && questions.map((question, index) =>{
                            return (
                                <div className="form-group mt-3" key={index}>
                                    <label htmlFor="" className="form-label">{question.questions}</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name={`answer-${index}`} 
                                        value={answers[`answer-${index}`]} 
                                        onChange={handleAnswerChange} 
                                        required
                                    />
                                </div>
                            )
                        })
                    }
                    <div className="mt-3">
                        <Link to={`/events/${event.id}/results`} className="btn btn-primary">Submit Answers</Link>
                    </div>
                </form>
            </div>
        </PointsContext.Provider>
    )
}

export default EventDetails;
