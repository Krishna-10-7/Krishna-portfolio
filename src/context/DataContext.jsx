import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeData } from '../data/resumeData';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [profileImage, setProfileImage] = useState('/assets/images/profile.png');
    const [loading, setLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        const loadData = () => {
            const savedProjects = localStorage.getItem('portfolio_projects');
            const savedBlogs = localStorage.getItem('portfolio_blogs');
            const savedProfile = localStorage.getItem('portfolio_profile_image');

            setProjects(savedProjects ? JSON.parse(savedProjects) : resumeData.projects || []);
            setBlogs(savedBlogs ? JSON.parse(savedBlogs) : resumeData.blogs || []);
            if (savedProfile) setProfileImage(savedProfile);
            setLoading(false);
        };

        loadData();
    }, []);

    // CRUD Operations for Projects
    const addProject = (project) => {
        const newProject = { ...project, id: Date.now() };
        const updated = [...projects, newProject];
        setProjects(updated);
        localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    };

    const updateProject = (id, projectData) => {
        const updated = projects.map(p =>
            p.id === id ? { ...p, ...projectData } : p
        );
        setProjects(updated);
        localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    };

    const deleteProject = (id) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    };

    // CRUD Operations for Blogs
    const addBlog = (blog) => {
        const newBlog = { ...blog, id: Date.now() };
        const updated = [...blogs, newBlog];
        setBlogs(updated);
        localStorage.setItem('portfolio_blogs', JSON.stringify(updated));
    };

    const updateBlog = (id, blogData) => {
        const updated = blogs.map(b =>
            b.id === id ? { ...b, ...blogData } : b
        );
        setBlogs(updated);
        localStorage.setItem('portfolio_blogs', JSON.stringify(updated));
    };

    const deleteBlog = (id) => {
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        localStorage.setItem('portfolio_blogs', JSON.stringify(updated));
    };

    const updateProfileImage = (imageUrl) => {
        setProfileImage(imageUrl);
        localStorage.setItem('portfolio_profile_image', imageUrl);
    };

    return (
        <DataContext.Provider value={{
            projects,
            blogs,
            profileImage,
            loading,
            addProject,
            updateProject,
            deleteProject,
            addBlog,
            updateBlog,
            deleteBlog,
            updateProfileImage
        }}>
            {children}
        </DataContext.Provider>
    );
};
