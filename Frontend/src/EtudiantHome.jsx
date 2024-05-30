import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';

export const EtudiantHome = () => {
  const [modules, setModules] = useState([]); // Initialize as an empty array
  const { idAuth,id } = useParams(); // Get the Etudiant ID from the URL

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = '/'; // Redirects to the home or login page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/etudiant/${id}/modules`);

        // Ensure data is an array; use empty array as fallback
        const moduleData = Array.isArray(response.data.modules) ? response.data.modules : [];
        setModules(moduleData);
      } catch (err) {
        console.error(err);
        setModules([]); // Fallback to an empty array in case of error
      }
    };

    fetchData();
  }, [id]); // Ensures the data fetch happens when `id` changes

  const handleRedirect = (idmod) => {
    // Redirects to the new route with Etudiant ID and Module ID
    window.location.href = `/EtudiantHome/${idAuth}/${id}/${idmod}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="h-20 flex items-center justify-between px-4 bg-blue-500"> 
        <div className="flex items-center"> 
          <div className="bg-gray-500 rounded-lg p-2 flex items-center justify-center mr-2"> 
            <p className="text-white text-lg">Modules</p> 
          </div> 
        </div> 
        <div className="flex items-center"> 
          <button className="bg-gray-500 text-white px-3 py-2 rounded-lg" onClick={handleLogout}>
            Déconnexion 
          </button> 
        </div> 
      </div>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
        {modules.length > 0 ? (
          modules.map((module, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300" 
              onClick={() => handleRedirect(module._id)} // Change redirect function
            >
              <img 
                src={module.iconUrl} 
                alt={module.name} // Use module.name instead of module.nom
                className="w-20 h-20 mb-2 rounded-full object-cover" 
              />
              <p className="text-center text-lg font-semibold">{module.name}</p> {/* Use module.name */}
            </div>
          ))
        ) : (
          <p>No modules found</p> // Message when no modules exist
        )}
      </div>
    </div>
  );
};

export default EtudiantHome;
