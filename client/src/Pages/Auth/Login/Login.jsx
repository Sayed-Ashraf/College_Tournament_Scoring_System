import React, { useState } from 'react';
import './Login.css';
import img from '../../../assets/hero-img.jpg';
import { Link, useNavigate } from 'react-router-dom';
import useAuth  from '../../../Components/Hook/useAuth' //Import useAuth hook
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const { login, user } = useAuth(); // Use the login function from useAuth
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;

    if (!email || !password || password.length < 8) {
      toast.error('Enter valid email and password (password should be at least 8 characters)');
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
      await login(values.email, values.password);
      // Redirect to homepage or dashboard after successful login
      console.log("User:", user);
      console.log(user.role);
      await user && user.role === "admin" ? navigate('/dashboard') : navigate('/home');
    
    } catch (error) {
      console.log(error.message);
      // Handle login error (e.g., show error message to user)
    }

    setValues({ email: '', password: '' });
  };

  return (
    <div className="con">
      <div className="login-con w-75">
        <div className="log-img">
          <img src={img} alt="" />
        </div>
        <div className="form">
          <header>Login</header>
          <form action="" className='row' onSubmit={handleSubmit}>
            <div className="sec-1 col-12">
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  name="email"
                  className='log-email'
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  onChange={handleChange}
                  className='log-password'
                />
              </div>
              <section>
                <input type="submit" value="Login" className="submit" />
              </section>
            </div>
          </form>
          <div className="msg">
            Don't have an account <Link to="/register" className='text-primary underline'>Register</Link> now!
          </div>
          <>
          <Toaster position="bottom-right" reverseOrder={false} />
        </>
        </div>
      </div>
    </div>
  );
};

export default Login;
