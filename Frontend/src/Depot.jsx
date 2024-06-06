


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// export const Depot = () => {
//   const { id, idmod } = useParams(); // Extract route parameters
//   const [sampleProgram, setSampleProgram] = useState(null); // State for program data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [newChapter, setNewChapter] = useState(''); // State for new chapter input
//   const [showForm, setShowForm] = useState(false); // State to toggle form visibility

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/module/${idmod}/program`);
//         setSampleProgram(response.data.program); // Update state with fetched data
//         console.log(response.data.program);
//       } catch (error) {
//         setError('Error fetching data'); // Set error message
//       } finally {
//         setLoading(false); // Mark loading as done
//       }
//     };

//     fetchData(); // Fetch data when the component is mounted
//   }, [idmod]); // Dependency array with idmod to re-run when it changes

//   const handleAddChapter = async () => {
//     try {
//       // Send POST request to add new chapter
//       await axios.post(`http://localhost:4000/chapter/${idmod}/addChapter`, { title: newChapter });
//       // Refresh the page after adding the chapter
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding chapter:', error);
//     }
//   };

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       // Send DELETE request to delete chapter
//       await axios.delete(`http://localhost:4000/chapter/${idmod}/${chapterId}`);
//       // Refresh the page after deleting the chapter
//       window.location.reload();
//     } catch (error) {
//       console.error('Error deleting chapter:', error);
//     }
//   };

//   const handleDeleteCard = async (cardId) => {
//     MySwal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "Voulez-vous vraiment supprimer cette carte?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Oui, supprimer!',
//       cancelButtonText: 'Annuler',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:4000/card/${cardId}/delete`);
//           window.location.reload();
//         } catch (error) {
//           console.error('Error deleting card:', error);
//         }
//       }
//     });
//   };

//   const handleAddCard = async (chapterId) => {
//     try {
//       await axios.post(`http://localhost:4000/card/${chapterId}/cards`);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding card:', error);
//     }
//   };
  
  

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <button
//         onClick={() => setShowForm(!showForm)} // Toggle form visibility
//         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4"
//       >
//         {showForm ? 'Cancel' : 'Add Chapter'}
//       </button>
//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//           <h2 className="text-xl font-semibold mb-4">Add New Chapter</h2>
//           <div className="mb-4">
//             <label htmlFor="chapterName" className="block text-gray-700 font-medium mb-2">Chapter Name</label>
//             <input
//               type="text"
//               id="chapterName"
//               placeholder="Enter chapter name"
//               value={newChapter}
//               onChange={(e) => setNewChapter(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={handleAddChapter}
//               className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
//             >
//               Add Chapter
//             </button>
//           </div>
//         </div>
//       )}
//       {sampleProgram ? (
//         sampleProgram.map((chapter) => (
//           <div key={chapter._id} className="mb-8">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-700 mb-2">{chapter.chapterName}</h2>
//                 <p className="text-gray-500 mb-6">Chapter ID: {chapter.chapterId}</p>
//               </div>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => handleDeleteChapter(chapter.chapterId)}
//                   className="bg-red-500 text-white font-semibold py-1 px-3 rounded text-sm"
//                 >
//                   Supprimer le chapitre
//                 </button>
//                 <button
//                   onClick={() => handleAddCard(chapter.chapterId)}
//                   className="bg-green-500 text-white font-semibold py-1 px-3 rounded text-sm"
//                 >
//                   Add Card
//                 </button>
//               </div>
//             </div>
//             {chapter.cards.length === 0 ? (
//               <p className="text-gray-500">No cards available.</p>
//             ) : (
//               <div className="space-y-6">
//                 {chapter.cards.map((card) => (
//                   <div
//                     key={card.cardId}
//                     className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full relative"
//                   >
//                     <button
//                       onClick={() => handleDeleteCard(card.cardId)}
//                       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 1a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm-4 2a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V3zm10-1a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V2zM5.879 18.121A1 1 0 0 1 4.464 19.536l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm10.657 0a1 1 0 0 1-1.415 1.414l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                     <h3 className="text-lg font-semibold text-gray-700">Card {card.cardId}</h3>
//                     {card.files.length === 0 ? (
//                       <p className="text-gray-500">No files in this card.</p>
//                     ) : (
//                       <div className="flex flex-row flex-wrap gap-6">
//                         {card.files.map((file) => (
//                           <div
//                             key={file.fileId}
//                             className="flex-1 bg-blue-100 text-blue-600 p-4 rounded hover:bg-blue-200"
//                           >
//                             {file.fileType === 'mooc' ? (
//                               <a
//                                 href={file.downloadLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="hover:underline"
//                               >
//                                 {file.title}
//                               </a>
//                             ) : (
//                               <a
//                                 href={`http://localhost:4000/download/${file.downloadLink.split('/').pop()}`} // Construct the download link
//                                 className="hover:underline"
//                               >
//                                 {file.fileType}: {file.downloadLink.split('/').pop()}
//                               </a>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No program data available.</div> // Handle no data case
//       )}
//     </div>
//   );
// };

