import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUpload from './ImageUpload';

const ProjectManager = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        link: ''
    });

    const resetForm = () => {
        setFormData({ title: '', description: '', image: '', link: '' });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateProject(editingId, formData);
        } else {
            await addProject(formData);
        }
        resetForm();
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            link: project.link
        });
        setEditingId(project.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this project?')) {
            await deleteProject(id);
        }
    };

    const handleImageUploaded = (imageUrl) => {
        setFormData(prev => ({ ...prev, image: imageUrl }));
    };

    return (
        <div className="manager">
            <h2>{editingId ? 'Edit Project' : 'Add Project'}</h2>

            <form onSubmit={handleSubmit} className="manager-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <ImageUpload
                        currentImage={formData.image}
                        onImageUploaded={handleImageUploaded}
                        folder="projects"
                    />
                </div>

                <div className="form-group">
                    <label>Project Link</label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {editingId ? 'Update' : 'Add'} Project
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="btn-secondary">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="items-list">
                <h3>Projects ({projects.length})</h3>
                {projects.length === 0 ? (
                    <p className="no-items">No projects yet. Add one above.</p>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="item-card">
                            {project.image && (
                                <img src={project.image} alt={project.title} className="item-thumb" />
                            )}
                            <div className="item-info">
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(project)}>Edit</button>
                                <button onClick={() => handleDelete(project.id)} className="delete">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectManager;
