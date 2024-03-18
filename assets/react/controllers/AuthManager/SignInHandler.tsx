import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {storeToken} from "./AuthManager";

interface LoginResponse {
    success: boolean;
}

const SignInHandler: React.FC = () => {
    useEffect(() => {
        const authenticateUser = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token') || '';
            if (!token) {
                window.location.href = "https://auth.boundlessflight.net";
                return;
            }

            try {
                // Pass the JWT token in request headers
                const response = await axios.get<LoginResponse>('https://api.boundlessflight.net/api/token/getuser/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                if (response.data.success) {
                    storeToken(token)
                    window.location.href = "/dashboard";
                } else {
                    window.location.href = "https://auth.boundlessflight.net";
                }
            } catch (error) {
                console.log(error);
                window.location.href = "https://auth.boundlessflight.net";
            }
        };

        authenticateUser();
    }, []);

    return (
        <div>Redirecting...</div>
    );
};

export default SignInHandler;
