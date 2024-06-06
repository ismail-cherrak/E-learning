
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'


// function Navbar({ id, idmod }) {
//     const [isClicked, setIsClicked] = useState(false);

//     const handleClick = () => {
//         setIsClicked(!isClicked);
//     }; 



//     return (
//         <nav className="bg-blue-600 p-4 h-32">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className= " flex space-x-4">
//                     <Link to={`/h/${id}/${idmod}`} className=" text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300   "  onClick={handleClick} > Depot</Link>
//                     <a href="#" className= "text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300" onClick={handleClick}>Ressources</a>
//                     <a href="#" className="text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300" onClick={handleClick} >devoir</a>
//                     <a href="#" className="text-white inline-block hover:text-blue-800 rounded p-1 hover:bg-blue-200 transition duration-300" onClick={handleClick} >Quiz</a>
//                 </div>
//                 <Link to='/'> <div className="mr-6 text-white" > Deconnection </div> </Link>
//             </div>
//         </nav>
//     );
// }

// Navbar.propTypes = {
//     id : PropTypes.string.isRequired,
//     idmod : PropTypes.string.isRequired
// } 
// export default Navbar;
import { useState, useEffect } from 'react';
import moment from 'moment';

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('LT'));
  const [currentDate, setCurrentDate] = useState(moment().format('LL'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('LT'));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setCurrentDate(moment().format('LL'));
  }, []);

  return (
    <nav className="bg-white shadow-lg h-8 ml-2">
      {/* deleted mr-2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-full">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center  text-black font-bold">
              {/* <h2> Welcome </h2>  */}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex-shrink-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

              <p className="text-gray-600 text-sm ml-2 mr-2">{currentDate}</p>
              <p className="text-gray-600 text-sm">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;