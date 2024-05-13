

import PropTypes from 'prop-types';
import { FaDownload, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState , useRef } from 'react';
import cours from './assets/cours.png';
import Line from './line';

    function Document({ onConfirm, onClose }) {
        const [additionalElements, setAdditionalElements] = useState([]);
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const fileInputRef = useRef(null);
        const [file, setFile] = useState(null);
        
        // const handleSelect = (selectedValue, index) => {
        //     setDescription(selectedValue);
        //     const updatedElements = [...additionalElements];
        //     updatedElements[index].option = selectedValue;
        //     setAdditionalElements(updatedElements);
        // };
    
        const handleTitleChange = (event, index) => {
            const updatedElements = [...additionalElements];
            updatedElements[index].title = event.target.value;
            setAdditionalElements(updatedElements);
        };

        const handledescChange = (event, index) => {
            const updatedElements = [...additionalElements];
            updatedElements[index].description = event.target.value;
            setAdditionalElements(updatedElements);
        };

    
        const handleAjouterClick = () => {
            if (additionalElements.length < 1) {
                const newElement = {
                    index: additionalElements.length,
                    title: title,
                    description: description,
                    file: file
                };
                setAdditionalElements(prevElements => [...prevElements, newElement]);
                setTitle('');
                setDescription('');
                setFile(null);
            }
        };
    
        const handleDeleteElementClick = (indexToDelete) => {
            setAdditionalElements(prevElements => prevElements.filter((_, index) => index !== indexToDelete));
        };
    
        const handleConfirmClick = () => {
            onConfirm(additionalElements);
            onClose(); 
        };
    
        const handleFileSelect = (event, index) => {
            const file = event.target.files[0];
            const updatedElements = [...additionalElements];
            updatedElements[index].file = file;
            setAdditionalElements(updatedElements);
            setFile(file);
        };
    
        return (
            <div>
                <div className="flex h-[550px] items-center justify-center">
                    <div className="border border-black rounded h-[540px] w-[500px] mx-auto p-4 relative overflow-y-scroll">
                        {additionalElements.map((element, index) => (
                            <div key={index} className="mb-2">
                                <h2 className="mr-2">DOC</h2>
                                <div className="mb-2 flex">
                                    <button className="bg-gray-300 text-blue-800 absolute right-0 mr-2 rounded-lg px-2 py-1 w-10 text-bold" onClick={() => handleDeleteElementClick(index)}> ― </button>
                                </div>
                                <input type="text" className="border border-gray-800 focus:outline-none rounded-md py-2 px-2 m-1 w-full" placeholder="Titre" value={element.title} onChange={(e) => handleTitleChange(e, index)} />
                                <input type="text" className="border border-gray-800 focus:outline-none rounded-md py-2 px-2 m-1 w-full" placeholder="description" value={element.description} onChange={(e) => handledescChange(e, index)} />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => handleFileSelect(e, index)}
                                />
                                <button className="bg-blue-700 border-blue-700 rounded-md w-full px-2 py-2 mt-2 text-white text-bold" onClick={() => fileInputRef.current.click()}> ajouter </button>
                                
                                <Line />
                            </div>
                        ))}
                        <button className="bg-gray-300 text-gray-800 rounded-lg py-6 px-12 text-xl mx-auto block" onClick={handleAjouterClick}>
                            <span className="text-6xl">+</span>
                        </button>
                        <Line />
                        <button className="bg-blue-700 rounded-lg text-white py-1 px-2 absolute ml-20 w-80 mb-1" onClick={handleConfirmClick}>Confirmer</button>
                    </div>
                </div>
            </div>
        );
    }

    Document.propTypes = {
        onConfirm: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
    };


// function Cardone({ description , file , title }) {


//     return (
//         <div className="m-2">
//             <div className={`border border-gray-100 rounded-lg shadow-md p-2 flex bg-red-100 items-center w-[635px]`}>
//                 <div className="mr-4"> <img src={cours} className="rounded-lg shadow-md" alt="icon" /> </div>
//                 <div className="flex-row">
//                 <div>
//                     <div className="text-xs">Title</div>
//                     <div className="text-xs font-semibold">{title}</div>
//                 </div>
//                 <div className="Text-xs font-semibold ">
//                     <div className="text-xs font-semibold text-center">{description}</div>
//                 </div>

