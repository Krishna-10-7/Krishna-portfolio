import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUpload from './ImageUpload';

const BlogManager = () => {
    const { blogs, addBlog, updateBlog, deleteBlog } = useData();
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        content: ''
    });

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            image: '',
            content: ''
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateBlog(editingId, formData);
        } else {
            await addBlog(formData);
        }
        resetForm();
    };

    const handleEdit = (blog) => {
        setFormData({
            title: blog.title,
            category: blog.category,
            date: blog.date,
            image: blog.image,
            content: blog.content || ''
        });
        setEditingId(blog.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this blog post?')) {
            await deleteBlog(id);
        }
    };

    const handleImageUploaded = (imageUrl) => {
        setFormData(prev => ({ ...prev, image: imageUrl }));
    };

    return (
        <div className="manager">
            <h2>{editingId ? 'Edit Blog Post' : 'Add Blog Post'}</h2>

            <form onSubmit={handleSubmit} className="manager-form">
                <div className="form-row">
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
                        <label>Category</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="e.g. Tech, Design"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Cover Image</label>
                    <ImageUpload
                        currentImage={formData.image}
                        onImageUploaded={handleImageUploaded}
                        folder="blogs"
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows="8"
                        placeholder="Write your blog content here..."
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {editingId ? 'Update' : 'Publish'} Post
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="btn-secondary">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="items-list">
                <h3>Blog Posts ({blogs.length})</h3>
                {blogs.length === 0 ? (
                    <p className="no-items">No blog posts yet. Add one above.</p>
                ) : (
                    blogs.map(blog => (
                        <div key={blog.id} className="item-card">
                            {blog.image && (
                                <img src={blog.image} alt={blog.title} className="item-thumb" />
                            )}
                            <div className="item-info">
                                <h4>{blog.title}</h4>
                                <span className="item-meta">{blog.category} • {blog.date}</span>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(blog)}>Edit</button>
                                <button onClick={() => handleDelete(blog.id)} className="delete">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogManager;
