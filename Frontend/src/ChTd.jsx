import React, { useState } from 'react';
import  {ProgrammeSt}  from './ProgrammeSt';
import { RessourcePr } from './RessourcePr';
import { DevoirPr } from './DevoirPr';
import { QuizzPr } from './QuizzPr';
import {  EspaceCollabPr } from './EspaceCollabPr';
import './style.css';

// const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => {
//   return (
//     <div className="bg-[#2E85B5] text-white w-1/6 flex flex-col justify-between">
//       <h1 className="text-lg font-bold ml-4 mt-4">E-learning</h1> {/* Added E-learning */}
//       <div className="flex flex-col mt-3 space-y-4">
//         {['programme', 'ressource', 'devoir', 'quizz', 'espace-collaboratif'].map((section) => (
//           <button
//             key={section}
//             onClick={() => setActiveSection(section)}
//             className={`px-3 py-2 rounded text-left ${
//               activeSection === section ? 'bg-white text-[#2E85B5]' : 'hover:bg-white hover:text-[#2E85B5]'
//             }`}
//           >
//             {section.charAt(0).toUpperCase() + section.slice(1)} {/* Capitalize first letter */}
//           </button>
//         ))}
//       </div>
//       <button onClick={handleLogout} className="px-3 py-2 rounded hover:bg-white hover:text-[#2E85B5]">
//         Logout
//       </button>
//     </div>
//   );
// };

const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => {
  return (
    //bg-[#2E85B5]
    //bg-grey text-white w-1/6 flex flex-col justify-between sticky top-0 bottom-0 left-0 
    //bg-wghite text-white w-52 h-screen flex flex-col justify-between pt-5 fixed top-0 left-0 
    //fixed top-0 left-0 h-full w-50 bg-white text-white flex flex-col justify-between pt-5 z-10
    <div className="sidebar ">
      {/* <h1 className="text-xl text-black font-bold ml-4 mt-4">E-learning</h1> Added E-learning */}
      <h1 className="text-2xl text-black font-bold ml-3  flex items-center">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="h-6 w-6 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
  |
  E-learning
</h1>
      <div className="flex flex-col text-black font-medium space-y-4 ml-1">
        {['programme', 'menu',  'ressource', 'devoir', 'quizz', 'espace-collaboratif'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-3 py-2 rounded text-left flex items-center ${
              activeSection === section ? 'bg-blue-100 text-[#2E85B5]' : 'hover:bg-white hover:text-[#2E85B5]'
            }`}
          >

{section === 'programme' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#4169E1"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      )}
      {section === 'ressource' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#4169E1"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
      )}
      {section === 'quizz' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#4169E1"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      )}
      {section === 'devoir' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#4169E1"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      )}
             {section === 'espace-collaboratif' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#4169E1"
                //#2E85B5
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            )}
            {section.charAt(0).toUpperCase() + section.slice(1)} {/* Capitalize first letter */}
          </button>
        ))}
      </div>
      <div className='container mx-auto flex justify-center items-center'>
      <button onClick={handleLogout} className=" mr-2 px-3 py-2 flex items-center text-red-600 rounded hover:bg-white ">
      Logout 
      <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>

      </button>
      </div>
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

  // return (
  //   <div className="flex h-screen">
  //     {/* Sidebar */}
  //     <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />

  //     {/* Main Content */}
  //     <div className="flex-1 p-4 bg-gray-200">
  //       {activeSection === 'programme' && <ProgrammeSt />}
  //       {activeSection === 'ressource' && <RessourcePr />}
  //       {activeSection === 'devoir' && <DevoirPr />}
  //       {activeSection === 'quizz' && <QuizzPr />}
  //       {activeSection === 'espace-collaboratif' && <EspaceCollabPr />}
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />

      {/* Main Content */}
      {/* flex-1 p-4 bg-gray-200 
      // flex-1 p-4 bg-gray-200 ml-50 overflow-auto*/}
      <div className="main-content">
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
