import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

// Exporting as a named export
export const Inscrire = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const MySwal = withReactContent(Swal);

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleFileUpload1 = () => {
    fileInputRef1.current?.click(); // Open the file explorer
  };

  const handleFileUpload2 = () => {
    fileInputRef2.current?.click(); // Open the file explorer
  };

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const handleSubmitFile1 = async () => {
    if (file1) {
      const formData = new FormData();
      formData.append('file', file1);

      try {
        const response = await axios.post(
          'http://localhost:4000/etudiant/uploadcsv',
          formData
        );
        console.log('File uploaded successfully:', response.data);
        window.location.reload()
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmitFile2 = async () => {
    if (file2) {
      const formData = new FormData();
      formData.append('file', file2);

      try {
        const response = await axios.post(
          'http://localhost:4000/etudiant/uploadcsv',
          formData
        );
        console.log('File uploaded successfully:', response.data);
        window.location.reload()
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDeleteStudents = () => {
    MySwal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer les étudiants?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#bdc3c7',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:4000/etudiant/');
          console.log('Students deleted.');
          window.location.reload()
        } catch (error) {
          console.error('Error deleting students:', error);
        }
      } else {
        console.log('Deletion canceled.');
      }
    });
  };

  return (
    <div className="flex flex-col items-center space-y-10 mt-10 p-10">
      {/* Blue Rectangle for File Upload */}
      <div
        className="w-[60%] h-64 mb-10 bg-gradient-to-r from-blue-400 to-blue-600 border-dashed border-4 border-blue-700 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleFileUpload1}
      >
        <p className="text-white font-extrabold text-4xl">Inscrire en lot</p>
      </div>

      {file1 && (
        <div className="flex flex-col items-center mt-6">
          <p className="text-[#2E85B5] font-semibold">File: {file1.name}</p>
          <button
            className="bg-[#2E85B5] text-white rounded-lg p-3 mt-2 hover:bg-blue-800 transition-colors"
            onClick={handleSubmitFile1}
          >
            Submit
          </button>
        </div>
      )}

      {/* Green Rectangle for File Upload */}
      <div
        className="w-[60%] h-64 mx-5 bg-gradient-to-r from-green-400 to-green-600 border-dashed border-4 border-green-700 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={handleFileUpload2}
      >
        <p className="text-white font-extrabold text-4xl">Créer une cohorte</p>
      </div>

      {file2 && (
        <div className="flex flex-col items-center mt-6">
          <p className="text-[#39B52E] font-semibold">File: {file2.name}</p>
          <button
            class="bg-[#39B52E] text-white rounded-lg p-3 mt-2 hover:bg-green-800 transition-colors"
            onClick={handleSubmitFile2}
          >
            Submit
          </button>
        </div>
      )}

      {/* Red Button for Deleting Students */}
      <button
        className="w-[60%] h-12 bg-red-600 text-white font-bold text-2xl rounded-lg mt-10 transition-transform transform hover:scale-105"
        onClick={handleDeleteStudents}
      >
        Supprimer les étudiants
      </button>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef1}
        type="file"
        style={{ display: 'none' }}
        accept=".csv"
        onChange={handleFileChange1}
      />
      <input
        ref={fileInputRef2}
        type="file"
        style={{ display: 'none' }}
        accept=".csv"
        onChange={handleFileChange2}
      />
    </div>
  );
};

