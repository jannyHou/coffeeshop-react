import { useState } from 'react';
export const UseToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('tokeninfo');
        const tokeninfo = JSON.parse(tokenString);
        return tokeninfo?.token
    };
    const [token, setToken] = useState(getToken());

    const saveToken = tokeninfo => {
        sessionStorage.setItem('tokeninfo', JSON.stringify(tokeninfo));
        console.log(`[useToken] [saveToken] tokeninfo stringify is:`)
        setToken(tokeninfo.token);
    };

    return {
        setToken: saveToken,
        token
    }
}