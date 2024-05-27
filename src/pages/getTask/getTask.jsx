

import React, { useState } from 'react';

function GetTask() {
  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    email: ''
  });

  const handleGetTask = async () => {
    try {
      const response = await fetch('http://localhost:4000/task/getTask', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setTaskData(data);
        setError(null);
      } else {
        setError(data.message);
        setTaskData(null);
      }
    } catch (error) {
      setError('Failed to fetch task. Please try again later.');
      setTaskData(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:4000/task/deleteTask/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        // Remove the deleted task from the state
        setTaskData(prevData => ({
          ...prevData,
          tasks: prevData.tasks.filter(task => task._id !== taskId)
        }));
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to delete task. Please try again later.');
    }
  };

  const handleUpdateTask = (task) => {
    setSelectedTask(task);
    setUpdatedTask(task);
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/task/updateTask/${selectedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
      });
      if (response.status === 200) {
        // Update the task in the state
        setTaskData(prevData => ({
          ...prevData,
          tasks: prevData.tasks.map(task => {
            if (task._id === selectedTask._id) {
              return updatedTask;
            }
            return task;
          })
        }));
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to update task. Please try again later.');
    }
    setShowUpdateModal(false);
    setSelectedTask(null);
    setUpdatedTask({
      title: '',
      discription: '',
      priority: '',
      category: '',
      email: ''
    });
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedTask(null);
    setUpdatedTask({
      title: '',
      discription: '',
      priority: '',
      category: '',
      email: ''
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Task Viewer</h2>
      <button onClick={handleGetTask} style={{ margin: '10px' }}>
        Get Task
      </button>
      {taskData && taskData.tasks && (
        <div>
          {taskData.tasks.map(task => (
            <div key={task._id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h3>{task.title}</h3>
              <p><strong>Title:</strong> {task.title}</p>
              <p><strong>Description:</strong> {task.discription}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Category:</strong> {task.category}</p>
              <p><strong>Email:</strong> {task.email}</p>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              <button onClick={() => handleUpdateTask(task)}>Update</button>
            </div>
          ))}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>Update Task</h3>
            <label>Title:</label>
            <input type="text" name="title" value={updatedTask.title} onChange={handleInputChange} /><br />
            <label>Description:</label>
            <input type="text" name="discription" value={updatedTask.discription} onChange={handleInputChange} /><br />
            <label>Priority:</label>
            <input type="text" name="priority" value={updatedTask.priority} onChange={handleInputChange} /><br />
            <label>Category:</label>
            <input type="text" name="category" value={updatedTask.category} onChange={handleInputChange} /><br />
            <label>Email:</label>
            <input type="text" name="email" value={updatedTask.email} onChange={handleInputChange} /><br />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetTask;

