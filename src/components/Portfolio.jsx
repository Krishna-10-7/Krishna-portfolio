import React, { useState } from 'react';
import PortfolioInfo from './PortfolioInfo.jsx';
import ContentLoader from './ContentLoader.jsx';
import MainMenu from './MainMenu.jsx';
import NavButtons from './NavButtons.jsx';
import '../styles/main.css';

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const handleSectionChange = (sectionId) => {
    if (sectionId === currentSection) return;
    setCurrentSection(sectionId);
  };

  return (
    <div className="page">

      <div className="page-content">
        <PortfolioInfo />
        <ContentLoader currentSection={currentSection} />
      </div>

      <NavButtons currentSection={currentSection} onSectionChange={handleSectionChange} />
      <MainMenu currentSection={currentSection} onSectionChange={handleSectionChange} />
    </div>
  );
};

export default Portfolio; 