// export default Depot;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// export const Depot = () => {
//   const { id, idmod } = useParams();
//   const [sampleProgram, setSampleProgram] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newChapter, setNewChapter] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/module/${idmod}/program`);
//         setSampleProgram(response.data.program);
//         console.log(response.data.program);
//       } catch (error) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [idmod]);

//   const handleAddChapter = async () => {
//     try {
//       await axios.post(`http://localhost:4000/chapter/${idmod}/addChapter`, { title: newChapter });
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding chapter:', error);
//     }
//   };

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       await axios.delete(`http://localhost:4000/chapter/${idmod}/${chapterId}`);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error deleting chapter:', error);
//     }
//   };

//   const handleDeleteCard = async (cardId) => {
//     MySwal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "Voulez-vous vraiment supprimer cette carte?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Oui, supprimer!',
//       cancelButtonText: 'Annuler',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:4000/card/${cardId}/delete`);
//           window.location.reload();
//         } catch (error) {
//           console.error('Error deleting card:', error);
//         }
//       }
//     });
//   };

//   const handleAddCard = async (chapterId) => {
//     try {
//       await axios.post(`http://localhost:4000/card/${chapterId}/cards`);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding card:', error);
//     }
//   };

//   const handleFillCard = (cardId) => {
//     MySwal.fire({
//       title: 'Add New Card',
//       html: `
//         <div>
//           <label for="cardType1">Type 1</label>
//           <select id="cardType1" class="swal2-input">
//             <option value="cours">Cours</option>
//             <option value="td">TD</option>
//             <option value="tp">TP</option>
//             <option value="mooc">MOOC</option>
//           </select>
//           <input type="file" id="cardFile1" class="swal2-input">
//           <input type="text" id="cardUrl1" class="swal2-input" placeholder="Enter URL" style="display: none;">
//         </div>
//         <div>
//           <label for="cardType2">Type 2</label>
//           <select id="cardType2" class="swal2-input">
//             <option value="cours">Cours</option>
//             <option value="td">TD</option>
//             <option value="tp">TP</option>
//             <option value="mooc">MOOC</option>
//           </select>
//           <input type="file" id="cardFile2" class="swal2-input">
//           <input type="text" id="cardUrl2" class="swal2-input" placeholder="Enter URL" style="display: none;">
//         </div>
//         <div>
//           <label for="cardType3">Type 3</label>
//           <select id="cardType3" class="swal2-input">
//             <option value="cours">Cours</option>
//             <option value="td">TD</option>
//             <option value="tp">TP</option>
//             <option value="mooc">MOOC</option>
//           </select>
//           <input type="file" id="cardFile3" class="swal2-input">
//           <input type="text" id="cardUrl3" class="swal2-input" placeholder="Enter URL" style="display: none;">
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Add',
//       preConfirm: () => {
//         const types = [];
//         const files = [];
//         const urls = [];

//         for (let i = 1; i <= 3; i++) {
//           types.push(document.getElementById(`cardType${i}`).value);
//           const fileInput = document.getElementById(`cardFile${i}`);
//           files.push(fileInput.files[0]);
//           const urlInput = document.getElementById(`cardUrl${i}`);
//           urls.push(urlInput.value);
//         }

//         return { types, files, urls };
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const { types, files, urls } = result.value;
//         const formData = new FormData();

//         types.forEach((type, index) => {
//           formData.append(`types`, type);
//           formData.append(`files`, files[index]);
//           formData.append(`urls`, urls[index]);
//         });

