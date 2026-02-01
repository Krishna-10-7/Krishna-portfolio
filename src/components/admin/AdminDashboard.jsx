import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectManager from './ProjectManager';
import BlogManager from './BlogManager';
import ProfileManager from './ProfileManager';
import './Admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const localAuth = localStorage.getItem('isAdminLoggedIn');
        if (localAuth === 'true') {
            setIsAuthenticated(true);
        } else {
            navigate('/login');
        }
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
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
                    <span>admin@portfolio.com</span>
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
