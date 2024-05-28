

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function GetTask() {
  const notify = () => toast("Tasks Get succesfully.");

  const [taskData, setTaskData] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    discription: '',
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
      <ToastContainer />
      <button  onClick={() => {
    handleGetTask();
    notify();
  }} style={{ marginBottom:"10px", padding: '8px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Get Task
      </button>
      {taskData && taskData.tasks && (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
    {taskData.tasks.map(task => (
      <div key={task._id} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0.5, 0.5, 0.5, 0.5)' }}>
        <h3 style={{ marginBottom: '10px', color: '#333' }}>{task.title}</h3>
        <p style={{ marginBottom: '5px' }}><strong>Title:</strong> {task.title}</p>
        <p style={{ marginBottom: '5px' }}><strong>Discription:</strong> {task.discription}</p>
        <p style={{ marginBottom: '5px' }}><strong>Priority:</strong> {task.priority}</p>
        <p style={{ marginBottom: '5px' }}><strong>Category:</strong> {task.category}</p>
        <p style={{ marginBottom: '5px' }}><strong>Email:</strong> {task.email}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button style={{ padding: '8px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDeleteTask(task._id)}>Delete</button>
          <button style={{ padding: '8px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleUpdateTask(task)}>Update</button>
        </div>
      </div>
    ))}
  </div>
)}

{error && <p style={{ color: 'red' }}>{error}</p>}
{showUpdateModal && (
  <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: '1', left: '0', top: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-content" style={{ backgroundColor: '#fefefe', padding: '20px', borderRadius: '10px', maxWidth: '500px' }}>
      <span className="close" style={{ float: 'right', cursor: 'pointer', fontSize: '20px' }} onClick={handleCloseModal}>&times;</span>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Update Task</h3>
      <label style={{ marginBottom: '10px' }}>Title:</label>
      <input type="text" name="title" value={updatedTask.title} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
      <label style={{ marginBottom: '10px' }}>Description:</label>
      <input type="text" name="discription" value={updatedTask.discription} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
      <label style={{ marginBottom: '10px' }}>Priority:</label>
      <input type="text" name="priority" value={updatedTask.priority} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
      <label style={{ marginBottom: '10px' }}>Category:</label>
      <input type="text" name="category" value={updatedTask.category} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
      <label style={{ marginBottom: '10px' }}>Email:</label>
      <input type="text" name="email" value={updatedTask.email} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} /><br />
      <button onClick={handleUpdate} style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', float: 'right' }}>Update</button>
    </div>
  </div>
)}

    </div>
  );
}

export default GetTask;

