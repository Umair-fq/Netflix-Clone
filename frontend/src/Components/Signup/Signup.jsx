import React, { useState } from 'react';
import './Signup.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../Utils/firebase-config';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
            console.log(error)
        }
        // console.log('Email:', email, 'Password:', password);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate('/')
        }
    })

    return (
        <div className="signup-container">
            <Link to='/login'><button className="login-button">Login</button></Link>
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={togglePasswordVisibility} type="button" className="toggle-password">
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
