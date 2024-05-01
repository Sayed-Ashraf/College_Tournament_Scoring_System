import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    eventName: '',
    eventType: 'Individual', 
    eventCategory: 'Sport',
    points: '',
    questions: Array(5).fill(''),
    answers: Array(5).fill(''),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('question')) {
      const index = parseInt(name.replace('question', ''), 10);
      const updatedQuestions = [...values.questions];
      updatedQuestions[index] = value;
      setValues({ ...values, questions: updatedQuestions });
    } else if (name.startsWith('answer')) {
      const index = parseInt(name.replace('answer', ''), 10);
      const updatedAnswers = [...values.answers];
      updatedAnswers[index] = value;
      setValues({ ...values, answers: updatedAnswers });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const validateForm = () => {
    let errors = [];

    if (!values.eventName || values.eventName.length < 6 || values.eventName.length > 255) {
      errors.push('Enter a valid event name (at least 6 characters, max 255 characters)');
    }

    if (!values.eventType) {
      errors.push('Select an event type');
    }

    if (!values.eventCategory) {
      errors.push('Select an event category');
    }

    if (!values.points || isNaN(values.points) || values.points < 0 || values.points > 100) {
      errors.push('Enter a valid points value (between 0 and 100)');
    }

    values.questions.forEach((question, index) => {
      if (!question || question.length < 6 || question.length > 255) {
        errors.push(`Enter a valid question ${index + 1} (at least 6 characters, max 255 characters)`);
      }
    });

    values.answers.forEach((answer, index) => {
      if (!answer || answer.length > 255) {
        errors.push(`Enter a valid answer ${index + 1} (at least 6 characters, max 255 characters)`);
      }
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const eventData = {
      eventName: values.eventName,
      eventType: values.eventType,
      eventCategory: values.eventCategory,
      points: values.points,
      questions: values.questions,
      answers: values.answers,
    };

    axios
      .post('http://localhost:3010/events/add', eventData, {
        })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          Swal.fire({
            title: 'Success!',
            text: res.data.message,
            icon: 'success',
          });
          navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.log('Err' + err);
        Swal.fire({
          title: 'Error!',
          text: 'Can\'t add the event!',
          icon: 'error',
        });
      });

    console.log('Form submitted:', values);
    setValues({
      eventName: '',
      eventType: '',
      eventCategory: '',
      points: '',
      questions: Array(5).fill(''),
      answers: Array(5).fill(''),
    });
  };

  return (
    <div className='vh-300 mt-5 mb-5 w-100 d-flex justify-content-center align-items-center'>
      <form className='w-50' onSubmit={handleSubmit}>
        <h1 className='text-center' style={{ fontSize: '30px' }}>
          Add Event
        </h1>
        <div className='form-group mt-3'>
          <label htmlFor='eventName' className='form-label'>
            Event Name
          </label>
          <input
            type='text'
            name='eventName'
            id='eventName'
            className='form-control'
            value={values.eventName}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='eventType' className='form-label'>
            Event Type
          </label>
          <select className='form-select' name='eventType' value={values.eventType} onChange={handleChange}>
            <option value='Individual'>Individual</option>
            <option value='Team'>Team</option>
          </select>
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='eventCategory' className='form-label'>
            Event Category
          </label>
          <select className='form-select' name='eventCategory' value={values.eventCategory} onChange={handleChange}>
            <option value='Sport'>Sport</option>
            <option value='Academic'>Academic</option>
          </select>
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='points' className='form-label'>
            Points
          </label>
          <input
            type='number'
            name='points'
            id='points'
            className='form-control'
            value={values.points}
            onChange={handleChange}
          />
        </div>
        {[...Array(5)].map((_, index) => (
          <React.Fragment key={index}>
            <div className='form-group mt-3'>
              <label htmlFor={`question${index}`} className='form-label'>
                Question {index + 1}
              </label>
              <input
                type='text'
                name={`question${index}`}
                id={`question${index}`}
                className='form-control'
                value={values.questions[index]}
                onChange={handleChange}
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor={`answer${index}`} className='form-label'>
                Answer {index + 1}
              </label>
              <input
                type='text'
                name={`answer${index}`}
                id={`answer${index}`}
                className='form-control'
                value={values.answers[index]}
                onChange={handleChange}
              />
            </div>
          </React.Fragment>
        ))}
        <div className='mt-3 text-center'>
          <input type='submit' className='btn btn-primary' value={'Add Event'} />
        </div>
        <Toaster position='bottom-right' reverseOrder={false} />
      </form>
    </div>
  );
};

export default CreateEvent;
