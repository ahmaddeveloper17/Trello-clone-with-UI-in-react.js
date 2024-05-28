import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';

const Signin = () => {
  const notify = () => toast("User Login Successfully");

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
    // Here you can add logic to handle signup (e.g., API call)
  };

  const handleSignin = async () => {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      localStorage.setItem('token', data.token); 
      window.location.href = 'addTask';
    } else {
      console.log(data.error);
    }
  };

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
