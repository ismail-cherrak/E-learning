 import Logo from './assets/Logo.png'
 import Image from './assets/esimage.png'
 import { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import axios from 'axios'
 export const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [errorMessage, setErrorMessage] = useState('')
     const handleEmailChange = (event) => {
         setEmail(event.target.value);
     }
     const handlePasswordChange = (event) => {
         setPassword(event.target.value);
     }
     const handleLogin = async () => {
         if (!email || !password) {
           setErrorMessage('Please fill in all fields');
           return;
         }    
         try {
           const response = await axios.post('http://localhost:4000/auth/login', { email, password });
           const { token, role,id } = response.data;
           localStorage.setItem('token', token);    
           // Redirect based on user's role
           if (role === 'etudiantHome') {
             window.location.href = `/EtudiantHome/${id}`;
           } else if (role === 'profHome') {
             window.location.href = `/ProfHome/${id}`;
           } else if (role === 'adminHome') {
             window.location.href = `/AdminHome/${id}`;
           }
         } catch (error) {
           setErrorMessage('Incorrect email or password');
           console.error('Login failed:', error);
         }
       };
     useEffect(() => {
         document.body.style.overflow = 'hidden';
         return () => {
             document.body.style.overflow = 'visible';
         };
     }, [])
     return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
             <div className="col-span-1 md:col-span-1 lg:col-span-1 h-screen flex flex-col items-center justify-center">
                 <h1 className="text-blue-950 text-4xl font-pacifico font-semibold m-2 ">BIENVENUE à</h1>
                 <h1 className="text-4xl text-blue-950 font-lexend font-semibold">E-learning</h1>
                 <h1 className="text-4xl font-lexend text-blue-950 font-semibold m-2 ">ESI SBA</h1>
                 <div>
                     <img src={Logo} className="mt-5 mb-5 w-1/2 ml-11 " />
                 </div>
                 {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                 <input
                     className="border border-gray-800 focus:outline-none m-2 rounded-md md:w-full lg:w-72 w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend"
                     value={email}
                     placeholder="Email"
                     onChange={handleEmailChange}
                     type="email"
                 />
                 <input
                     className="border border-gray-800 focus:outline-none m-2 rounded-md md:w-full lg:w-72 w-72 h-10 pl-4 placeholder-gray-600 text-black font-lexend placeholder:font-lexend"
                     value={password}
                     placeholder="Mot de passe"
                     onChange={handlePasswordChange}
                     type="password"
                 />
                 <button
                     className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72  md:w-full lg:w-72 h-10 font-lexend font-semibold active:scale-[.98]"
                     onClick={handleLogin}
                     type="button"
                 >
                     Connexion
                 </button>
                 <Link to='/password' className="text-blue-950 font-lexend font-medium text-sm ">Mot de passe oublie? </Link>
             </div>
             <div className="col-span-1 md:col-span-1 lg:col-span-2 h-screen bg-white hidden sm:block md:block">
                 <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
         </div>
     );
 }