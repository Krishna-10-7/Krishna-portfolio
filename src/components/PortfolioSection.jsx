import React from 'react';
import { useData } from '../context/DataContext';
import './PortfolioSection.css';

const PortfolioSection = () => {
    const { projects } = useData();

    return (
        <section id="portfolio-section">
            <div className="section-title">
                <h2>Portfolio</h2>
            </div>
            <div className="portfolio-grid">
                {projects.map(project => (
                    <div key={project.id} className="portfolio-item">
                        <div className="portfolio-image">
                            <img src={project.image} alt={project.title} />
                            <div className="portfolio-overlay">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <a href={project.link} className="view-project">View Project</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PortfolioSection;