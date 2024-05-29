import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';
import { URL } from '../../constants';
const useSignin = () => {
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
  };

  const handleSignin = async () => {
    const response = await fetch(`${URL}/auth/login`, {
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

  return{notify,formData,isHovered,setIsHovered,focusedInput,setFocusedInput,handleChange,handleSubmit,handleSignin}
};

export default useSignin;
