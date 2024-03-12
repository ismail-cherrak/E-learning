import Logo from './assets/Logo.png';
import Image from './assets/esimage.png';
import { useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Codepin() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setPin(event.target.value.slice(0, 6));
    };

    const handleConfirm = async () => {
        try {
            // Make an Axios request to verify the PIN
            const response = await axios.post('http://localhost:4000/auth/verify-pin', { pin });
            // If successful, redirect to the next page
            if (response.data.success) {
                window.location.href = '/newpsw';
            } else {
                setError('Invalid PIN. Please try again.');
            }
        } catch (error) {
            // If there's an error, set the error message
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-1 h-screen flex flex-col items-center justify-center ">
                <div>
                    <img src={Logo} className="m-4" alt="Logo" />
                </div>
                <h1 className="text-blue-950 font-bold font-lexend">Code PIN</h1>
                <p className="text-black text-center font-lexend text-sm m-4">Veuillez entrer votre code PIN</p>
                <input 
                    className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend" 
                    value={pin} 
                    onChange={handleChange} 
                    maxLength={6} 
                    placeholder=" — &nbsp; &nbsp; &nbsp; — &nbsp; &nbsp; &nbsp; — &nbsp; &nbsp; &nbsp; — &nbsp; &nbsp; &nbsp; — &nbsp;&nbsp;&nbsp; — " 
                />
                <button 
                    className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72 h-10 font-lexend font-semibold active:scale-[.98]" 
                    type="submit" 
                    onClick={handleConfirm}
                >
                    Confirmer
                </button>
                {error && <p className="text-red-500 font-lexend text-sm">{error}</p>} {/* Display error message */}
                {/* guys hadi chwia s3iba leave it for later pls  */}
                {/* <div className="flex flex-row">
                    <h1 className="text-black font-lexend text-xs m-1">Code non reçu?</h1>
                    <a href='' className="text-blue-900 text-xs font-lexend m-1">Renvoyer le code</a>
                </div> */}
            </div>
            <div className="col-span-2 h-screen bg-white">
                <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Image" />
            </div>
        </div>
    );
}

export default Codepin;
