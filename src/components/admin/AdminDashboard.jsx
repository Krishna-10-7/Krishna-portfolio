import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, isFirebaseConfigured } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ProjectManager from './ProjectManager';
import BlogManager from './BlogManager';
import ProfileManager from './ProfileManager';
import './Admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage first
        const localAuth = localStorage.getItem('isAdminLoggedIn');

        if (isFirebaseConfigured && auth) {
            // Check Firebase Auth state
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsAuthenticated(true);
                    setUserEmail(user.email);
                    setLoading(false);
                } else if (localAuth === 'true') {
                    setIsAuthenticated(true);
                    setUserEmail('admin@portfolio.com');
                    setLoading(false);
                } else {
                    navigate('/login');
                }
            });
            return () => unsubscribe();
        } else {
            // No Firebase, check localStorage
            if (localAuth === 'true') {
                setIsAuthenticated(true);
                setUserEmail('admin@portfolio.com');
            } else {
                navigate('/login');
            }
            setLoading(false);
        }
    }, [navigate]);

    const handleLogout = async () => {
        if (isFirebaseConfigured && auth) {
            try {
                await signOut(auth);
            } catch (error) {
                console.log('Signout error:', error);
            }
        }
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-user">
                    <span>{userEmail}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <nav className="admin-tabs">
                <button
                    className={activeTab === 'projects' ? 'active' : ''}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects
                </button>
                <button
                    className={activeTab === 'blogs' ? 'active' : ''}
                    onClick={() => setActiveTab('blogs')}
                >
                    Blogs
                </button>
                <button
                    className={activeTab === 'profile' ? 'active' : ''}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
            </nav>

            <main className="admin-content">
                {activeTab === 'projects' && <ProjectManager />}
                {activeTab === 'blogs' && <BlogManager />}
                {activeTab === 'profile' && <ProfileManager />}
            </main>
        </div>
    );
};

export default AdminDashboard;
