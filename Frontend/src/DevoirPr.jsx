import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const DevoirPr = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [devoirs, setDevoirs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedDevoirs, setExpandedDevoirs] = useState({}); // State to track which devoirs are expanded

  const { id, idmod } = useParams(); // id is addedBy, idmod is module

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateRemise: '',
    addedBy: id,
    module: idmod
  });

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
        addedBy: id,
        module: idmod
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding devoir:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDevoirDetails = (devoirId) => {
    setExpandedDevoirs((prevState) => ({
      ...prevState,
      [devoirId]: !prevState[devoirId],
    }));
  };

  const handleDelete = async (devoirId) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmation.isConfirmed) {
      try {
        setIsLoading(true);
        await axios.delete(`http://localhost:4000/devoir/${devoirId}`);
        setDevoirs(devoirs.filter(devoir => devoir._id !== devoirId));
        Swal.fire('Deleted!', 'Your devoir has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting devoir:', error);
        Swal.fire('Error!', 'Failed to delete devoir.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">Devoirs</h1>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Devoir'}
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
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateRemise" className="block text-gray-700 font-bold mb-2">
              Date Remise
            </label>
            <input
              type="date"
              id="dateRemise"
              name="dateRemise"
              value={formData.dateRemise}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      )}
      {isLoading ? (
        <p>Loading devoirs...</p>
      ) : (
        <div>
          {devoirs.map((devoir) => (
            <div key={devoir._id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{devoir.title}</h2>
                  <p className="text-gray-600">{devoir.description}</p>
                  <p className="text-gray-500">Date Remise: {new Date(devoir.dateRemise).toLocaleDateString()}</p>
                  <p className="text-gray-500">Added by: {devoir.addedBy?.nom} {devoir.addedBy?.prenom}</p>
                </div>
                <button
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => toggleDevoirDetails(devoir._id)}
                >
                  {expandedDevoirs[devoir._id] ? 'Hide Submissions' : 'Show Submissions'}
                </button>
                <button
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(devoir._id)}
                >
                  Delete
                </button>
              </div>
              {expandedDevoirs[devoir._id] && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Submitted By:</h3>
                  <table className="min                  -w-full bg-white">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Nom</th>
                        <th className="px-4 py-2">Prénom</th>
                        <th className="px-4 py-2">Date Soumission</th>
                        <th className="px-4 py-2">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devoir.submittedBy?.map((submission) => (
                        <tr key={submission.dateSoumission}>
                          <td className="border px-4 py-2">{submission.etudiant?.nom}</td>
                          <td className="border px-4 py-2">{submission.etudiant?.prenom}</td>
                          <td className="border px-4 py-2">{new Date(submission.dateSoumission).toLocaleString()}</td>
                          <td className="border px-4 py-2">
                            <a
                              href={`http://localhost:4000/download/${submission.submittedFile.split('/').pop()}`}
                              className="text-blue-600 hover:underline"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



