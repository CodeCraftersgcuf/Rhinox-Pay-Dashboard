import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../constants/images';

const AuthenticatorCode: React.FC = () => {
    const navigate = useNavigate();
    const [authenticatorCode, setAuthenticatorCode] = useState('');

    const handleProceed = () => {
        // Handle authenticator code verification here
        console.log('Authenticator Code:', authenticatorCode);
        navigate('/dashboard');
    };

    return (
        <>
            <style>
                {`
                    .custom-placeholder::placeholder {
                        color: #696F77;
                    }
                `}
            </style>
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url(${images.login_bg})`,
                    backgroundColor: '#020C19',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
            >
                <div className="w-full max-w-lg px-4">
                    <div
                        className="rounded-2xl p-8 w-full relative"
                        style={{ backgroundColor: '#020C19', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
                    >
                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/authenticator-setup')}
                            className="absolute top-6 left-6 text-white hover:text-gray-300 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Shield Icon */}
                        <div className="flex justify-center mb-4 mt-2">
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
                                style={{ backgroundColor: '#031020', border: '1px solid #1F242B' }}
                            >
                                <img
                                    src={images.shield_tick}
                                    alt="Shield with checkmark"
                                    className="w-full h-full object-contain p-3"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <h1
                            className="text-white text-center mb-2"
                            style={{
                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", system-ui, sans-serif',
                                fontWeight: 590,
                                fontSize: '28.7px'
                            }}
                        >
                            Authenticator Code
                        </h1>
                        <p className="text-center mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#80858C' }}>
                            Input authenticator code to login
                        </p>

                        {/* Authenticator Code Input */}
                        <div className="mb-6">
                            <label className="block text-white mb-2 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                Authenticator code
                            </label>
                            <input
                                type="text"
                                value={authenticatorCode}
                                onChange={(e) => setAuthenticatorCode(e.target.value)}
                                placeholder="Input Code from your authenticator app"
                                className="w-full text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400 custom-placeholder"
                                style={{
                                    backgroundColor: '#1a2332',
                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                }}
                            />
                        </div>

                        {/* Proceed Button */}
                        <button
                            onClick={handleProceed}
                            className="cursor-pointer w-full text-gray-900 font-semibold py-3 rounded-xl transition-colors"
                            style={{
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                backgroundColor: '#A9EF45'
                            }}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthenticatorCode;

