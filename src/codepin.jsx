
import Logo from './assets/Logo.png'
import Image from './assets/esimage.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Codepin() {

    const [pin, setPin] = useState('');

    const handleChange = (event) => {
    setPin(event.target.value.slice(0, 6));
    };


    return (
    <div className="grid grid-cols-3">

        <div className="col-span-1 h-screen flex flex-col items-center justify-center ">
        <div>
        <img src={Logo} className="m-4" />
        </div>
        <h1 className="text-blue-950 font-bold font-lexend"  >Code PIN </h1>
        <p className="text-black text-center font-lexend text-sm m-4 ">veuillez entrer votre  <br/> code PIN  </p>
        <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend  " value={pin} onChange={handleChange} maxLength={6} placeholder=" — &nbsp; &nbsp; &nbsp; — &nbsp; &nbsp; &nbsp; — &nbsp; &nbsp; &nbsp; — &nbsp; &nbsp; &nbsp; — &nbsp;&nbsp;&nbsp; — " />
        <Link to='/newpsw'>
        <button className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72 h-10 font-lexend font-semibold active:scale-[.98] " type="submit"> Confirmer 
        </button>
        </Link>
        <div className="flex flex-row">
        <h1 className="text-black font-lexend text-xs m-1"> Code non recu? </h1> 
        <a href='' className="text-blue-900 text-xs font-lexend m-1 "> renvoyer le code </a>
        </div>
        </div>

        <div className="col-span-2 h-screen  bg-white">
        <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    </div>
    );

}

export default Codepin;