//         try {
//           await axios.post(`http://localhost:4000/card/${cardId}/files`, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           window.location.reload();
//         } catch (error) {
//           console.error('Error adding files to card:', error);
//         }
//       }
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4"
//       >
//         {showForm ? 'Cancel' : 'Add Chapter'}
//       </button>
//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//           <h2 className="text-xl font-semibold mb-4">Add New Chapter</h2>
//           <div className="mb-4">
//             <label htmlFor="chapterName" className="block text-gray-700 font-medium mb-2">Chapter Name</label>
//             <input
//               type="text"
//               id="chapterName"
//               placeholder="Enter chapter name"
//               value={newChapter}
//               onChange={(e) => setNewChapter(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={handleAddChapter}
//               className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
//             >
//               Add Chapter
//             </button>
//           </div>
//         </div>
//       )}
//       {sampleProgram ? (
//         sampleProgram.map((chapter) => (
//           <div key={chapter._id} className="mb-8">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-700 mb-2">{chapter.chapterName}</h2>
//                 <p className="text-gray-500 mb-6">Chapter ID: {chapter.chapterId}</p>
//               </div>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => handleDeleteChapter(chapter.chapterId)}
//                   className="bg-red-500 text-white font-semibold py-1 px-3 rounded text-sm"
//                 >
//                   Supprimer le chapitre
//                 </button>
//                 <button
//                   onClick={() => handleAddCard(chapter.chapterId)}
//                   className="bg-green-500 text-white font-semibold py-1 px-3 rounded text-sm"
//                 >
//                   Add Card
//                 </button>
//               </div>
//             </div>
//             {chapter.cards.length === 0 ? (
//               <p className="text-gray-500">No cards available.</p>
//             ) : (
//               <div className="space-y-6">
//                 {chapter.cards.map((card) => (
//                   <div
//                     key={card.cardId}
//                     className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full relative"
//                   >
//                     <button
//                       onClick={() => handleDeleteCard(card.cardId)}
//                       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 1a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm-4 2a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V3zm10-1a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V2zM5.879 18.121A1 1 0 0 1 4.464 19.536l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm10.657 0a1 1 0 0 1-1.415 1.414l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleFillCard(card.cardId)}
//                       className="bg-blue-500 text-white font-semibold py-1 px-3 rounded text-sm absolute top-2 left-2"
//                     >
//                       Fill Card
//                     </button>
//                     <h3 className="text-lg font-semibold text-gray-700">Card {card.cardId}</h3>
//                     {card.files.length === 0 ? (
//                       <p className="text-gray-500">No files in this card.</p>
//                     ) : (
//                       <div className="flex flex-row flex-wrap gap-6">
//                         {card.files.map((file) => (
//                           <div
//                             key={file.fileId}
//                             className="flex-1 bg-blue-100 text-blue-600 p-4 rounded hover:bg-blue-200"
//                           >
//                             {file.fileType === 'mooc' ? (
//                               <a
//                                 href={file.downloadLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="hover:underline"
//                               >
//                                 {file.title}
//                               </a>
//                             ) : (
//                               <a
//                                 href={`http://localhost:4000/download/${file.downloadLink.split('/').pop()}`}
//                                 className="hover:underline"
//                               >
//                                 {file.fileType}: {file.downloadLink.split('/').pop()}
//                               </a>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No program data available.</div>
//       )}
//     </div>
//   );
// };

// export default Depot;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// export const Depot = () => {
//   const { id, idmod } = useParams();
//   const [sampleProgram, setSampleProgram] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newChapter, setNewChapter] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/module/${idmod}/program`);
//         setSampleProgram(response.data.program);
//         console.log(response.data.program);
//       } catch (error) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [idmod]);

//   const handleAddChapter = async () => {
//     try {
//       await axios.post(`http://localhost:4000/chapter/${idmod}/addChapter`, { title: newChapter });
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding chapter:', error);
//     }
//   };

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       await axios.delete(`http://localhost:4000/chapter/${idmod}/${chapterId}`);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error deleting chapter:', error);
//     }
//   };

//   const handleDeleteCard = async (cardId) => {
//     MySwal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "Voulez-vous vraiment supprimer cette carte?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Oui, supprimer!',
//       cancelButtonText: 'Annuler',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:4000/card/${cardId}/delete`);
//           window.location.reload();
//         } catch (error) {
//           console.error('Error deleting card:', error);
//         }
//       }
//     });
//   };

//   const handleAddCard = async (chapterId) => {
//     try {
//       await axios.post(`http://localhost:4000/card/${chapterId}/cards`);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding card:', error);
//     }
//   };

