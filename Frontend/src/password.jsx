
import Logo from './assets/Logo.png'
import Image from './assets/esimage.png'
import  { useState } from 'react'; 
import { Link } from 'react-router-dom';

function Password() {

    const [email, setemailValue] = useState('');

    const handleemailChange = (event) => {
    setemailValue(event.target.value);
    };

    return (
    <div className="grid grid-cols-3">

        <div className="col-span-1 h-screen flex flex-col items-center justify-center ">
        <div>
        <img src={Logo} className="m-4" />
        </div>
        <h1 className="text-blue-950 font-lexend font-medium ">Mot de passe oublie? </h1>
        <div> <p className="text-black text-center font-lexend text-sm m-4 font-light ">veuillez entrer votre email <br/> un code de vérification <br/> vous sera envoye </p>  </div>
        <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend " placeholder="Email " type="email" value={email}  onChange={handleemailChange}/>
        <Link to='/Codepin'>
        <button className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72 h-10 font-lexend font-semibold active:scale-[.98] " type="submit"> Envoyer </button>
        </Link>
        </div>

        <div className="col-span-2 h-screen  bg-white">
        <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    </div>
    );

}

export default Password;
