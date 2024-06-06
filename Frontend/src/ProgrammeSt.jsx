import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './navbar';

export const ProgrammeSt = () => {
  const { id, idmod } = useParams(); // Extract route parameters
  const [sampleProgram, setSampleProgram] = useState(null); // State for program data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/module/${idmod}/program`);
        setSampleProgram(response.data.program); // Update state with fetched data
      } catch (error) {
        setError('Error fetching data'); // Set error message
      } finally {
        setLoading(false); // Mark loading as done
      }
    };

    fetchData(); // Fetch data when the component is mounted
  }, [idmod]); // Dependency array with idmod to re-run when it changes

  if (loading) {
    return <div className='ml-8'>Loading...</div>; // Loading indicator while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!sampleProgram) {
    return <div>No program data available.</div>; // Handle no data case
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-6">
      {sampleProgram.map((chapter) => (
        <div key={chapter.chapterId} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">{chapter.chapterName}</h2>
          {chapter.cards.length === 0 ? (
            <p className="text-gray-500">No cards available.</p>
          ) : (
            <div className="space-y-6">
              {chapter.cards.map((card) => (
                <div
                  key={card.cardId}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
                >
                  {/* <h3 className="text-lg font-semibold text-gray-700">Card {car</h3> */}
                  {card.files.length === 0 ? (
                    <p className="text-gray-500">No files in this card.</p>
                  ) : (
                    <div className="flex flex-row flex-wrap gap-6">
                      {card.files.map((file) => (
                        <div
                          key={file.fileId}
                          className="flex-1 bg-blue-100 text-blue-600 p-4 rounded hover:bg-blue-200"
                        >
                          {file.fileType === "mooc" ? (
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
      ))}
    </div>
  );
};


