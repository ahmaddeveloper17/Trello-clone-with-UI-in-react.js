import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const styles = {
  signupWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F146CA',
  },
  signupForm: {
    background: '#D1235A',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(2, 2, 2, 2.1)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center',
    fontSize: '1.75rem',
    fontWeight: 'bold',
marginTop:"-25px"
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
    marginBottom:"-3px",
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

const AddTask = () => {
  const notify = () => toast("Task added successfully");

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    discription: '',
    dueDate: '',
    priority: '',
    email: 'email'
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

  const handleAddTask = async () => {
    const response = await fetch('http://localhost:4000/task/addTask', {
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
    } else {
      console.log(data.error);
    }
  };

  return (
    <div style={styles.signupWrapper}>
      <form style={styles.signupForm} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Add Tasks</h2>
        <input
          type="title"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'title' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('title')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="category"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'category' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('category')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="discription"
          name="discription"
          placeholder="Discription"
          value={formData.discription}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'discription' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('discription')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="dueDate"
          name="dueDate"
          placeholder="DueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'dueDate' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('dueDate')}
          onBlur={() => setFocusedInput(null)}
        />
                  <ToastContainer />

        <input
          type="priority"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(focusedInput === 'priority' && styles.inputFocus),
          }}
          onFocus={() => setFocusedInput('priority')}
          onBlur={() => setFocusedInput(null)}
        />
        
            
        <button
          type="submit"
          onClick={() => {
            handleAddTask();
            notify();
          }}          style={{
            ...styles.button,
            ...(isHovered && styles.buttonHover),
        }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Add Task
        </button>
        <button
  type="submit"
  style={{
    ...styles.button,
    ...(isHovered && styles.buttonHover),
    marginTop: "10px"
  }}
>
  <Link to="/getTask" style={{ textDecoration: 'none', color: 'inherit' }}>Get Task</Link>
</button>
      </form>
    </div>
  );
};

export default AddTask;
