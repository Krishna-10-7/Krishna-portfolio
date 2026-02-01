import React, { useState, useEffect, useRef } from 'react';
import Resume from './Resume';
import PortfolioSection from './PortfolioSection';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';

const sectionOrder = ['home', 'about', 'resume', 'portfolio', 'blog', 'contact'];

const ContentLoader = ({ currentSection }) => {
    const [prevSection, setPrevSection] = useState(null);
    const [direction, setDirection] = useState('next');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const prevIndex = sectionOrder.indexOf(prevSection);
        const currentIndex = sectionOrder.indexOf(currentSection);
        setDirection(currentIndex > prevIndex ? 'next' : 'prev');
        setPrevSection(currentSection);
    }, [currentSection]);

    useEffect(() => {
        setPrevSection(currentSection);
    }, []);

    const getSectionClass = (sectionId) => {
        if (sectionId === currentSection) {
            return `content-section active slide-in-${direction}`;
        }
        return 'content-section';
    };

    return (
        <section className="content-loader">
            <div className="loader-container">
                <div id="home" className={`${getSectionClass('home')} home-content`}>
                    <h1 className="home-title">Krishna Pandey</h1>
                    <h2 className="home-subtitle">Software Engineer</h2>
                </div>

                <div id="about" className={getSectionClass('about')}>
                    <div className="about-container">
                        <h2 className="about-title">About <span className="highlight">Me</span></h2>
                        <div className="about-content">
                            <p className="about-text">
                                Hello there!! Welcome to my web site. Yes, this is another boring web site.
                                I made it because I am a vain human who has little life out of computers.
                                This page is about things that I like to do. Because this is a personal web site
                                you may read a lot the word I. No, that doesn't mean that I am selfish.
                                I really care about humanity and I help my neighbour. Now, if you are bored
                                don't go on to read the rest of the site, you will be more bored
                            </p>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">DOB</span>
                                    <span className="info-value">2004/10/05</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Residence</span>
                                    <span className="info-value">India</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">e-mail</span>
                                    <span className="info-value">kp66158@gmail.com</span>
                                </div>
                            </div>
                            <div className="what-i-do">
                                <h3 className="what-i-do-title">What <span className="highlight">I Do</span></h3>
                                <div className="activities-grid">
                                    <div className="activity-card">
                                        <div className="activity-icon">
                                            <i className="fas fa-coffee"></i>
                                        </div>
                                        <h4>Free Time</h4>
                                        <p>At my free time, besides programming I love watching movies and TV shows, reading books, playing video games and listen to music.</p>
                                    </div>
                                    <div className="activity-card">
                                        <div className="activity-icon">
                                            <i className="fas fa-code"></i>
                                        </div>
                                        <h4>Programming</h4>
                                        <p>I like building web apps that may be helpful to others. I use node, Python or Java for the backend, Vue for the front-end and React Native for the mobile versions of my apps.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="resume" className={getSectionClass('resume')}>
                    <Resume />
                </div>

                <div id="portfolio" className={getSectionClass('portfolio')}>
                    <PortfolioSection />
                </div>

                <div id="blog" className={getSectionClass('blog')}>
                    <BlogSection />
                </div>

                <div id="contact" className={getSectionClass('contact')}>
                    <ContactSection />
                </div>
            </div>
        </section>
    );
};

export default ContentLoader;