//                 {file && <a href={URL.createObjectURL(file)} download={title}>
//                         <div className="object-none object-right-top">
//                         <FaDownload/> 
//                 </div>
//                         </a>}

//                 </div>
//             </div>
//         </div>
//     );
// }

// Cardone.propTypes = {
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     file: PropTypes.object
// };


function Cardone({ description, file, title }) {
    return (
        <div className="m-2">
            <div className="border border-gray-100 rounded-lg shadow-md p-2 flex bg-red-100 items-center w-[635px]">
                <div className="mr-2">
                    <img src={cours} className="rounded-lg shadow-md" alt="icon" />
                </div>
                <div className="flex-grow">
                    <div className="text-xs">Title</div>
                    <div className="text-xs font-semibold">{title}</div>
                </div>
                <div className="flex-grow flex justify-center">
                    <div className="text-xs font-semibold">{description}</div>
                </div>
                <div className="flex-none">
                    {file && (
                        <a href={URL.createObjectURL(file)} download={title}>
                            <div className="object-none object-right-top">
                                <FaDownload />
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

Cardone.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.object
};



function Carde() {
    const cardStyle = {
        width: '815px',
    };

    const [cardList, setCardList] = useState([{ elements: [], isEyeOpen: true, isModalOpen: false }]);

    const handleEyeClick = (index) => {
        const updatedCardList = [...cardList];
        updatedCardList[index].isEyeOpen = !updatedCardList[index].isEyeOpen;
        setCardList(updatedCardList);
    };
// fonction pour fonctionnalites de visibilte 

    const handleModalToggle = (index) => {
        const updatedCardList = [...cardList];
        updatedCardList[index].isModalOpen = !updatedCardList[index].isModalOpen;
        setCardList(updatedCardList);
    };
// fonction pour le modal (non incluse) 

    const handleConfirmDocument = (index, elements) => {
        const updatedCardList = [...cardList];
        updatedCardList[index].elements = elements;
        updatedCardList[index].isModalOpen = false;
        setCardList(updatedCardList); 
        //
    };
// cfonction pour , une fois le button 'confirmer' clique , il ajoute une card fel card lkbira (ajouter un document dans une carde)

    const handleAddCard = () => {
        setCardList([...cardList, { elements: [], isEyeOpen: true, isModalOpen: false }]);
    };

    const handleDelete = (index) => {
        const updatedCardList = [...cardList];
        updatedCardList.splice(index, 1);
        setCardList(updatedCardList);
    };

    //ajouter une carde 

    return (
        <div>
            {cardList.map((card, index) => (
                <div key={index} className="border border-gray-300 rounded-lg shadow-md ml-20 mt-7 flex " style={cardStyle}>
                    <div className="ml-5  mr-2 mt-6 p-1">
                        <button className="mr-2 mb-3" onClick={() => handleEyeClick(index)}>{card.isEyeOpen ? <FaEye /> : <FaEyeSlash /> }</button>
                    </div>

                    <div className="flex">
                        {card.isEyeOpen && card.elements.map((element, elementIndex) => {
                            switch (element.index) {
                                case 0:
                                    return <Cardone key={elementIndex} title={element.title} description={element.description} file={element.file}  />;
                                default:
                                    return null;
                            }
                        })}
                    </div>
                    {/* //added file={element.file} in each card */}

                    <div className="ml-auto flex items-center ">
                        <button onClick={() => handleModalToggle(index)} className="mr-6 "> Edit </button>
                        <button onClick={() => handleDelete(index)} className="mr-2 font-extrabold text-black"> ⨉ </button>
                    </div>

                    {card.isModalOpen && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg">
                                <Document onConfirm={(elements) => handleConfirmDocument(index, elements)} onClose={() => handleModalToggle(index)} />
                                <button onClick={() => handleModalToggle(index)} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Close</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <button onClick={handleAddCard} className="bg-gray-300 text-gray-600 px-2 py-1 rounded mt-2 text-4xl ml-20 w-[815px] h-[50px]"> + </button>
        </div>
    );
}

Carde.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

//{ onDelete } kanet en parametres 
export default Carde;




