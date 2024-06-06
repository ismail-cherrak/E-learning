// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const ResourceCard = ({ resource }) => {
//   const handleDownload = (fileName) => {
//     // Initiates a GET request to download the file
//     window.location.href = `http://localhost:4000/download/${fileName}`;
//   };

//   return (
//     <div className="bg-white shadow-md rounded-md p-4 mb-4">
//       <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
//       <p className="text-gray-600 mb-4">{resource.description}</p>
//       <div className="flex items-center">
//         <span className="text-gray-700">{resource.type}</span>
//         {resource.type === 'file' && (
//           <button
//             onClick={() => handleDownload(resource.file)}
//             className="ml-2 text-blue-600 hover:underline"
//           >
//             Download
//           </button>
//         )}
//         {resource.type === 'video' && (
//           <a
//             href={resource.videoUrl}
//             className="ml-2 text-blue-600 hover:underline"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Watch Video
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// const ResourceList = ({ resources }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {resources.map((resource) => (
//         <ResourceCard key={resource._id} resource={resource} />
//       ))}
//     </div>
//   );
// };

// export const RessourceSt = () => {
//   const { idmod } = useParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/module/${idmod}/resources`);
//         const data = await response.json();
//         setResources(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching resources:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchResources();
//   }, [idmod]);

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-3xl font-semibold mb-6">{isLoading ? 'Loading...' : resources.moduleName}</h1>
//       {isLoading ? (
//         <p>Loading resources...</p>
//       ) : (
//         <ResourceList resources={resources.ressources} />
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResourceCard = ({ resource }) => {
  const handleDownload = (fileName) => {
    // Initiates a GET request to download the file
    window.location.href = `http://localhost:4000/download/${fileName}`;
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
      <p className="text-gray-600 mb-4">{resource.description}</p>
      <div className="flex items-center">
        <span className="text-gray-700">{resource.type}</span>
        {resource.type === 'file' && (
          <button
            onClick={() => handleDownload(resource.file)}
            className="ml-2 text-blue-600 hover:underline"
          >
            Download
          </button>
        )}
        {resource.type === 'video' && (
          <a
            href={resource.videoUrl}
            className="ml-2 text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Video
          </a>
        )}
        {resource.type === 'url' && (
          <a
            href={resource.url}
            className="ml-2 text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Link
          </a>
        )}
      </div>
    </div>
  );
};

const ResourceList = ({ resources }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {resources.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} />
      ))}
    </div>
  );
};

export const RessourceSt = () => {
  const { idmod } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`http://localhost:4000/module/${idmod}/resources`);
        const data = await response.json();
        setResources(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [idmod]);

  return (
    <div className="container mx-auto px-4 ml-7 mt-5">
      <h1 className="text-3xl font-semibold mb-6">{isLoading ? 'Loading...' : resources.moduleName}</h1>
      {isLoading ? (
        <p>Loading resources...</p>
      ) : (
        <ResourceList resources={resources.ressources} />
      )}
    </div>
  );
};
