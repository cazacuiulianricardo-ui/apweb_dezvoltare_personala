import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'; 

const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', parola: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/auth/signin', formData);
            const token = response.data.token;
            login(token); 

            const decoded = jwtDecode(token);

            if (decoded.tipUtilizator === 'client') {
                navigate('/abonamente2');
            } else if (decoded.tipUtilizator === 'instructor') {
                navigate('/instructor/cursurile-mele-create');
            } else {
                navigate('/');
            }
        } catch (error) {
            setErrorMessage('Email sau parolă incorectă.');
            toast.error('Email sau parolă incorectă.'); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="parola"
                    placeholder="Parola"
                    value={formData.parola}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Autentificare...' : 'Autentificare'}
                </button>
            </form>
        </div>
    );
};

export default SignIn;
