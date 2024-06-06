import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const QuizzSt = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const { id, idmod } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/quizz/${idmod}/quizzes`);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();

    // Cleanup function to cancel any ongoing requests if component unmounts or idmod changes
    return () => {
      // Cancel ongoing requests or perform any cleanup here
    };
  }, [idmod]);

  const handleSolveQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowDetails(true);
  };

  const handleQuizSubmission = async (responses) => {
    try {
      // Prepare the data for submission
      const data = {
        studentId: id,
        chosenOptions: responses,
      };

      // Make the POST request
      const response = await axios.post(`http://localhost:4000/quizz/${selectedQuiz._id}/submit`, data);
      console.log('Quiz submission successful:', response.data);
      
      // Reset the selected quiz and showDetails state
      setSelectedQuiz(null);
      setShowDetails(false);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-4 mt-5 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Quizzes</h1>
      {showDetails ? (
        <QuizDetails quiz={selectedQuiz} onSubmit={handleQuizSubmission} />
      ) : (
        <QuizzList quizzes={quizzes.filter(quiz => quiz.visibility)} onClick={handleSolveQuiz} />
      )}
    </div>
  );
};

const QuizCard = ({ quiz, onClick }) => {
  const { _id, titre, addedBy, dateDepot } = quiz;
  const addedByName = addedBy ? `${addedBy.nom} ${addedBy.prenom}` : 'Unknown';

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 ml-5 " key={_id}>
      {/* <h2 className="text-xl font-semibold mb-2">Quiz ID: {_id}</h2> */}
      <h2 className="text-xl font-semibold mb-2">{titre}</h2>
      <p className="text-gray-600 mb-2">Added by: {addedBy && addedBy.nom && addedBy.prenom ? addedByName : 'Unknown'}</p>
      <p className="text-gray-600 mb-2">Date: {new Date(dateDepot).toLocaleDateString()}</p>
      <button onClick={() => onClick(quiz)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Solve Quiz
      </button>
    </div>
  );
};

const QuizzList = ({ quizzes, onClick }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} onClick={onClick} />
      ))}
    </div>
  );
};

const QuizDetails = ({ quiz, onSubmit }) => {
  const [responses, setResponses] = useState([]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex] = [optionIndex];
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    onSubmit(responses);
  };

  return (
    <div className=" shadow-md rounded-md p-4 mb-4  bg-gray-100 min-h-screen ml-10">
      {/* <h2 className="text-xl font-semibold mb-4">Quiz ID: {quiz._id}</h2> */}
      {quiz.questions.map((question, questionIndex) => (
        <div key={question._id} className="mb-4 ">
          <p className="font-semibold">{question.enonce}</p>
          <div className="ml-4">
            {question.options.map((option, optionIndex) => (
              <div key={option._id} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option._id}
                  name={question._id}
                  value={optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                <label htmlFor={option._id} className="ml-2">{option.name}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Submit
      </button>
    </div>
  );
};
