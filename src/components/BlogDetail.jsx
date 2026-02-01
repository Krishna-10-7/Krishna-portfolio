import React from 'react';
import './BlogSection.css';

const BlogDetail = ({ blog, onBack }) => {
    return (
        <div className="blog-detail-container">
            <button onClick={onBack} className="back-btn">
                ← Back to Blogs
            </button>

            <div className="blog-detail-content">
                <div className="blog-detail-header">
                    <span className="blog-category">{blog.category}</span>
                    <span className="blog-date">{blog.date}</span>
                </div>

                <h1>{blog.title}</h1>

                <div className="blog-detail-image">
                    <img src={blog.image} alt={blog.title} />
                </div>

                <div className="blog-body">
                    {blog.content ? (
                        blog.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))
                    ) : (
                        <p>No content available for this blog post.</p>
                    )}
                </div>

                {blog.link && blog.link !== '#' && (
                    <div className="blog-external-link">
                        <a href={blog.link} target="_blank" rel="noopener noreferrer">
                            Read Original Article
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
