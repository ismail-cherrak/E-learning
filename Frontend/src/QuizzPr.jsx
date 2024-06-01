
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const QuizzPr = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { id, idmod } = useParams();

  const [formData, setFormData] = useState({
    titre: '',
    questions: [],
    visibility: true,
    addedBy: id,
    module: idmod,
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:4000/quizz/${idmod}/quizzes`);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, [idmod]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { enonce: '', options: Array(4).fill({ name: '', value: false }) }],
    });
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = formData.questions.map((question, qIndex) => {
      if (qIndex === index) {
        return { ...question, enonce: e.target.value };
      }
      return question;
    });
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const newQuestions = formData.questions.map((question, questionIndex) => {
      if (questionIndex === qIndex) {
        const newOptions = question.options.map((option, optionIndex) => {
          if (optionIndex === oIndex) {
            return { ...option, name: e.target.value };
          }
          return option;
        });
        return { ...question, options: newOptions };
      }
      return question;
    });
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const newQuestions = formData.questions.map((question, questionIndex) => {
      if (questionIndex === qIndex) {
        const newOptions = question.options.map((option, optionIndex) => ({
          ...option,
          value: optionIndex === oIndex,
        }));
        return { ...question, options: newOptions };
      }
      return question;
    });
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Add the dateDepot field to the formData before sending the request
      const currentDate = new Date().toISOString();
      const response = await axios.post(`http://localhost:4000/quizz/add/${idmod}`, { ...formData, dateDepot: currentDate });
      setQuizzes([...quizzes, response.data.quiz]);
      setFormData({
        titre: '',
        questions: [],
        visibility: true,
        addedBy: id,
        module: idmod,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleToggleViewNotes = (quiz) => {
    setSelectedQuiz(selectedQuiz === quiz ? null : quiz);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">Quizzes</h1>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Quiz'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mb-4">
                   <h2 className="text-xl font-semibold mb-4">Add Quiz</h2>
                   <div className="mb-4">
                     <label htmlFor="titre" className="block text-gray-700 font-bold mb-2">
                       Title
                     </label>
                     <input
                       type="text"
                       id="titre"
                       name="titre"
                       value={formData.titre}
                       onChange={handleInputChange}
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     />
                   </div>
                   <div className="mb-4">
                     <h3 className="text-lg font-semibold">Questions</h3>
                     {formData.questions.map((question, qIndex) => (
                       <div key={qIndex} className="mb-4">
                         <label className="block text-gray-700 font-bold mb-2">Question {qIndex + 1}</label>
                         <input
                           type="text"
                           value={question.enonce}
                           onChange={(e) => handleQuestionChange(qIndex, e)}
                           placeholder="Enter the question statement"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                         />
                         {question.options.map((option, oIndex) => (
                           <div key={oIndex} className="mb-2 flex items-center">
                             <input
                               type="text"
                               value={option.name}
                               onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                               placeholder={`Option ${oIndex + 1}`}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                             />
                             <input
                               type="radio"
                               name={`correct-answer-${qIndex}`}
                               checked={option.value}
                               onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                             />
                             <label className="ml-2">Correct</label>
                           </div>
                         ))}
                       </div>
                     ))}
                     <button
                       type="button"
                       onClick={handleAddQuestion}
                       className="bg-green-500 text-white font-bold py-1 px-2 rounded mb-2"
                     >
                       Add Question
                     </button>
                   </div>
                   <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                     Submit
                   </button>
                 </form>
      )}
      {isLoading ? (
        <p>Loading quizzes...</p>
      ) : (
        <div>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">{quiz.titre}</h2>
              <p className="text-gray-600 mb-2">Added by: {quiz.addedBy?.nom} {quiz.addedBy?.prenom}</p>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2" onClick={() => handleToggleViewNotes(quiz)}>
                {selectedQuiz === quiz ? 'Close Notes' : 'View Notes'}
              </button>
              {selectedQuiz === quiz && (
                <div className="bg-gray-200 p-4 rounded">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-bold text-lg">Name</th>
                        <th className="text-left font-bold text-lg">Score</th>
                        <th className="text-left font-bold text-lg">Date Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quiz.submittedBy.map((submission, index) => (
                        <tr key={index}>
                          <td>{submission.etudiant.nom} {submission.etudiant.prenom}</td>
                          <td>{Math.round((submission.noteEtudiant / 100) * 20)}/20</td>
                          <td>{new Date(submission.dateSoumission).toLocaleString()}</td>
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


