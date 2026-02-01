import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, isFirebaseConfigured } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Admin.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Try Firebase Auth if configured
        if (isFirebaseConfigured && auth) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                localStorage.setItem('isAdminLoggedIn', 'true');
                navigate('/admin');
                setLoading(false);
                return;
            } catch (firebaseError) {
                console.log('Firebase auth error:', firebaseError.code);
                if (firebaseError.code === 'auth/invalid-email') {
                    setError('Invalid email format');
                    setLoading(false);
                    return;
                } else if (firebaseError.code === 'auth/user-not-found') {
                    setError('User not found in Firebase');
                    setLoading(false);
                    return;
                } else if (firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
                    setError('Incorrect password');
                    setLoading(false);
                    return;
                }
                // For other errors, try local fallback
            }
        }

        // Local authentication fallback
        if (email === 'admin@portfolio.com' && password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            navigate('/admin');
        } else {
            if (!isFirebaseConfigured) {
                setError('Use: admin@portfolio.com / admin123');
            } else {
                setError('Invalid credentials');
            }
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Admin Login</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {!isFirebaseConfigured && (
                    <p className="login-hint">
                        Default: admin@portfolio.com / admin123
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
