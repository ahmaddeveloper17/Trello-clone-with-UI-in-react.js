import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const styles = {
  signupWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  signupForm: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
    fontSize: '1.75rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  footer: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
  },
};

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
        
      }
    );
    
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
    <div style={styles.signupWrapper}>
      <form style={styles.signupForm} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Sign Up</h2>
        <div>
      </div>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'name' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'email' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'password' && styles.inputFocus),
          }}
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
  style={{
    ...styles.button,
    ...(isHovered && styles.buttonHover),
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  Sign Up
</button>

        <div style={styles.footer}>
          Already have an account? <a href="/Signin">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