//   const handleFillCard = (cardId) => {
//     MySwal.fire({
//       title: 'Add New Card',
//       html: `
//         <div>
//           <label for="cardFile">Upload File</label>
//           <input type="file" id="cardFile" class="swal2-input">
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Add',
//       preConfirm: () => {
//         const fileInput = document.getElementById('cardFile');
//         const file = fileInput.files[0];
//         return file;
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const file = result.value;
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//           await axios.post(`http://localhost:4000/card/${cardId}/files`, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           window.location.reload();
//         } catch (error) {
//           console.error('Error adding files to card:', error);
//         }
//       }
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4"
//       >
//         {showForm ? 'Cancel' : 'Add Chapter'}
//       </button>
//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-4">
//           <h2 className="text-xl font-semibold mb-4">Add New Chapter</h2>
//           <div className="mb-4">
//             <label htmlFor="chapterName" className="block text-gray-700 font-medium mb-2">Chapter Name</label>
//             <input
//               type="text"
//               id="chapterName"
//               placeholder="Enter chapter name"
//               value={newChapter}
//               onChange={(e) => setNewChapter(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={handleAddChapter}
//               className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
//             >
//               Add Chapter
//             </button>
//           </div>
//         </div>
//       )}
//       {sampleProgram ? (
//         sampleProgram.map((chapter) => (
//           <div key={chapter._id} className="mb-8">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-700 mb-2">{chapter.chapterName}</h2>
//                 <p className="text-gray-500 mb-6">Chapter ID: {chapter.chapterId}</p>
//               </div>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => handleDeleteChapter(chapter.chapterId)}
//                   className="bg-red-500 text-white font-semibold py-1 px-3 rounded text-sm"
//                 >
//                   Supprimer le chapitre
//                 </button>
//                 <button
//                   onClick={() => handleAddCard(chapter.chapterId)}
//                   className="bg-green-500 text-white font-semibold py-1 px-3 rounded text-sm"
//                 >
//                   Add Card
//                 </button>
//               </div>
//             </div>
//             {chapter.cards.length === 0 ? (
//               <p className="text-gray-500">No cards available.</p>
//             ) : (
//               <div className="space-y-6">
//                 {chapter.cards.map((card) => (
//                   <div
//                     key={card.cardId}
//                     className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full relative"
//                   >
//                     <button
//                       onClick={() => handleDeleteCard(card.cardId)}
//                       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 1a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm-4 2a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V3zm10-1a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V2zM5.879 18.121A1 1 0 0 1 4.464 19.536l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm10.657 0a1 1 0 0 1-1.415 1.414l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleFillCard(card.cardId)}
//                       className="bg-blue-500 text-white font-semibold py-1 px-3 rounded text-sm absolute top-2 left-2"
//                     >
//                       Fill Card
//                     </button>
//                     <h3 className="text-lg font-semibold text-gray-700">Card {card.cardId}</h3>
//                     {card.files.length === 0 ? (
//                       <p className="text-gray-500">No files in this card.</p>
//                     ) : (
//                       <div className="flex flex-row flex-wrap gap-6">
//                         {card.files.map((file) => (
//                           <div
//                             key={file.fileId}
//                             className="flex-1 bg-blue-100 text-blue-600 p-4 rounded hover:bg-blue-200"
//                           >
//                             {file.fileType === 'mooc' ? (
//                               <a
//                                 href={file.downloadLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="hover:underline"
//                               >
//                                 {file.title}
//                               </a>
//                             ) : (
//                               <a
//                                 href={`http://localhost:4000/download/${file.downloadLink.split('/').pop()}`}
//                                 className="hover:underline"
//                               >
//                                 {file.fileType}: {file.downloadLink.split('/').pop()}
//                               </a>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No program data available.</div>
//       )}
//     </div>
//   );
// };

// export default Depot;



import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NavBar from './navbar';

const MySwal = withReactContent(Swal);

