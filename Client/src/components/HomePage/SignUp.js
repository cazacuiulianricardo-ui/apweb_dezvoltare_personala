import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance'; 

const SignUp = () => {
    const [formData, setFormData] = useState({ nume: '', email: '', parola: '', tipUtilizator: 'client' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            setSuccessMessage('Cont creat cu succes! Te poți autentifica acum.');
            setErrorMessage('');
          
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Eroare la înregistrare.');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input type="text" name="nume" placeholder="Nume" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="parola" placeholder="Parola" onChange={handleChange} required />
            <select name="tipUtilizator" onChange={handleChange}>
                <option value="client">Client</option>
                <option value="instructor">Instructor</option>
            </select>
            <button type="submit">Înregistrare</button>
        </form>
    );
};

export default SignUp;
