import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import BlogDetail from './BlogDetail';
import './BlogSection.css';

const BlogSection = () => {
    const { blogs } = useData();
    const [selectedBlog, setSelectedBlog] = useState(null);

    if (selectedBlog) {
        return (
            <section id="blog-section">
                <BlogDetail
                    blog={selectedBlog}
                    onBack={() => setSelectedBlog(null)}
                />
            </section>
        );
    }

    return (
        <section id="blog-section">
            <div className="section-title">
                <h2>Blog</h2>
            </div>
            <div className="blog-grid">
                {blogs.map(post => (
                    <div key={post.id} className="blog-card">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                            <div className="blog-category">{post.category}</div>
                        </div>
                        <div className="blog-content">
                            <div className="blog-date">{post.date}</div>
                            <h3 className="blog-title">{post.title}</h3>
                            <button
                                className="read-more"
                                onClick={() => setSelectedBlog(post)}
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;