import  { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';
import { URL } from '../../constants';
const useSignup = () => {
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
      const response = await fetch(`${URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        if (data) {
          window.location.href = '/signin';
        }
      } else {
        console.error('Signup failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return {notify,formData,isHovered,setIsHovered,focusedInput,setFocusedInput,handleChange,handleSignup,handleSubmit}
};

export default useSignup;
