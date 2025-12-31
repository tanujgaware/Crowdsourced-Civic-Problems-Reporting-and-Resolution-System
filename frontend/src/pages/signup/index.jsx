import { handleSignIn } from '@/config/redux/action/authAction';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from './style.module.css'; // CSS module

const index = () => {
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        email:"",
        username:"",
        password:"",
        role:"",
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
        dispatch(handleSignIn(formData));
    }
  return (
    <div className={styles.formContainer}>
            <form className={styles.formCard} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                >
                    <option value="">---Choose Role---</option>
                    <option value="Citizen">Citizen</option>
                    <option value="Official">Official</option>
                </select>
                <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
        </div>
  )
}

export default index