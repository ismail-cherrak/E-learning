import { useState } from 'react';
import axios from 'axios';
import Logo from './assets/Logo.png';
import Image from './assets/esimage.png';

function Password() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSendCode = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/forgot-password', { email });
            console.log(response.data.message);
            // Redirect user to the new password page
            window.location.href = '/Codepin';
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 md:col-span-1 lg:col-span-1 h-screen flex flex-col items-center justify-center">
                <div>
                    <img src={Logo} className="m-4" alt="Logo" />
                </div>
                <h1 className="text-blue-950 font-lexend font-medium">Mot de passe oublié? </h1>
                <div>
                    <p className="text-black text-center font-lexend text-sm m-4 font-light ">
                        Veuillez entrer votre email <br /> Un code de vérification <br /> vous sera envoyé
                    </p>
                </div>
                <input
                    className="border border-gray-800 focus:outline-none m-2 rounded-md w-72 md:w-full lg:w-72 h-10 pl-4 placeholder-gray-600 placeholder:font-lexend text-black font-lexend"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                <button
                    className="border border-blue-950 bg-blue-950 m-2 text-white rounded-md w-72 md:w-full lg:w-72 h-10 font-lexend font-semibold active:scale-[.98]"
                    onClick={handleSendCode}
                    type="button"
                >
                    Envoyer
                </button>
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-2 h-screen bg-white hidden sm:block md:block">
                <img src={Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    );
}

export default Password;
