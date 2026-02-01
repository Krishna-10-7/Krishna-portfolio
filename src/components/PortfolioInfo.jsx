import React from 'react';
import profilePhoto from '../assets/ChatGPT Image Mar 29, 2025, 09_52_39 PM.png';

const PortfolioInfo = () => {
  return (
    <section className="portfolio-info">
      <div className="user-profile">
        <div className="profile-image">
          <img src={profilePhoto} alt="Profile Photo" />
        </div>
        <h1 className="user-name">Krishna Pandey</h1>
        <p className="user-designation">Software Engineer</p>
        <div className="social-links">
          <a href="https://github.com/Krishna-10-7" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="mailto:kp6615856@gmail.com" className="social-link" title="Email"><i className="fas fa-envelope"></i></a>
          <a href="https://instagram.com/_krishna_o4" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          {/* <a href="#" className="social-link" title="LinkedIn"><i className="fab fa-linkedin"></i></a> */}
          {/* <a href="#" className="social-link" title="Twitter"><i className="fab fa-twitter"></i></a> */}
        </div>
        <a href="#" className="download-cv">Download CV</a>
      </div>
      <div className="copyright">© 2025 Krishna Pandey</div>
    </section>
  );
};

export default PortfolioInfo; 