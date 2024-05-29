import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';
import useSignin from './useSignin';

const Signin = () => {
  const {notify,formData,isHovered,setIsHovered,focusedInput,setFocusedInput,handleChange,handleSubmit,handleSignin} = useSignin();

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="title">Sign In</h2>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          className={`input ${focusedInput === 'name' ? 'input-focus' : ''}`}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`input ${focusedInput === 'email' ? 'input-focus' : ''}`}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`input ${focusedInput === 'password' ? 'input-focus' : ''}`}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
        />
        <ToastContainer />
        <button
          type="submit"
          onClick={() => {
            handleSignin();
            notify();
          }}
          className={`button ${isHovered ? 'button-hover' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Log In
        </button>
        <div className="footer">
          Already have an account? <a href="/">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
