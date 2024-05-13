import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResourceCard = ({ resource }) => {
  const handleDownload = (fileName) => {
    // Initiates a GET request to download the file
    window.location.href = `http://localhost:4000/download/${fileName}`;
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
      <p className="text-gray-600 mb-4">{resource.description}</p>
      {resource.type === 'file' && (
        <div className="flex items-center">
          <span className="text-gray-700">File</span>
          <button
            onClick={() => handleDownload(resource.file)}
            className="ml-2 text-blue-600 hover:underline"
          >
            Download
          </button>
        </div>
      )}
      {resource.type === 'url' && (
        <div className="flex items-center">
          <span className="text-gray-700">URL</span>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:underline"
          >
            Visit Link
          </a>
        </div>
      )}
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

export const RessourcePr = () => {
  const { idmod } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    
    if (type === 'url') {
      formData.append('fileOrUrl', url); // Use url instead of fileOrUrl for type 'url'
    } else {
      formData.append('fileOrUrl', file); // Use file for type 'file'
    }
  
    try {
      // Send POST request to add resource
      await axios.post(`http://localhost:4000/resource/${idmod}/add`, formData);
      console.log('Resource added successfully');
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setType('');
      setUrl('');
      setFile(null);
      // Fetch updated resources
      fetchResources();
      // Refresh page
      window.location.reload();
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };
  

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

  useEffect(() => {
    fetchResources();
  }, [idmod]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">{isLoading ? 'Loading...' : resources.moduleName}</h1>
      {isLoading ? (
        <p>Loading resources...</p>
      ) : (
        <>
          <button onClick={() => setShowAddForm(!showAddForm)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {showAddForm ? 'Cancel' : 'Add Resource'}
          </button>
          {showAddForm && (
            <div className="bg-white shadow-md rounded-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Add Resource</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              </div>
              <div className="mb-4">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                >
                  <option value="">Select Type</option>
                  <option value="url">URL</option>
                  <option value="file">File</option>
                </select>
              </div>
              {type === 'url' ? (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    {file ? file.name : 'Choose File'}
                  </label>
                </div>
              )}
              <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Submit
              </button>
            </div>
          )}
          <ResourceList resources={resources.ressources} />
        </>
      )}
    </div>
  );
};
