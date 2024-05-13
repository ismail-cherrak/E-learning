 import axios from 'axios';
import React, { useEffect,useState } from 'react'; 
 import { useParams } from 'react-router-dom'
 
export const ProfHome = () => { 
  // Dummy data for modules 
  const[modules,setModules] = useState([])
 
    const {id} = useParams()

  // Logout function 
  const handleLogout = () => { 
    // Perform logout operations, e.g., clearing authentication data 
    localStorage.clear(); // Clears all local storage data 
    window.location.href = '/'; // Redirect to login or home page after logout 
  }; 

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get(`http://localhost:4000/enseignant/${id}`)
       setModules(response.data)
      //  console.log(modules)
      }catch(err){
        console.error(err)
      }
    }

    fetchData()
  },[])


  const handleRedirect = async (idmod) =>{

    try{
      const response = await axios.get(`http://localhost:4000/enseignant/${id}/${idmod}`)

      if (response.data === 'chargeCours'){
        window.location.href=`/chargeCour/${id}/${idmod}`
      }
      else{
        window.location.href=`/chargeTd/${id}/${idmod}`
      }
    }catch(err){
      console.error(err)
    }

  }
 
  return ( 
    <div className="flex flex-col h-screen bg-gray-200"> 
      {/* Navbar */} 
      <div className="h-20 flex items-center justify-between px-4 bg-blue-500"> {/* Adjusted navbar color */} 
        {/* Title */} 
        <div className="flex items-center"> 
          <div className="bg-gray-500 rounded-lg p-2 flex items-center justify-center mr-2"> 
            <p className="text-white text-lg">Modules</p> 
          </div> 
        </div> 
        {/* Right element - Déconnexion button */} 
        <div className="flex items-center"> 
          <button 
            className="bg-gray-500 text-white px-3 py-2 rounded-lg focus:outline-none" // Corrected class name 
            onClick={handleLogout} // Logout when clicked 
          > 
            Déconnexion 
          </button> 
        </div> 
      </div> 
      {/* Main content */} 
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer "> 
        {modules.map((module, index) => ( 
          <div 
            key={index} 
            className="flex flex-col items-center bg-white rounded-lg p-2 " 
            onClick={()=>handleRedirect(module._id)}
          > 
            <img 
              src={module.iconUrl} 
              alt={module.nom} 
              className="w-16 h-16 mb-2" 
            /> 
            <p className="text-center text-lg font-semibold">{module.nom}</p> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
}; 
 
 export default ProfHome;

