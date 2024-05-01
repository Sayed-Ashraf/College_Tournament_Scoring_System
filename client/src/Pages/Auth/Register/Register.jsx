import React, { useState, useContext } from 'react';
import './Register.css';
import img from '../../../assets/hero-img.jpg';
import { Link, useNavigate } from 'react-router-dom';
import useAuth  from '../../../Components/Hook/useAuth' // Import useAuth hook
import  toast, {Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Register = () => {
  // const { register, error } = useAuth(); // Use the register function and error state from useAuth
  const { register } = useAuth();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    inteam: false,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues({ ...values, [name]: newValue });
  };

  const validateForm = () => {
    let errors = [];

    // Validate name
    if (!values.name || values.name.length < 6 || values.name.length > 255) {
      errors.push('Enter a valid name (at least 6 characters, max 255 characters)');
    }

    // Validate email
    if (!values.email || values.email.length > 255) {
      errors.push('Enter a valid email (max 255 characters)');
    }

    // Validate password
    if (!values.password || values.password.length < 8 || values.password.length > 255) {
      errors.push('Enter a valid password (at least 8 characters, max 255 characters)');
    }

    // Display errors if any
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register(values.name, values.email, values.password, values.inteam);

    } catch (error) {
      throw new Error(error.message);
    }

    setValues({ name: '', email: '', password: '', inteam: false });
  };

  return (
    <div className="con">
      <div className="reg-con w-75">
        <div className="form">
          <header style={{ paddingTop: '50px' }}>Register</header>
          <form className="mt-4" style={{ marginLeft: '50px' }} action="" onSubmit={handleSubmit}>
            <div className="sec-1 col-md-6 col-12 col-sm-12">
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="reg-name"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="reg-email"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={values.password}
                  onChange={handleChange}
                  className="reg-password"
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  name="inteam"
                  checked={values.inteam}
                  onChange={handleChange}
                  className="form-check-input"
                  id="inteam"
                />
                <label htmlFor="inteam" className="form-check-label" style={{ marginLeft: '10px' }}>
                  Register as Team
                </label>
              </div>
            </div>
            <section>
              <input type="submit" value="Register" className="submit" />
            </section>
          </form>
          <div className="msg">
            Already have an account <Link to="/login" className='text-primary underline'>Login</Link> now!
          </div>
        </div>
        <div className="reg-img">
          <img src={img} alt="" />
        </div>
        <>
          <Toaster position="bottom-right" reverseOrder={false} />
        </>
      </div>
    </div>
  );
};

export default Register;
