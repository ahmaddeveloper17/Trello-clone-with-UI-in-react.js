

import  { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../constants';
function useGetTask() {
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
      const response = await fetch(`${URL}/task/getTask`, {
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
      const response = await fetch(`${URL}/task/deleteTask/${taskId}`, {
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
      const response = await fetch(`${URL}/task/updateTask/${selectedTask._id}`, {
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

  return{notify,updatedTask,taskData,error,showUpdateModal,handleGetTask,handleDeleteTask,handleUpdateTask,handleInputChange,handleUpdate,handleCloseModal}
}

export default useGetTask;

