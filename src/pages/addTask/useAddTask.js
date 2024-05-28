import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addTask.css';

const useAddTask = () => {
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
    if (response.status === 200) {
      console.log(data);
    } else {
      console.log(data.error);
    }
  };

  return{
    notify ,isHovered,setIsHovered,focusedInput,setFocusedInput,handleChange,handleSubmit,handleAddTask,formData
  }
};

export default useAddTask;
