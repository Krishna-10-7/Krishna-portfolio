import React from 'react';
import './Resume.css';

const Resume = () => {
  return (
    <section id="resume">
      <div className="section-title">
        <h2>Resume</h2>
      </div>
      <div className="resume-grid">
        {/* Skills */}
        <div className="resume-skills">
          <div className="skills-section">
            <h2>Programming Languages</h2>
            <div className="skill-list">
              <div className="skill-item">
                <span>C++</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Python</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Java</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>C</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            <h2 className="web-title">Web</h2>
            <div className="skill-list">
              <div className="skill-item">
                <span>HTML5 / CSS3</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Vue</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>JavaScript</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>Bootstrap</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <span>jQuery</span>
                <div className="skill-bar-bg">
                  <div className="skill-bar" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;