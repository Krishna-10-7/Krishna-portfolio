import React from 'react';

const NavButtons = ({ currentSection, onSectionChange }) => {
  const sections = ['home', 'about', 'resume', 'portfolio', 'blog', 'contact'];
  const currentIndex = sections.indexOf(currentSection);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    onSectionChange(sections[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % sections.length;
    onSectionChange(sections[nextIndex]);
  };

  return (
    <div className="nav-buttons">
      <div className="nav-button prev-button" onClick={handlePrev}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className="nav-button next-button" onClick={handleNext}>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default NavButtons; 