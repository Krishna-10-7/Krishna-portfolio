import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../config/firebase';
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';
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
    const [useFirebase, setUseFirebase] = useState(false);

    // Load from localStorage (fallback)
    const loadFromLocalStorage = () => {
        const savedProjects = localStorage.getItem('portfolio_projects');
        const savedBlogs = localStorage.getItem('portfolio_blogs');
        const savedProfile = localStorage.getItem('portfolio_profile_image');

        setProjects(savedProjects ? JSON.parse(savedProjects) : resumeData.projects || []);
        setBlogs(savedBlogs ? JSON.parse(savedBlogs) : resumeData.blogs || []);
        if (savedProfile) setProfileImage(savedProfile);
        setLoading(false);
    };

    // Initialize - check Firebase or use localStorage
    useEffect(() => {
        if (!isFirebaseConfigured || !db) {
            console.log('Firebase not configured, using localStorage');
            loadFromLocalStorage();
            return;
        }

        // Try Firestore
        console.log('Attempting Firebase connection...');
        const projectsRef = collection(db, 'projects');

        const unsubscribe = onSnapshot(projectsRef,
            (snapshot) => {
                console.log('Firebase connected successfully');
                setUseFirebase(true);
                const projectsData = snapshot.docs.map(d => ({
                    id: d.id,
                    ...d.data()
                }));
                setProjects(projectsData);

                // Also subscribe to blogs
                const blogsRef = collection(db, 'blogs');
                onSnapshot(blogsRef, (blogSnapshot) => {
                    const blogsData = blogSnapshot.docs.map(d => ({
                        id: d.id,
                        ...d.data()
                    }));
                    setBlogs(blogsData);
                    setLoading(false);
                });
            },
            (error) => {
                console.warn('Firebase error, falling back to localStorage:', error);
                loadFromLocalStorage();
            }
        );

        return () => unsubscribe();
    }, []);

    // CRUD Operations
    const addProject = async (project) => {
        if (useFirebase && db) {
            await addDoc(collection(db, 'projects'), {
                ...project,
                createdAt: serverTimestamp()
            });
        } else {
            const newProject = { ...project, id: Date.now() };
            const updated = [...projects, newProject];
            setProjects(updated);
            localStorage.setItem('portfolio_projects', JSON.stringify(updated));
        }
    };

    const updateProject = async (id, projectData) => {
        if (useFirebase && db) {
            await updateDoc(doc(db, 'projects', id), projectData);
        } else {
            const updated = projects.map(p =>
                p.id === id ? { ...p, ...projectData } : p
            );
            setProjects(updated);
            localStorage.setItem('portfolio_projects', JSON.stringify(updated));
        }
    };

    const deleteProject = async (id) => {
        if (useFirebase && db) {
            await deleteDoc(doc(db, 'projects', id));
        } else {
            const updated = projects.filter(p => p.id !== id);
            setProjects(updated);
            localStorage.setItem('portfolio_projects', JSON.stringify(updated));
        }
    };

    const addBlog = async (blog) => {
        if (useFirebase && db) {
            await addDoc(collection(db, 'blogs'), {
                ...blog,
                createdAt: serverTimestamp()
            });
        } else {
            const newBlog = { ...blog, id: Date.now() };
            const updated = [...blogs, newBlog];
            setBlogs(updated);
            localStorage.setItem('portfolio_blogs', JSON.stringify(updated));
        }
    };

    const updateBlog = async (id, blogData) => {
        if (useFirebase && db) {
            await updateDoc(doc(db, 'blogs', id), blogData);
        } else {
            const updated = blogs.map(b =>
                b.id === id ? { ...b, ...blogData } : b
            );
            setBlogs(updated);
            localStorage.setItem('portfolio_blogs', JSON.stringify(updated));
        }
    };

    const deleteBlog = async (id) => {
        if (useFirebase && db) {
            await deleteDoc(doc(db, 'blogs', id));
        } else {
            const updated = blogs.filter(b => b.id !== id);
            setBlogs(updated);
            localStorage.setItem('portfolio_blogs', JSON.stringify(updated));
        }
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
            useFirebase,
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
