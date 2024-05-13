
import Navbar from './navbar';
import PropTypes from 'prop-types';
import Carde from './cardR';

function Pagedevoir() {

    return (
        <div className="flex h-screen">
            <div className="w-1/6 bg-gray-300 h-screen"> 
                <Sidebar />
            </div>
            <div className="w-5/6"> 
                <div className="h-16 bg-blue-500">
                    <Navbar/>
                </div> 
                <div className="h-screen bg-gray-100 "> 
                    <div>
                                <div className="flex-row flex">
                                <h2 className=" ml-20 mr-20 text-blue-500 font-semibold mt-10"> Devoir </h2>
                                <div className="ml-auto">
                                </div>
                                </div>
                                <Carde className="pl-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Sidebar = () => (
    <div className="bg-blue-800 text-white h-screen w-60 py-4 ">
        <ul> 
            <div className="flex mb-6">
                <ul className="ml-6 mt-14 mb-3 mr-3 text-3xl text-extrabold"> Devoir </ul> 
            </div>
        </ul>
    </div>
);


Sidebar.propTypes = {
    chapitres: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default Pagedevoir;