
import { Link } from 'react-router-dom';
import Logo from './assets/Logo.png'
import Image from './assets/esimage.png'
import { useState } from 'react';

function New() {

    const [password, setpasswordValue] = useState('');
    const [passwordconfirm, setpasswordconfirmValue] = useState('');

    const handlepasswordChange = (event) => {
        setpasswordValue(event.target.value);
    };

    const handlepasswordconfirmChange = (event) => {
        setpasswordconfirmValue(event.target.value);
    };

    return (
        <div className="grid grid-cols-3">

            <div className="col-span-1 h-screen flex flex-col items-center justify-center ">
                <div>
                    <img src={Logo} className="m-4" />
                </div>
                <h1 className="text-blue-950 font-lexend font-medium ">Nouveau mot de passe </h1>
                <p className="text-black text-center font-lexend font-light ext-sm m-4">veuillez entrer votre  <br /> nouveau mot de passe  </p>
                <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend " placeholder="nouveau mot de passe  " value={password} onChange={handlepasswordChange} />
                <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 text-black font-lexend placeholder:font-lexend" placeholder="confirmer mot de passe" value={passwordconfirm} onChange={handlepasswordconfirmChange} />
                <Link to='/'>
                    <button className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72 h-10 font-lexend font-semibold active:scale-[.98] " type="submit"> Confirmer </button>
                </Link>
            </div>

            <div className="col-span-2 h-screen  bg-white">
                <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    );

}

export default New;