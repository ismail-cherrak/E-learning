import { useEffect, useState } from 'react';
import Navbar from './navbar';
import PropTypes from 'prop-types';
import Carde from './carde';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Page() {
    const [chapitres, setChapitres] = useState([]);
    const [newChapitreName, setNewChapitreName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [chapitreCounter, setChapitreCounter] = useState(0);


    const {id, idmod} = useParams()

    useEffect(()=>{
        const fetchData = async () =>{
            try{
              const response = await axios.get(`http://localhost:4000/module/${idmod}/program`)
            setChapitres([ ...response.data.program])
            //  console.log(idmod)
            console.log(chapitres)
            }catch(err){
              console.error(err)
            }
          }
      
          fetchData()
    },[])

    const handleAddChapitre = async () => {
        if (newChapitreName.trim() !== '') {
            const newChapitre = { id: chapitreCounter + 1, name: newChapitreName };
            setChapitres(prevChapitres => [...prevChapitres, newChapitre]);
                setNewChapitreName('');
                setShowModal(false);
                setChapitreCounter(prevCounter => prevCounter + 1);
            try{
                const response = await axios.post(`http://localhost:4000/chapter/${idmod}/addChapter`,{title: newChapitreName})
                
                
                

            } catch(err){
                console.log(err)
            }
        }
    };
    //ajouter un chapitre 

    const handleChapitreNameChange = (e) => {
        setNewChapitreName(e.target.value);
    };
 // function pour ajouter nom d'un chapitre 

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const handleDelete = (id) => {
        // const updatedChapitres = chapitres.filter(chapitre => chapitre.id !== id);
        // setChapitres(updatedChapitres);
    
        // if (updatedChapitres.length === 0) {
        //     setChapitreCounter(0);
        // } else {
        //     const updatedChapitresWithNewIDs = updatedChapitres.map((chapitre, index) => ({
        //         ...chapitre,
        //         id: index + 1
        //     }));
        //     setChapitres(updatedChapitresWithNewIDs);
        // }

        axios.delete('http://localhost:4000/chapter/')
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/6 bg-gray-300 h-full"> 
                <Sidebar chapitres={chapitres} openModal={openModal} />
            </div>
            <div className="w-5/6"> 
                <div className="h-32 bg-blue-300">
                    <Navbar id={id} idmod={idmod}/>
                </div> 
                <div className="h-screen bg-gray-100 "> 
                    <div className="">
                        {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded-md">
                                    <h2 className="text-xl mb-4">Add Chapitre</h2>
                                    <input
                                        type="text"
                                        value={newChapitreName}
                                        onChange={handleChapitreNameChange}
                                        placeholder="Enter chapitre name"
                                        className="border border-gray-400 rounded px-2 py-1 mb-2"
                                    />
                                    <div className="flex justify-end">
                                        <button onClick={handleAddChapitre} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add</button>
                                        <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {chapitres.map((chapitre) => (
                            <div key={chapitre.id}>
                                {/* <h2 className="ml-2">Chapitre {chapitre.id}: {chapitre.name}</h2>
                                <Carde onDelete={() => handleDelete()} className=" pl-2  " /> */}
                                <div className="flex-row flex">
                                <h2 className=" ml-20 mr-20 text-blue-500 font-semibold ">Chapitre {chapitre.id}: {chapitre.chapterName}</h2>
                                <div className="ml-auto">
                                <button className="bg-blue-600 w-[25px] text-white  rounded m-1 px-1 py-1 "> <FaPen/> </button>
                                <button className="bg-blue-600 w-[25px] text-white rounded m-1 px-1 py-1 mr-40" onClick={() => handleDelete(chapitre.id)}> <FaTrash/> </button> 
                                </div>
                                </div>
                                <Carde className="pl-2" /*cardList={chapitre.cards}*/ />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Sidebar = ({ chapitres, openModal }) => (
    <div className="bg-blue-600 text-white h-full  py-4 ">
        <ul> 
            <div className="flex mb-6 pl-5 ">
                <ul className="ml-3 mt-14 mb-3 mr-3 text-3xl text-extrabold"> Chapitres </ul> 
                <button className="text-2xl text-gray-800 text-extrabold inline-block bg-blue-200 mt-14 mr-2 pr-2 pl-2 pt-0.5 pb-1 rounded m-2 transition duration-300" onClick={openModal}> + </button> 
            </div>
            {chapitres.map((chapitre) => (
                <li key={chapitre.id}  className="py-2 cursor-pointer pl-6 hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300">Chapitre {chapitre.id}: {chapitre.chapterName}</li>
            ))}
        </ul>
    </div>
);


Sidebar.propTypes = {
    chapitres: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default Page;
