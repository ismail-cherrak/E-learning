import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResourceCard = ({ resource, onDelete }) => {
  const handleDelete = () => {
    onDelete(resource._id);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
      <p className="text-gray-600 mb-4">{resource.description}</p>
      <p className="text-gray-500 mb-2">Resource ID: {resource._id}</p>
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
      <button onClick={handleDelete} className="mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded-md">
        Delete Resource
      </button>
    </div>
  );
};

const ResourceList = ({ resources, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {resources.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} onDelete={onDelete} />
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
  const [url, setUrl] = useState('');

  const handleSubmit = async () => {
    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', 'url');
    formData.append('fileOrUrl', url);
  
    try {
      // Send POST request to add resource
      await axios.post(`http://localhost:4000/resource/${idmod}/add`, formData);
      console.log('Resource added successfully');
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setUrl('');
      // Fetch updated resources
      fetchResources();
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

  const handleDeleteResource = async (resourceId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4000/resource/${resourceId}`);
          fetchResources();
        } catch (error) {
          console.error('Error deleting resource:', error);
        }
      }
    });
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
                <input
                  type="text"
                  placeholder="URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              </div>
              <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Submit
              </button>
            </div>
          )}
          <ResourceList resources={resources.ressources} onDelete={handleDeleteResource} />
        </>
      )}
    </div>
  );
};
