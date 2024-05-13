import React, { useState } from 'react';
import  {ProgrammeSt}  from './ProgrammeSt';
import { RessourcePr } from './RessourcePr';
import { DevoirPr } from './DevoirPr';
import { QuizzPr } from './QuizzPr';
import {  EspaceCollabPr } from './EspaceCollabPr';

const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => {
  return (
    <div className="bg-[#2E85B5] text-white w-1/6 flex flex-col justify-between">
      <h1 className="text-lg font-bold ml-4 mt-4">E-learning</h1> {/* Added E-learning */}
      <div className="flex flex-col mt-3 space-y-4">
        {['programme', 'ressource', 'devoir', 'quizz', 'espace-collaboratif'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-3 py-2 rounded text-left ${
              activeSection === section ? 'bg-white text-[#2E85B5]' : 'hover:bg-white hover:text-[#2E85B5]'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)} {/* Capitalize first letter */}
          </button>
        ))}
      </div>
      <button onClick={handleLogout} className="px-3 py-2 rounded hover:bg-white hover:text-[#2E85B5]">
        Logout
      </button>
    </div>
  );
};

export const ChTd = () => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState('programme'); // Default to 'programme'

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // Redirect to home or login
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-200">
        {activeSection === 'programme' && <ProgrammeSt />}
        {activeSection === 'ressource' && <RessourcePr />}
        {activeSection === 'devoir' && <DevoirPr />}
        {activeSection === 'quizz' && <QuizzPr />}
        {activeSection === 'espace-collaboratif' && <EspaceCollabPr />}
      </div>
    </div>
  );
};

export default ChTd;
