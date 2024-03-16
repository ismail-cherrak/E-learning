import { useState } from 'react';
import axios from 'axios';
import Logo from './assets/Logo.png';
import Image from './assets/esimage.png';

function NewPassword() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleConfirm = async () => {
        try {
            // Make sure passwords match
            if (password !== passwordConfirm) {
                setError('Passwords do not match');
                return;
            }

            // Retrieve token from URL query params
            //  const urlParams = new URLSearchParams(window.location.search);
            //  const token = urlParams.get('token');

            // Make a request to the backend to reset the password
            const response = await axios.post('http://localhost:4000/auth/reset-password', { password });
            console.log(response.data.message);
            // Redirect user to the login page
            window.location.href = '/';
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 md:col-span-1 lg:col-span-1 h-screen flex flex-col items-center justify-center">
                <div>
                    <img src={Logo} className="m-4" alt="Logo" />
                </div>
                <h1 className="text-blue-950 font-lexend font-medium">Nouveau mot de passe </h1>
                <p className="text-black text-center font-lexend font-light text-sm m-4">Veuillez entrer votre nouveau mot de passe</p>
                <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 md:w-full lg:w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend " placeholder="Nouveau mot de passe" type="password" value={password} onChange={handlePasswordChange} />
                <input className="border border-gray-800 focus:outline-none m-2 rounded-md w-72  md:w-full lg:w-72 h-10 pl-4 placeholder-gray-600 text-black font-lexend placeholder:font-lexend" placeholder="Confirmer mot de passe" type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} />
                <button className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72  md:w-full lg:w-72 h-10 font-lexend font-semibold active:scale-[.98]" type="submit" onClick={handleConfirm}>Confirmer</button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-2 h-screen bg-white hidden sm:block md:block">
                <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Image" />
            </div>
        </div>
    );
}

export default NewPassword;
