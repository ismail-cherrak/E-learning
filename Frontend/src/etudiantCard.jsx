import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaDownload, FaExternalLinkAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import td from './assets/td.png';
import tp from './assets/tp.png';
import cours from './assets/cours.png';
import mooc from './assets/mooc.png'; 
import vide from './assets/vide.png';


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

function Carde() {
    const cardStyle = {
        width: '815px',
    };

    const [cardList, ] = useState([{ elements: [], isEyeOpen: true, isModalOpen: false }]);

// fonction pour fonctionnalites de visibilte 

// fonction pour le modal (non incluse) 

// cfonction pour , une fois le button 'confirmer' clique , il ajoute une card fel card lkbira (ajouter un document dans une carde)


    //ajouter une carde 

    return (
        <div>
            {cardList.map((card, index) => (
                <div key={index} className="border border-gray-300 rounded-lg shadow-md ml-20 mt-7 flex " style={cardStyle}>
                    <div className="ml-5  mr-3 mt-6 p-1">
                        <button className="mr-3 mb-3" >{card.isEyeOpen ? <FaEye /> : <FaEyeSlash /> }</button>
                    </div>

                    <div className="flex">
                        {card.isEyeOpen && card.elements.map((element, elementIndex) => {
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
                </div>
            ))} 
        </div>
    );
}


//{ onDelete } kanet en parametres 
export default Carde;





