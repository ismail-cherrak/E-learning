
import { useEffect } from 'react';
import Logo from './assets/Logo.png'
import Image from './assets/esimage.png'
import { Link } from "react-router-dom"; 
import { useState } from 'react';
function App() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleemailChange = (event) => {
    setemail(event.target.value);
  };

  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
  };

    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'visible';
      };
    }, []);

  return (
    <div className="grid grid-cols-3">

      <div className="col-span-1 h-screen flex flex-col items-center justify-center ">
        <h1 className="text-blue-950 text-4xl font-pacifico font-semibold m-2 ">BIENVENUE à</h1>
        <h1 className="text-4xl text-blue-950 font-lexend font-semibold">E-learning</h1>
        <h1 className="text-4xl font-lexend text-blue-950 font-semibold m-2 ">ESI SBA</h1>
        <div>
        <img src={Logo} className="mt-5 mb-5 w-1/2 ml-11 " />
        </div>
        <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend " value={email} placeholder="Email " onChange={handleemailChange} type="email"/>
        <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 h-10 pl-4 placeholder-gray-600 text-black font-lexend placeholder:font-lexend" value={password} placeholder="Mot de passe" onChange={handlepasswordChange} type="password" />
        <Link to='/Home'>
        <button className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72 h-10 font-lexend font-semibold active:scale-[.98] " type="submit"> Connexion </button> 
        </Link>
        <Link  to='/password' className="text-blue-950 font-lexend font-medium text-sm ">Mot de passe oublie? </Link>
        </div>

      <div className="col-span-2 h-screen  bg-white">
        <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );

}

export default App;

