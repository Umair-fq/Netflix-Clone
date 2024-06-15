// Login.jsx
import React, { useState } from 'react';
import './Login.css'; 
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        // Implementation of login logic
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.error(error)
        }
        // console.log('Logging in with Email:', email, 'Password:', password);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) 
            navigate("/");
      });
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Welcome Back</h2>
                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={togglePasswordVisibility} type="button" className="show-password">
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
