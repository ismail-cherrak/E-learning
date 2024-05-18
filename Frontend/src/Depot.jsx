// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

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

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <button
//         onClick={() => setShowForm(!showForm)} // Toggle form visibility
//         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4"
//       >
//         {showForm ? 'Cancel' : 'Add Chapter'}
//       </button>
//       {showForm && (
//         <div>
//           <input
//             type="text"
//             placeholder="Chapter Name"
//             value={newChapter}
//             onChange={(e) => setNewChapter(e.target.value)}
//             className="p-2 border border-gray-300 rounded mb-4"
//           />
//           <button
//             onClick={handleAddChapter} // Call handleAddChapter function on button click
//             className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//       {sampleProgram ? (
//         sampleProgram.map((chapter) => (
//           <div key={chapter._id} className="mb-8">
//             <div className="flex justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-700 mb-2">{chapter.chapterName}</h2>
//                 <p className="text-gray-500 mb-6">Chapter ID: {chapter.chapterId}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   if (window.confirm(`Are you sure you want to delete this chapter? ${chapter.chapterId}`)) {
//                     handleDeleteChapter(chapter.chapterId);
//                   }
//                 }}
//                 className="bg-red-500 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Delete Chapter
//               </button>
//             </div>
//             {chapter.cards.length === 0 ? (
//               <p className="text-gray-500">No cards available.</p>
//             ) : (
//               <div className="space-y-6">
//                 {chapter.cards.map((card) => (
//                   <div
//                     key={card.cardId}
//                     className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
//                   >
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Depot = () => {
  const { id, idmod } = useParams(); // Extract route parameters
  const [sampleProgram, setSampleProgram] = useState(null); // State for program data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [newChapter, setNewChapter] = useState(''); // State for new chapter input
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [showCardForm, setShowCardForm] = useState({}); // State to toggle card form visibility
  const [newCard, setNewCard] = useState({ title: '', elements: [{ type: '', value: '' }] }); // State for new card input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/module/${idmod}/program`);
        setSampleProgram(response.data.program); // Update state with fetched data
        console.log(response.data.program);
      } catch (error) {
        setError('Error fetching data'); // Set error message
      } finally {
        setLoading(false); // Mark loading as done
      }
    };

    fetchData(); // Fetch data when the component is mounted
  }, [idmod]); // Dependency array with idmod to re-run when it changes

  const handleAddChapter = async () => {
    try {
      // Send POST request to add new chapter
      await axios.post(`http://localhost:4000/chapter/${idmod}/addChapter`, { title: newChapter });
      // Refresh the page after adding the chapter
      window.location.reload();
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      // Send DELETE request to delete chapter
      await axios.delete(`http://localhost:4000/chapter/${idmod}/${chapterId}`);
      // Refresh the page after deleting the chapter
      window.location.reload();
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleAddCard = async (chapterId) => {
    try {
      // Send POST request to add new card
      const formData = new FormData();
      formData.append('title', newCard.title);
      newCard.elements.forEach((element, index) => {
        formData.append(`elements[${index}][type]`, element.type);
        formData.append(`elements[${index}][value]`, element.value);
      });

      await axios.post(`http://localhost:4000/chapter/${idmod}/${chapterId}/addCard`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Refresh the page after adding the card
      window.location.reload();
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleElementChange = (index, field, value) => {
    const newElements = [...newCard.elements];
    newElements[index][field] = value;
    setNewCard({ ...newCard, elements: newElements });
  };

  const handleFileChange = (index, file) => {
    const newElements = [...newCard.elements];
    newElements[index].value = file;
    setNewCard({ ...newCard, elements: newElements });
  };

  const addElementField = () => {
    if (newCard.elements.length < 3) {
      setNewCard({ ...newCard, elements: [...newCard.elements, { type: '', value: '' }] });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => setShowForm(!showForm)} // Toggle form visibility
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4"
      >
        {showForm ? 'Cancel' : 'Add Chapter'}
      </button>
      {showForm && (
        <div>
          <input
            type="text"
            placeholder="Chapter Name"
            value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleAddChapter} // Call handleAddChapter function on button click
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      )}
      {sampleProgram ? (
        sampleProgram.map((chapter) => (
          <div key={chapter._id} className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">{chapter.chapterName}</h2>
                <p className="text-gray-500 mb-6">Chapter ID: {chapter.chapterId}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCardForm({ ...showCardForm, [chapter._id]: !showCardForm[chapter._id] })} // Toggle card form visibility
                  className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded"
                >
                  {showCardForm[chapter._id] ? 'Cancel' : 'Add Card'}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete this chapter? ${chapter.chapterId}`)) {
                      handleDeleteChapter(chapter.chapterId);
                    }
                  }}
                  className="bg-red-500 text-white font-semibold py-1 px-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            {showCardForm[chapter._id] && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Card Title"
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                  className="p-2 border border-gray-300 rounded mb-2"
                />
                {newCard.elements.map((element, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <select
                      value={element.type}
                      onChange={(e) => handleElementChange(index, 'type', e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Type</option>
                      <option value="cours">Cours</option>
                      <option value="td">TD</option>
                      <option value="tp">TP</option>
                      <option value="mooc">MOOC</option>
                    </select>
                    {['cours', 'td', 'tp'].includes(element.type) ? (
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className="p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Element Value"
                        value={element.value}
                        onChange={(e) => handleElementChange(index, 'value', e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                ))}
                {newCard.elements.length < 3 && (
                  <button
                    onClick={addElementField}
                    className="bg-blue-500 text-white font-semibold py-1 px-2 rounded mb-2"
                  >
                    Add Another Element
                  </button>
                )}
                <button
                  onClick={() => handleAddCard(chapter._id)} // Call handleAddCard function on button click
                  className="bg-green-500 text-white font-semibold py-1 px-2 rounded"
                >
                  Submit Card
                </button>
              </div>
            )}
            {chapter.cards.length === 0 ? (
              <p className="text-gray-500">No cards available.</p>
            ) : (
              <div className="space-y-6">
                {chapter.cards.map((card) => (
                  <div
                    key={card.cardId}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">Card {card.cardId}</h3>
                    {card.files.length === 0 ? (
                      <p className="text-gray-500">No files in this card.</p>
                    ) : (
                      <div className="flex flex-row flex-wrap gap-6">
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
                                href={`http://localhost:4000/download/${file.downloadLink.split('/').pop()}`} // Construct the download link
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
        <div>No program data available.</div> // Handle no data case
      )}
    </div>
  );
};
