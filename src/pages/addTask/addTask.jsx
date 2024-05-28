import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addTask.css';
import useAddTask from './useAddTask';

const AddTask = () => {
  const {notify ,formData,isHovered,setIsHovered,focusedInput,setFocusedInput,handleChange,handleSubmit,handleAddTask} = useAddTask();

  return (
    <div className="add-task-wrapper">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <h2 className="add-task-title">Add Tasks</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={`add-task-input ${focusedInput === 'title' ? 'add-task-input-focus' : ''}`}
          onFocus={() => setFocusedInput('title')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className={`add-task-input ${focusedInput === 'category' ? 'add-task-input-focus' : ''}`}
          onFocus={() => setFocusedInput('category')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="text"
          name="discription"
          placeholder="Discription"
          value={formData.discription}
          onChange={handleChange}
          className={`add-task-input ${focusedInput === 'discription' ? 'add-task-input-focus' : ''}`}
          onFocus={() => setFocusedInput('discription')}
          onBlur={() => setFocusedInput(null)}
        />
        <input
          type="text"
          name="dueDate"
          placeholder="DueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`add-task-input ${focusedInput === 'dueDate' ? 'add-task-input-focus' : ''}`}
          onFocus={() => setFocusedInput('dueDate')}
          onBlur={() => setFocusedInput(null)}
        />
        <ToastContainer />
        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
          className={`add-task-input ${focusedInput === 'priority' ? 'add-task-input-focus' : ''}`}
          onFocus={() => setFocusedInput('priority')}
          onBlur={() => setFocusedInput(null)}
        />
        <button
          type="submit"
          onClick={() => {
            handleAddTask();
            notify();
          }}
          className={`add-task-button ${isHovered ? 'add-task-button-hover' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Add Task
        </button>
        <button
          type="button"
          className={`add-task-button ${isHovered ? 'add-task-button-hover' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ marginTop: "10px" }}
        >
          <Link to="/getTask" style={{ textDecoration: 'none', color: 'inherit' }}>Get Task</Link>
        </button>
      </form>
    </div>
  );
};

export default AddTask;
