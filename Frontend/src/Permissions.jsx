import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Form for adding a module to a professor
const Form1 = ({ onSubmit }) => {
  const [profId, setProfId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [charge, setCharge] = useState('cours'); // Default charge (course)

  const handleSubmit = (e) => {
    e.preventDefault();
    const estChargeCour = charge === 'cours'; // True if 'cours', false otherwise
    onSubmit({ profId, moduleId, estChargeCour });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-4/5 mx-auto">
      <input
        type="text"
        placeholder="ID Professeur"
        value={profId}
        onChange={(e) => setProfId(e.target.value)}
        className="border p-2 rounded-md text-lg"
      />
      <input
        type="text"
        placeholder="ID Module"
        value={moduleId}
        onChange={(e) => setModuleId(e.target.value)}
        className="border p-2 rounded-md text-lg"
      />
      <div className="flex flex-col space-y-3">
        <label>
          <input
            type="radio"
            checked={charge === 'cours'}
            onChange={() => setCharge('cours')}
          />{' '}
          Charge de cours
        </label>
        <label>
          <input
            type='radio'
            checked={charge === 'td'}
            onChange={() => setCharge('td')}
          />{' '}
          Charge de TD
        </label>
      </div>
      <button className="bg-[#2E85B5] text-white p-3 rounded-md">Confirmer</button>
    </form>
  );
};

// Form for changing permissions for a professor
const Form2 = ({ onSubmit }) => {
  const [profId, setProfId] = useState('');
  const [moduleId, setModuleId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ profId, moduleId });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-4/5 mx-auto">
      <input
        type="text"
        placeholder="ID Professeur"
        value={profId}
        onChange={(e) => setProfId(e.target.value)}
        className="border p-2 rounded-md text-lg"
      />
      <input
        type="text"
        placeholder="ID Module"
        value={moduleId}
        onChange={(e) => setModuleId(e.target.value)}
        className="border p-2 rounded-md text-lg"
      />
      <button className="bg-[#2E85B5] text-white p-3 rounded-md">Confirmer</button>
    </form>
  );
};

// Form for deleting a professor
const Form3 = ({ onSubmit }) => {
  const [profId, setProfId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: profId }); // Backend expects `id`
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-4/5 mx-auto">
      <input
        type="text"
        placeholder="ID Professeur"
        value={profId}
        onChange={(e) => setProfId(e.target.value)}
        className="border p-2 rounded-md text-lg"
      />
      <button className="bg-[#2E85B5] text-white p-3 rounded-md">Supprimer</button>
    </form>
  );
};

// Main Permissions Component
const Permissions = () => {
  const [profs, setProfs] = useState([]);
  const [modules, setModules] = useState([]);
  const [activeForm, setActiveForm] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enseignantResponse, moduleResponse] = await Promise.all([
          axios.get('http://localhost:4000/enseignant'),
          axios.get('http://localhost:4000/module'),
        ]);

        setProfs(enseignantResponse.data || []); // Ensure data is set
        setModules(moduleResponse.data || []); // Default to empty array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []); // Empty dependency array to avoid re-rendering loop

  const renderForm = () => {
    switch (activeForm) {
      case 1:
        return <Form1 onSubmit={handleForm1Submit} />;
      case 2:
        return <Form2 onSubmit={handleForm2Submit} />;
      case 3:
        return <Form3 onSubmit={handleForm3Submit} />;
      default:
        return null;
    }
  };

  const handleForm1Submit = async ({ profId, moduleId, estChargeCour }) => {
    try {
      await axios.post(
        'http://localhost:4000/enseignant/affecterModuleProf',
        { enseignantId: profId, moduleId, estChargeCour }
      );
      console.log('Module affecté au professeur');
      window.location.reload()
    } catch (error) {
      console.error('Error affecting module:', error);
    }
  };

  const handleForm2Submit = async ({ profId, moduleId }) => {
    try {
      await axios.post(
        'http://localhost:4000/enseignant/toggleEstChargeCour',
        { enseignantId: profId, moduleId }
      );
      console.log('Permission toggled');
      window.location.reload()
    } catch (error) {
      console.error('Error toggling permission:', error);
    }
  };

  const handleForm3Submit = async ({ id }) => {
    try {
      await axios.delete(
        'http://localhost:4000/enseignant/',
        { data: { id } } // ID to delete the professor
      );
      window.location.reload()
      console.log('Professeur supprimé');
    } catch (error) {
      console.error('Error deleting professor:', error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left part with tables and titles */}
      <div className="w-3/5 bg-gray-200 rounded-l-md shadow-sm p-4 flex flex-col overflow-hidden">
        <h2 className="text-[#2E85B5] text-xl mb-4">Profs</h2>

        <div
          className="overflow-y-auto bg-gray-100 rounded-lg"
          style={{ height: '400px' }}
        >
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Nom</th>
                <th className="text-left">Prenom</th>
              </tr>
            </thead>
            <tbody>
              {profs.map((prof) => (
                <tr key={prof._id}>
                  <td style={{ width: '300px' }}>{prof._id}</td>
                  <td>{prof.nom || 'N/A'}</td>
                  <td>{prof.prenom || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-[#2E85B5] text-xl mt-4 mb-4">Modules</h2>

        <div
          className="overflow-y-auto bg-gray-100 rounded-lg"
          style={{ height: '400px' }}
        >
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Nom du module</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module._id}>
                  <td style={{ width: '300px' }}>{module._id}</td>
                  <td>{module.nom || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right part with forms */}
      <div className="bg-[#F3F7FF] rounded-r-md shadow-sm w-2/5 p-4">
        {/* Button Group with Border */}
        <div className="flex items-center justify-between w-full border-2 border-[#2E85B5] rounded shadow-sm">
          <button
            onClick={()=> setActiveForm(1)}
            className={`px-4 py-2 rounded-md hover:text-[#164866] hover:font-bold ${
              activeForm === 1 ? 'text-[#164866] font-bold' : 'text-[#2E85B5]'
            }`}
          >
            Ajouter module au professeur
          </button>
          <span className="mx-2 text-[#2E85B5]">|</span>
          <button
            onClick={() => setActiveForm(2)}
            className={`px-4 py-2 rounded-md hover:text-[#164866] hover:font-bold ${
              activeForm === 2 ? 'text-[#164866] font-bold' : 'text-[#2E85B5]'
            }`}
          >
            Changer permission du professeur
          </button>
          <span className="mx-2 text-[#2E85B5]">|</span>
          <button
            onClick={()=> setActiveForm(3)}
            className={`px-4 py-2 rounded-md hover:text-[#164866] hover:font-bold ${
              activeForm === 3 ? 'text-[#164866] font-bold' : 'text-[#2E85B5]'
            }`}
          >
            Supprimer un professeur
          </button>
        </div>

        {/* Render the selected form */}
        <div className="mt-4 p-4">{renderForm()}</div>
      </div>
    </div>
  );
};

export default Permissions;
