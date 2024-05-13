

import PropTypes from 'prop-types';
import { FaDownload, FaExternalLinkAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState , useRef } from 'react';
import td from './assets/td.png';
import tp from './assets/tp.png';
import cours from './assets/cours.png';
import mooc from './assets/mooc.png'; 
import vide from './assets/vide.png';
import Line from './line';


function ComboBox({ onSelect }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onSelect(selectedValue);
    };

    // function choisir une option du document 

    return (
        <div className="">
            <div className="">
                <select value={selectedOption} onChange={handleChange} className="border border-gray-400 rounded-md ml=2 px-2 py-1">
                    <option value="">Type document</option>
                    {['Cours', 'Fiche TD', 'Fiche TP', 'Mooc'].map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

ComboBox.propTypes = {
    onSelect: PropTypes.func.isRequired,
};


function Document({ onConfirm, onClose }) {
    const [additionalElements, setAdditionalElements] = useState([]);
    const [chapitreName, setChapitreName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const fileInputRef = useRef(null);
    const [ setFile] = useState('');
    const [moocUrl, setMoocUrl] = useState('');
    //add file in the setfile use state 
    

    const handleSelect = (selectedValue, index) => {
        setSelectedOption(selectedValue);
        const updatedElements = [...additionalElements];
        updatedElements[index].option = selectedValue;
        setAdditionalElements(updatedElements);
    };

    //ajouter l'option au tableaux de chaque card 

    const handleChapitreNameChange = (event, index) => {
        const updatedElements = [...additionalElements];
        updatedElements[index].chapitreName = event.target.value;
        setAdditionalElements(updatedElements);
    };

    //ajouter le nom au tableaux de chaque card

    const handleAjouterClick = () => {
        if (additionalElements.length < 3) {
            const newElement = {
                index: additionalElements.length,
                option: selectedOption,
                chapitreName: chapitreName,
                file: null,
                moocUrl: selectedOption === 'Mooc' ? moocUrl : ''
            };
            setAdditionalElements(prevElements => [...prevElements, newElement]);
            setSelectedOption('');
            setChapitreName('');
            setFile(null);
            if (selectedOption !== 'Mooc') {
                setMoocUrl('');
            }
        }
    };

// update du tableaux au nouevaux state 

    const handleDeleteElementClick = (indexToDelete) => {
        setAdditionalElements(prevElements => prevElements.filter((_, index) => index !== indexToDelete));
    };

// delete elements (hadi kheliha for later 7eta l meet psq we need more infos for this)

    const handleConfirmClick = () => {
        onConfirm(additionalElements);
        onClose(); 
    };
// function pour fermer le model (non inclus f l backend bs7 in case 7west 3liha )

    const handleFileSelect = (event, index) => {
        const file = event.target.files[0];
        const updatedElements = [...additionalElements];
        updatedElements[index].file = file;
        setAdditionalElements(updatedElements);
    };
// ajouter un document from file explorer 

    const handleMoocUrlChange = (event) => {
        setMoocUrl(event.target.value);
    };



    return (
        <div>
        <div className="flex h-[550px] items-center justify-center">
            <div className="border border-black rounded h-[540px] w-[500px] mx-auto p-4 relative overflow-y-scroll">
                {additionalElements.map((element, index) => (
                    <div key={index} className="mb-2">
                        <h2 className="mr-2">DOC</h2>
                        <div className="mb-2 flex">
                        <ComboBox onSelect={(selectedValue) => handleSelect(selectedValue, index)} className="w-full" />
                            <button className="bg-gray-300 text-blue-800 absolute right-0 mr-2 rounded-lg  px-2  py-1 w-10 text-bold" onClick={() => handleDeleteElementClick(index)}> ― </button>
                        </div>
                        <input type="text" className="border border-gray-800 focus:outline-none rounded-md py-2 px-2 m-1 w-full" placeholder="Titre" value={element.chapitreName} onChange={(e) => handleChapitreNameChange(e, index)} />

                        {/* {element.option === "Mooc" && (
                            <input type="text" className="border border-gray-800 focus:outline-none rounded-md py-2 px-2 m-1 w-full" placeholder="URL Mooc" value={element.moocUrl || ''}  />
                            )} */}

                                {element.option === "Mooc" && (
                                <input
                                    type="text"
                                    className="border border-gray-800 focus:outline-none rounded-md py-2 px-2 m-1 w-full"
                                    placeholder="URL Mooc"
                                    value={moocUrl}
                                    onChange={handleMoocUrlChange}
                                />
                            )}

                            {/* //////////// */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={(e) => handleFileSelect(e, index)}
                                    />
                            {/* ///// */}
                            <button className="bg-blue-700 border-blue-700 rounded-md w-full px-2 py-2 mt-2 text-white text-bold" onClick={() => fileInputRef.current.click()}> ajouter </button> 
                            {/* //adding files from desktop m3a had la function ==> need to manage state  */}
                            <Line />
                            </div>
                    ))}
                <button className="bg-gray-300 text-gray-800 rounded-lg py-6 px-12 text-xl mx-auto block" onClick={handleAjouterClick}>
            <span className="text-6xl">+</span>
                </button>
                <Line/>
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


function Cardone({ chapitreName, selectedOption , file , moocUrl }) {

    const getCardStyle = () => {
        let imgSrc, bgColor;

        switch (selectedOption) {
            case 'Cours':
                imgSrc = cours;
                bgColor = 'bg-red-100';
                break;
            case 'Fiche TD':
                imgSrc = td;
                bgColor = 'bg-yellow-100';
                break;
            case 'Fiche TP':
                imgSrc = tp ;
                bgColor = 'bg-green-100';
                break;
            case 'Mooc':
                imgSrc = mooc;
                bgColor = 'bg-purple-100';
                break;
            default:
                imgSrc = vide;
                bgColor = 'bg-gray-100';
                break;
        }

        return { imgSrc, bgColor };
    };

    const { imgSrc, bgColor } = getCardStyle();

    const handleMoocUrlClick = () => {
        window.open(moocUrl, '_blank');
    };

    return (
        <div className="m-2">
            <div className={`border border-gray-100 rounded-lg shadow-md p-2 flex ${bgColor} items-center w-[200px]`}>
                <div className="mr-4"> <img src={imgSrc} className="rounded-lg shadow-md" alt="icon" /> </div>
                <div>
                    <div className="text-xs">{selectedOption}</div>
                    <div className="text-xs font-semibold">{chapitreName}</div>

                    {file && <a href={URL.createObjectURL(file)} download={chapitreName}>
                        <div className="object-none object-right-top">
                        <FaDownload/> 
                        </div>
                        </a>}

                        {moocUrl && (
                    <div className="ml-3">
                        <FaExternalLinkAlt onClick={handleMoocUrlClick}/>
                    </div>
                )}

                </div>
            </div>
        </div>
    );
}

Cardone.propTypes = {
    chapitreName: PropTypes.string.isRequired,
    selectedOption: PropTypes.string.isRequired,
    file: PropTypes.object,
    moocUrl: PropTypes.string,
};



function Cardthree({ chapitrenom, Optionselect , file , moocUrl}) {

    const getCardStyle = () => {
        let imgSrc, bgColor;

        switch (Optionselect) {
            case 'Cours':
                imgSrc = cours;
                bgColor = 'bg-red-100';
                break;
            case 'Fiche TD':
                imgSrc = td;
                bgColor = 'bg-yellow-100';
                break;
            case 'Fiche TP':
                imgSrc = tp;
                bgColor = 'bg-green-100';
                break;
            case 'Mooc':
                imgSrc = mooc;
                bgColor = 'bg-purple-100';
                break;
            default:
                imgSrc = vide;
                bgColor = 'bg-gray-100';
                break;
        }

        return { imgSrc, bgColor };
    };

    const { imgSrc, bgColor } = getCardStyle();

    const handleMoocUrlClick = () => {
        window.open(moocUrl, '_blank');
    };

    return (
        <div className="m-2">
            <div className={`border border-gray-100 rounded-lg shadow-md p-2 flex ${bgColor} items-center w-[200px]`}>
                <div className="mr-4"> <img src={imgSrc} className="rounded-lg shadow-md" alt="icon" /> </div>
                <div>
                    <div className="text-xs">{Optionselect}</div>
                    <div className="text-xs font-semibold">{chapitrenom}</div>
                    {file && <a href={URL.createObjectURL(file)} download={chapitrenom}><FaDownload /> </a>}
                    {moocUrl && (
                    <div className="ml-3">
                        <FaExternalLinkAlt onClick={handleMoocUrlClick}/>
                    </div>
                )}
                </div>
            </div>
            
        </div>
    );
}

Cardthree.propTypes = {
    chapitrenom: PropTypes.string.isRequired,
    Optionselect: PropTypes.string.isRequired,
    file: PropTypes.object,
    moocUrl: PropTypes.string,
};



function Cardtwo({ nomchapitre, selectedOption , file }) {

    const getCardStyle = () => {
        let imgSrc, bgColor;

        switch (selectedOption) {
            case 'Cours':
                imgSrc = cours;
                bgColor = 'bg-red-100';
                break;
            case 'Fiche TD':
                imgSrc = td;
                bgColor = 'bg-yellow-100';
                break;
            case 'Fiche TP':
                imgSrc = tp ;
                bgColor = 'bg-green-100';
                break;
            case 'Mooc':
                imgSrc = mooc;
                bgColor = 'bg-purple-100';
                break;
            default:
                imgSrc = vide;
                bgColor = 'bg-gray-100';
                break;
        }

        return { imgSrc, bgColor };
    };

    const { imgSrc, bgColor } = getCardStyle();

    return (
        <div className="mt-2 mr-2 ml-2 ">
            <div className={`border border-gray-100 rounded-lg shadow-md p-2 flex ${bgColor} items-center w-[200px]`}>
                <div className="mr-4"> <img src={imgSrc} className="rounded-lg shadow-md" alt="icon" /> </div>
                <div>
                    <div className="text-xs">{selectedOption}</div>
                    <div className="text-xs font-semibold">{nomchapitre}</div>
                    {file && <a href={URL.createObjectURL(file)} download={nomchapitre}><FaDownload /> </a>}
                    {/* //added href and file in parameters */}
                </div>
            </div>
            
        </div>
    );
}

Cardtwo.propTypes = {
    nomchapitre: PropTypes.string.isRequired,
    selectedOption: PropTypes.string.isRequired,
    file: PropTypes.object,
}; 


//added file props type 

///4$$$$$$$$$$$$$$$$$$$$$$$$$$
// function Carde({ onDelete }) {
//     const cardStyle = {
//         width: '880px',
//     };

//     const [additionalElements, setAdditionalElements] = useState([]);
//     const [visibility, setvisibility] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleEyeClick = () => {
//         setvisibility(!visibility);
//     };

//     const handleEditCard = () => {
//         // Implement edit card functionality
//     };

//     const handleModalToggle = () => {
//         setIsModalOpen(!isModalOpen); // Toggle modal state
//     };

//     const handleConfirmDocument = (elements) => {
//         setAdditionalElements(elements);
//         handleModalToggle(); // Close the modal after confirming
//     };

//     return (
//         <div className="border border-gray-300 rounded-lg shadow-md ml-40 mt-7 flex " style={cardStyle}>
//             <div className="ml-5  mr-1 mt-10 ">
//                 <button onClick={handleEyeClick}>{visibility ? <FaEye /> : <FaEyeSlash />}</button>
//             </div>

//             <div className="flex">
//                 {visibility && additionalElements.map((element, index) => {
//                     switch (element.index) {
//                         case 0:
//                             return <Cardone key={index} chapitreName={element.chapitreName} selectedOption={element.option} />;
//                         case 1:
//                             return <Cardtwo key={index} nomchapitre={element.chapitreName} selectedOption={element.option} />;
//                         case 2:
//                             return <Cardthree key={index} chapitrenom={element.chapitreName} Optionselect={element.option} />;
//                         default:
//                             return null;
//                     }
//                 })}
//             </div>

//             <div className="ml-auto flex items-center ">
//                 <button onClick={handleEditCard} className="mr-6 "> Editer </button>
//                 <button onClick={onDelete} className="mr-2 font-extrabold text-black"> ⨉ </button>
//             </div>

//             {isModalOpen && (
//                 <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
//                     <div className="bg-white p-4 rounded-lg">
//                         <Document onConfirm={handleConfirmDocument} onClose={handleModalToggle} />
//                         <button onClick={handleModalToggle} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Close</button>
//                     </div>
//                 </div>
//             )}
//             <button onClick={handleModalToggle} className="bg-blue-500 text-white px-4 py-2 rounded mt-4"> + </button>
//         </div>
//     );
// }

// Carde.propTypes = {
//     onDelete: PropTypes.func.isRequired,
// };

// export default Carde;



///////////////////// this talia works fine ! 

function Carde(props) {
    const cardStyle = {
        width: '815px',
    };

    const [cardList, setCardList] = useState([{ elements: [], visibility: true, isModalOpen: false }]);

    //setCardList(props.cardList)

    const handleEyeClick =  async (index) => {
        const updatedCardList = [...cardList];
        updatedCardList[index].visibility = !updatedCardList[index].visibility;
        setCardList(updatedCardList);
        try{
        const response = await axios.post('')
        } catch {

        }
        
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
        setCardList([...cardList, { elements: [], visibility: true, isModalOpen: false }]);
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
                    <div className="ml-5  mr-3 mt-6 p-1">
                        <button className="mr-3 mb-3" onClick={() => handleEyeClick(index)}>{card.visibility ? <FaEye /> : <FaEyeSlash /> }</button>
                    </div>

                    <div className="flex">
                        {card.visibility && card.elements.map((element, elementIndex) => {
                            switch (element.index) {
                                case 0:
                                    return <Cardone key={elementIndex} chapitreName={element.chapitreName} selectedOption={element.option} file={element.file} moocUrl={element.moocurl} />;
                                case 1:
                                    return <Cardtwo key={elementIndex} nomchapitre={element.chapitreName} selectedOption={element.option} file={element.file} moocUrl={element.moocurl} />;
                                case 2:
                                    return <Cardthree key={elementIndex} chapitrenom={element.chapitreName} Optionselect={element.option} file={element.file} moocUrl={element.moocurl}  />;
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





