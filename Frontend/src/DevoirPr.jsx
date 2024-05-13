import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DevoirPr = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [devoirs, setDevoirs] = useState([]);
  const [showForm, setShowForm] = useState(false); // Define showForm state variable

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateRemise: '',
    addedBy: '',
    module: '',
  });

  useEffect(() => {
    const fetchDevoirs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:4000/devoirs');
        setDevoirs(response.data);
      } catch (error) {
        console.error('Error fetching devoirs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevoirs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:4000/devoir/add', formData);
      setDevoirs([...devoirs, response.data]);
      setFormData({
        title: '',
        description: '',
        dateRemise: '',
        addedBy: '',
        module: '',
      });
    } catch (error) {
      console.error('Error adding devoir:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">Devoirs</h1>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setShowForm(true)}>
        Add Devoir
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Add Devoir</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Add other input fields for description, dateRemise, addedBy, and module */}
          <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      )}
      {/* Display existing devoirs */}
      {/* Modify as per your requirement */}
      {isLoading ? (
        <p>Loading devoirs...</p>
      ) : (
        <div>
          {devoirs.map((devoir) => (
            <div key={devoir._id}>
              <h2>{devoir.title}</h2>
              <p>{devoir.description}</p>
              {/* Display other devoir attributes */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
