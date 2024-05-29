import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';
import useSignup from './useSignup';

const Signup = () => {
 const {notify,formData,isHovered,setIsHovered,focusedInput,setFocusedInput,handleChange,handleSignup,handleSubmit} = useSignup();

  return (
    <div className="signup-wrapper"> 
      <form className="signup-form" onSubmit={handleSubmit}> 
        <h2 className="title">Sign Up</h2> 
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          className="input" 
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input" 
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input" 
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
        />
        <ToastContainer />
        <button
          type="submit"
          onClick={() => {
            handleSignup();
            notify();
          }}
          className={`button ${isHovered ? 'button-hover' : ''}`} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Sign Up
        </button>
        <div className="footer"> 
          Already have an account? <a href="/Signin">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
