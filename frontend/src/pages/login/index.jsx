import { handleLogIn } from '@/config/redux/action/authAction';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from './style.module.css'; // No curly braces

const index = () => {
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        username:"",
        password:"",
    });
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setFormData((prev)=>{
            return {
                ...prev,
                [name]:value,
            }
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(handleLogIn(formData));
    }
  return (
   <div className={styles.loginContainer}>
    <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.inputField}
        />
        <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
        />
        <button type="submit" className={styles.loginButton}>Log In</button>
    </form>
</div>

  )
}

export default index