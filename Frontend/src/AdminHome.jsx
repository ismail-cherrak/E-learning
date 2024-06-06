import React, { useState } from 'react';
import { Inscrire } from './Inscrire';
import Permissions from './Permissions';
import NavBar from './navbar';


// Sidebar component

// // Navigation bar component
// const NavigationBar = ({ setActiveComponent }) => {

//   const handleLogout = () => { 
//     // Perform logout operations, e.g., clearing authentication data 
//     localStorage.clear(); // Clears all local storage data 
//     window.location.href = '/'; // Redirect to login or home page after logout 
//   }; 

//   return (
//     <div className="flex justify-between bg-[#2E85B5] text-white p-4">
//       <div>
//         <button
//           className="mr-4 hover:bg-[#D9E1E9]  rounded p-3"
//           onClick={() => setActiveComponent('Inscrire')}
//         >
//           Inscrire
//         </button>
//         <button
//           className="hover:bg-[#D9E1E9] p-3 rounded hover:text-[#2E85B5]"
//           onClick={() => setActiveComponent('Permissions')}
//         >
//           Permissions
//         </button>
//       </div>
//       <button className="hover:bg-[#D9E1E9] p-3 rounded hover:text-[#2E85B5]" onClick={handleLogout}>
//         Deconnexion
//       </button>
//     </div>
//   );
 

// // Main content component
// export const AdminHome = () => {
//   const [activeComponent, setActiveComponent] = useState('Inscrire');

// const handleLogout = () => { 
//     // Perform logout operations, e.g., clearing authentication data 
//     localStorage.clear(); // Clears all local storage data 
//     window.location.href = '/'; // Redirect to login or home page after logout 
//   }; 

//   let displayedContent;
//   if (activeComponent === 'Inscrire') {
//     displayedContent = <Inscrire />;
//   } else if (activeComponent === 'Permissions') {
//     displayedContent = <Permissions />
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar on the left side */}

//       {/* Main content area */}
//       <div className="flex flex-col flex-1 bg-[#D9E1E9]">
//         {/* Navigation bar at the top */}
//         <NavigationBar setActiveComponent={setActiveComponent} />

//         {/* The main content area */}
//         <div className='h-full'>
//           {displayedContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;


// Sidebar component
const Sidebarr = ({ setActiveComponent }) => {
  const handleLogout = () => {
    // Perform logout operations, e.g., clearing authentication data
    localStorage.clear(); // Clears all local storage data
    window.location.href = '/'; // Redirect to login or home page after logout
  };

  return (
    <div className=" h-full bg-white text-gray-800 w-1/6">
      <h1 className="text-3xl text-black font-bold ml-2  mb-10 flex items-center">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="h-6 w-6 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
  |
  E-learning
</h1>
      <div className=" flex flex-col mt-6 ">
        <button
          className="hover:bg-gray-200 rounded  mb-4 p-4 mt-6 hover:text-[#2E85B5] "
          onClick={() => setActiveComponent('Inscrire')}
        >
          <div className='flex hover:text-[#2E85B5]' >
            <div className='mr-2 font-semibold ]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4169E1" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
</svg>
</div>
          Inscrire
         
          </div>
        </button>
        <div className='flex flex-col'>
        <button
          className="hover:bg-gray-200 rounded  mb-4 p-4 hover:text-[#2E85B5]"
          onClick={() => setActiveComponent('Permissions')}
        >
          <div className='flex hover:text-[#2E85B5] '>
            <div className='mr-2 font-semibold hover:bg-[#2E85B5]' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4169E1" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</div>
Permissions
          </div>
        </button>
      </div>
      </div>
      <div className='container mx-auto flex justify-center items-center mb-auto'>
      <button className="mr-2 px-3 py-2 flex items-center text-red-600 rounded hover:bg-white absolute bottom-0 " onClick={handleLogout}>
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

// Main content component
export const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState('Inscrire');

  let displayedContent;
  if (activeComponent === 'Inscrire') {
    displayedContent = <Inscrire />;
  } else if (activeComponent === 'Permissions') {
    displayedContent = <Permissions />;
  }

  return (
    <div>
    <NavBar/>
    <div className="flex h-screen">
      {/* Sidebar on the left side */}
      <Sidebarr setActiveComponent={setActiveComponent} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 bg-gray-200 ">
        {/* The main content area // bg-[#D9E1E9] */}
        <div className="h-full">{displayedContent}</div>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;


