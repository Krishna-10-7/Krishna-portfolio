import React from 'react';

const MainMenu = ({ currentSection, onSectionChange }) => {
  const menuItems = [
    { id: 'home', icon: 'fas fa-home', text: 'Home' },
    { id: 'about', icon: 'fas fa-user', text: 'About Me' },
    { id: 'resume', icon: 'fas fa-graduation-cap', text: 'Resume' },
    { id: 'portfolio', icon: 'fas fa-briefcase', text: 'Portfolio' },
    { id: 'blog', icon: 'fab fa-blogger-b', text: 'Blog' },
    { id: 'contact', icon: 'fas fa-envelope', text: 'Contact' }
  ];

  return (
    <ul className="main-menu">
      {menuItems.map(item => (
        <li key={item.id}>
          <a 
            href={`#${item.id}`}
            className={currentSection === item.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
            }}
          >
            <i className={item.icon}></i>
            <span className="link-text">{item.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MainMenu; 