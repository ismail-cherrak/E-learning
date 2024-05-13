import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DevoirCard = ({ devoir, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      onFileUpload(devoir._id, selectedFile); // Pass both devoirId and file to the function
      setSelectedFile(null); // Clear the selected file after submission
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{devoir.title}</h2>
      <p className="text-gray-600 mb-2">{devoir.description}</p>
      <p className="text-gray-600 mb-2">Date de remise: {new Date(devoir.dateRemise).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">Ajouté par: {devoir.addedBy.nom} {devoir.addedBy.prenom}</p>
      <div className="flex items-center mb-4">
        <input
          type="file"
          accept='pdf'
          onChange={handleFileChange}
          className="hidden"
          id={`fileInput_${devoir._id}`}
        />
        <label htmlFor={`fileInput_${devoir._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4">
          {selectedFile ? selectedFile.name : 'Choose File'}
        </label>
        {selectedFile && (
          <button onClick={handleFileUpload} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const DevoirList = ({ devoirs, onFileUpload }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {devoirs.map((devoir) => (
        <DevoirCard key={devoir._id} devoir={devoir} onFileUpload={onFileUpload} />
      ))}
    </div>
  );
};

export const DevoirSt = () => {
  const { id, idmod } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [devoirs, setDevoirs] = useState([]);

  useEffect(() => {
    const fetchDevoirs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:4000/devoir/${idmod}/devoirs`);
        setDevoirs(response.data);
      } catch (error) {
        console.error('Error fetching devoirs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevoirs();
  }, [idmod]);

  const handleFileUpload = async (devoirId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('fff',file.name)

      const data = {
        formData,userId:id
      }

      const response = await axios.post(`http://localhost:4000/devoir/${devoirId}/submit`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('File submitted successfully.');
        // You can perform additional actions here if needed
      } else {
        console.error('Failed to submit file.');
        // Handle error
      }
    } catch (error) {
      console.error('Error submitting file:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">{isLoading ? 'Loading...' : 'Devoirs'}</h1>
      <DevoirList devoirs={devoirs} onFileUpload={handleFileUpload} />
    </div>
  );
};





// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const DevoirCard = ({ devoir, onFileUpload }) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleFileUpload = () => {
//     if (selectedFile) {
//       onFileUpload(devoir._id, selectedFile); // Pass both devoirId and file to the function
//       setSelectedFile(null); // Clear the selected file after submission
//     } else {
//       alert('Please select a file to upload.');
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-md p-4 mb-4">
//       <h2 className="text-xl font-semibold mb-2">{devoir.title}</h2>
//       <p className="text-gray-600 mb-2">{devoir.description}</p>
//       <p className="text-gray-600 mb-2">Date de remise: {new Date(devoir.dateRemise).toLocaleDateString()}</p>
//       <p className="text-gray-600 mb-4">Ajouté par: {devoir.addedBy.nom} {devoir.addedBy.prenom}</p>
//       <div className="flex items-center mb-4">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="hidden"
//           id={`fileInput_${devoir._id}`}
//         />
//         <label htmlFor={`fileInput_${devoir._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4">
//           {selectedFile ? selectedFile.name : 'Choose File'}
//         </label>
//         {selectedFile && (
//           <button onClick={handleFileUpload} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const DevoirList = ({ devoirs, onFileUpload }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {devoirs.map((devoir) => (
//         <DevoirCard key={devoir._id} devoir={devoir} onFileUpload={onFileUpload} />
//       ))}
//     </div>
//   );
// };

// export const DevoirSt = () => {
//   const { id, idmod } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [devoirs, setDevoirs] = useState([]);

//   useEffect(() => {
//     const fetchDevoirs = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`http://localhost:4000/devoir/${idmod}/devoirs`);
//         setDevoirs(response.data);
//       } catch (error) {
//         console.error('Error fetching devoirs:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDevoirs();
//   }, [idmod]);

//   const handleFileUpload = async (devoirId, file) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       console.log('fff',file.name)

//       const userId = id; // Assuming id is the user ID

//       const response = await axios.post(`http://localhost:4000/devoir/${devoirId}/submit`, formData, {
//         params: { userId }, // Send user ID as a query parameter
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 201) {
//         console.log('File submitted successfully.');
//         // You can perform additional actions here if needed
//       } else {
//         console.error('Failed to submit file.');
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error submitting file:', error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-3xl font-semibold mb-6">{isLoading ? 'Loading...' : 'Devoirs'}</h1>
//       <DevoirList devoirs={devoirs} onFileUpload={handleFileUpload} />
//     </div>
//   );
// };