export const Depot = () => {
  const { id, idmod } = useParams();
  const [sampleProgram, setSampleProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newChapter, setNewChapter] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/module/${idmod}/program`);
        setSampleProgram(response.data.program);
        // console.log(response.data.program);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idmod]);

  const handleAddChapter = async () => {
    try {
      await axios.post(`http://localhost:4000/chapter/${idmod}/addChapter`, { title: newChapter });
      window.location.reload();
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      await axios.delete(`http://localhost:4000/chapter/${idmod}/${chapterId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    MySwal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous vraiment supprimer cette carte?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4000/card/${cardId}/delete`);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting card:', error);
        }
      }
    });
  };

  const handleAddCard = async (chapterId) => {
    try {
      await axios.post(`http://localhost:4000/card/${chapterId}/cards`);
      window.location.reload();
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleFillCard = (cardId) => {
    MySwal.fire({
      title: 'Add New Card',
      html: `
        <div>
          <label for="cardFile">Upload File</label>
          <input type="file" id="cardFile" class="swal2-input">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      customClass: {
        confirmButton: 'custom-confirm-button'  // Apply custom class
      },
      preConfirm: () => {
        const fileInput = document.getElementById('cardFile');
        const file = fileInput.files[0];
        return file;
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const file = result.value;
        const formData = new FormData();
        formData.append('file', file);

        try {
          await axios.post(`http://localhost:4000/card/${cardId}/files`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          window.location.reload();
        } catch (error) {
          console.error('Error adding files to card:', error);
        }
      }
    });
  };

  return (
    <div> 
      <div className='justify-end'><NavBar/> </div>

    <div className="p-6 bg-gray-100 min-h-screen ">
      <div className='flex '>
    <h2 className='font-bold text-2xl text-black'> Chapters </h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 ml-auto text-white font-semibold  py-1 px-2 rounded"
      >
        {showForm ? 'Cancel' : 'Add Chapter'}
      </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-3 mb-4">
          <h2 className="text-xl font-semibold mb-4">Add New Chapter</h2>
          <div className="mb-4">
            <label htmlFor="chapterName" className="block text-black font-medium mb-2">Chapter Name</label>
            <input
              type="text"
              id="chapterName"
              placeholder="Enter chapter name"
              value={newChapter}
              onChange={(e) => setNewChapter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddChapter}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add chapter
            </button>
          </div>
        </div>
      )}
      <hr className="border-gray-300 border-t-4 my-4 rounded" />
      {sampleProgram ? (
        sampleProgram.map((chapter) => (
          <div key={chapter._id} className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-4 ">{chapter.chapterName}</h2>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDeleteChapter(chapter.chapterId)}
                  className="bg-blue-600 text-white font-semibold py-1 px-3 rounded text-sm"
                >
                  {/* Supprimer le chapitre */}
                  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="white"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
                </button>
                <button
                  onClick={() => handleAddCard(chapter.chapterId)}
                  className="bg-blue-600 text-white font-semibold py-1 px-3 rounded text-sm"
                >
                  {/* Add Card */}
                  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="white"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
    />
  </svg>
                </button>
              </div>
            </div>
            {chapter.cards.length === 0 ? (
              <p className="text-gray-500">No cards available.</p>
            ) : (
              <div className="space-y-6">
                {chapter.cards.map((card) => (
                  <div
                    key={card.cardId}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full relative"
                  >
                    <button
                      onClick={() => handleDeleteCard(card.cardId)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm-4 2a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V3zm10-1a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V2zM5.879 18.121A1 1 0 0 1 4.464 19.536l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm10.657 0a1 1 0 0 1-1.415 1.414l-.707-.707a1 1 0 0 1 1.415-1.414l.707.707z"
                          clipRule="evenodd"
                        />
                      </svg> */}
                      <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="blue"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14"
    />
  </svg>
                    </button>
                    {card.files.length === 0 && (
                      <button
                        onClick={() => handleFillCard(card.cardId)}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded text-sm absolute left-1/2 transform -translate-x-1/2 bottom-2"
                      >
                        Fill Card
                      </button>
                    )}
                    {/* <h3 className="text-lg font-semibold text-gray-700 mt-4">Card {card.cardId}</h3> */}
                    {card.files.length === 0 ? (
                      <p className="text-gray-500">No files in this card</p>
                    ) : (
                      <div className="flex flex-row flex-wrap gap-6 mt-4">
                        {card.files.map((file) => (
                          <div
                            key={file.fileId}
                            className="flex-1 bg-blue-100 text-blue-600 p-4 rounded hover:bg-blue-200"
                          >
                            {file.fileType === 'mooc' ? (
                              <a
                                href={file.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {file.title}
                              </a>
                            ) : (
                              <a
                                href={`http://localhost:4000/download/${file.downloadLink.split('/').pop()}`}
                                className="hover:underline"
                              >
                                {file.fileType}: {file.downloadLink.split('/').pop()}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No program data available.</div>
      )}
    </div>
    </div>
  );
};

export default Depot;
