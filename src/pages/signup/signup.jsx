import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Signup = () => {
  const notify = () => toast("User Registered Successfully");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isHovered, setIsHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const data = await response.json();
      // console.log(data);
      if (response.status === 200) {
        console.log(data);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-wrapper"> {/* Use className instead of style */}
      <form className="signup-form" onSubmit={handleSubmit}> {/* Use className instead of style */}
        <h2 className="title">Sign Up</h2> {/* Use className instead of style */}
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
