import React, { useState } from 'react';
import { Inscrire } from './Inscrire';
import Permissions from './Permissions';


// Sidebar component
const Sidebarr = () => {
  return (
    <div className="w-48 h-full bg-[#2E85B5] text-white p-4">
      {/* Sidebar content */}
    </div>
  );
};

// Navigation bar component
const NavigationBar = ({ setActiveComponent }) => {
  return (
    <div className="flex justify-between bg-[#2E85B5] text-white p-4">
      <div>
        <button
          className="mr-4 hover:bg-[#D9E1E9] hover:text-[#2E85B5] rounded p-3"
          onClick={() => setActiveComponent('Inscrire')}
        >
          Inscrire
        </button>
        <button
          className="hover:bg-[#D9E1E9] p-3 rounded hover:text-[#2E85B5]"
          onClick={() => setActiveComponent('Permissions')}
        >
          Permissions
        </button>
      </div>
      <button className="hover:bg-[#D9E1E9] p-3 rounded hover:text-[#2E85B5]" onClick={handleLogout}>
        Deconnexion
      </button>
    </div>
  );
};

// Main content component
export const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState('Inscrire');

  const handleLogout = () => { 
    // Perform logout operations, e.g., clearing authentication data 
    localStorage.clear(); // Clears all local storage data 
    window.location.href = '/'; // Redirect to login or home page after logout 
  }; 

  let displayedContent;
  if (activeComponent === 'Inscrire') {
    displayedContent = <Inscrire />;
  } else if (activeComponent === 'Permissions') {
    displayedContent = <Permissions />
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar on the left side */}
      <Sidebarr />

      {/* Main content area */}
      <div className="flex flex-col flex-1 bg-[#D9E1E9]">
        {/* Navigation bar at the top */}
        <NavigationBar setActiveComponent={setActiveComponent} />

        {/* The main content area */}
        <div className='h-full'>
          {displayedContent}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;


