
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'


function Navbar({ id, idmod }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }; 



    return (
        <nav className="bg-blue-600 p-4 h-32">
            <div className="container mx-auto flex justify-between items-center">
                <div className= " flex space-x-4">
                    <Link to={`/h/${id}/${idmod}`} className=" text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300   "  onClick={handleClick} > Depot</Link>
                    <a href="#" className= "text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300" onClick={handleClick}>Ressources</a>
                    <a href="#" className="text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300" onClick={handleClick} >devoir</a>
                    <a href="#" className="text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300" onClick={handleClick} >Quiz</a>
                </div>
                <Link to='/'> <div className="mr-6 text-white" > Deconnection </div> </Link>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    id : PropTypes.string.isRequired,
    idmod : PropTypes.string.isRequired
} 
export default Navbar;