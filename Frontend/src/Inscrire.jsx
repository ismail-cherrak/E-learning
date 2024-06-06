// import { useState, useRef } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import axios from 'axios';

// // Exporting as a named export
// export const Inscrire = () => {
//   const [file1, setFile1] = useState(null);
//   const [file2, setFile2] = useState(null);

//   const MySwal = withReactContent(Swal);

//   const fileInputRef1 = useRef(null);
//   const fileInputRef2 = useRef(null);

//   const handleFileUpload1 = () => {
//     fileInputRef1.current?.click(); 
//   };

//   const handleFileUpload2 = () => {
//     fileInputRef2.current?.click(); 
//   };

//   const handleFileChange1 = (event) => {
//     const file = event.target.files[0];
//     setFile1(file);
//   };

//   const handleFileChange2 = (event) => {
//     const file = event.target.files[0];
//     setFile2(file);
//   };

//   const handleSubmitFile1 = async () => {
//     if (file1) {
//       const formData = new FormData();
//       formData.append('file', file1);

//       try {
//         const response = await axios.post(
//           'http://localhost:4000/etudiant/uploadcsv',
//           formData
//         );
//         console.log('File uploaded successfully:', response.data);
//         window.location.reload()
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       }
//     }
//   };

//   const handleSubmitFile2 = async () => {
//     if (file2) {
//       const formData = new FormData();
//       formData.append('file', file2);

//       try {
//         const response = await axios.post(
//           'http://localhost:4000/etudiant/uploadcsv',
//           formData
//         );
//         console.log('File uploaded successfully:', response.data);
//         window.location.reload()
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       }
//     }
//   };

//   const handleDeleteStudents = () => {
//     MySwal.fire({
//       title: 'Êtes-vous sûr?',
//       text: 'Voulez-vous vraiment supprimer les étudiants?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Oui, supprimer!',
//       cancelButtonText: 'Annuler',
//       confirmButtonColor: '#e74c3c',
//       cancelButtonColor: '#bdc3c7',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete('http://localhost:4000/etudiant/');
//           console.log('Students deleted.');
//           window.location.reload()
//         } catch (error) {
//           console.error('Error deleting students:', error);
//         }
//       } else {
//         console.log('Deletion canceled.');
//       }
//     });
//   };

//   return (
//     <div className="flex flex-row items-center justify-between h-screen p-10">
//       <div
//         className="w-[30%] h-64 mb-10 border-white mr-3 bg-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
//         onClick={handleFileUpload1}
//       >
//         <p className="text-white font-bold text-4xl">Inscrire en lot</p>
//       </div>

//       {file1 && (
//         <div className="flex flex-col items-center mt-6">
//           <p className="text-[#2E85B5] font-semibold">File: {file1.name}</p>
//           <button
//             className="bg-[#2E85B5] text-white rounded-lg p-3 mt-2 hover:bg-blue-800 transition-colors"
//             onClick={handleSubmitFile1}
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {/* Green Rectangle for File Upload */}
//       <div
//         className="w-[30%] h-64 mb-10  mr-3 px-6 border-white bg-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
//         onClick={handleFileUpload2}
//       >
//         <p className="text-white font-extrabold text-4xl">Créer une cohorte</p>
//       </div>

//       {file2 && (
//         <div className="flex flex-col items-center mt-6">
//           <p className="text-blue font-semibold">File: {file2.name}</p>
//           <button
//             className="bg-blue text-white rounded-lg p-3 mt-2 hover:bg-blue-600 transition-colors"
//             onClick={handleSubmitFile2}
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {/* Red Button for Deleting Students */}
//       <button
//         className="w-[30%] h-12 bg-blue-600 text-white font-bold text-2xl rounded-lg mt-10 transition-transform transform hover:scale-105"
//         onClick={handleDeleteStudents}
//       >
//         supprimer les etudiants
//       </button>

//       {/* Hidden File Inputs */}
//       <input
//         ref={fileInputRef1}
//         type="file"
//         style={{ display: 'none' }}
//         accept=".csv"
//         onChange={handleFileChange1}
//       />
//       <input
//         ref={fileInputRef2}
//         type="file"
//         style={{ display: 'none' }}
//         accept=".csv"
//         onChange={handleFileChange2}
//       />
//     </div>
//   );
// };


import { useState, useRef } from 'react';
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
    fileInputRef1.current?.click(); 
  };

  const handleFileUpload2 = () => {
    fileInputRef2.current?.click(); 
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
    <div className="flex flex-col items-center h-screen p-10 space-y-10">
      <div className="flex flex-row items-center  w-full space-x-4">
        <div
          className="w-1/3 h-64 border-white bg-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105  ml-10 mr-10"
          onClick={handleFileUpload1}
        >
          <p className="text-white font-bold text-4xl">Inscrire en lot</p>
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

        <div
          className="w-1/3 h-64 border-white bg-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
          onClick={handleFileUpload2}
        >
          <p className="text-white font-extrabold text-4xl">Créer une cohorte</p>
        </div>

        {file2 && (
          <div className="flex flex-col items-center mt-6">
            <p className="text-blue font-semibold">File: {file2.name}</p>
            <button
              className="bg-blue text-white rounded-lg p-3 mt-2 hover:bg-blue-600 transition-colors"
              onClick={handleSubmitFile2}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center w-full">
        <button
          className="w-1/2 h-40 ml-20  bg-blue-600 text-white font-bold text-2xl rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center"
          onClick={handleDeleteStudents}
        >
          supprimer les etudiants
        </button>
      </div>

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
