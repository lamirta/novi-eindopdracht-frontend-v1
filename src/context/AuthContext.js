import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [isAuth, toggleIsAuth] = useState({
        auth: false,
        user: null,
        status: 'pending',
    });

    // maak een helper functie voor jwt expiration

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);
            getUserData(decoded.sub, token);

            toggleIsAuth({
                auth: false,
                user: null,
                status: 'done'
            })

        } else {
            toggleIsAuth({
                auth: false,
                user: null,
                status: 'done'
            })
        }
        console.log("Context wordt gerefresht!")

    }, []);

    async function getUserData(id, token) {
        try {
            const result = await axios.get(`http://localhost:3000/users/${id}`, { headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`}
            })
            console.log(result.data);
            toggleIsAuth({
                ...isAuth,
                auth: true,
                user: {
                    id: result.data.id,
                    email: result.data.email,
                    username: result.data.username,
                },
                status: 'done',
            });

        } catch(e) {
            console.error(e)
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            });
        }
    }

    function signIn(jwt) {
        localStorage.setItem('token', jwt);
        const decoded = jwtDecode(jwt);
        getUserData(decoded.sub, jwt);
        console.log('Gebruiker is ingelogd');
        history.push('/profile');
    }

    function signOut() {
        localStorage.clear();
        toggleIsAuth({
            ...isAuth,
            auth: false,
            user: null,
        });
        console.log('Gebruiker is uitgelogd');
        history.push('/');
    }

    const data = {
        auth: isAuth.auth,
        user: isAuth.user,
        login: signIn,
        logout: signOut,
    };

    return (
        <div>
            <AuthContext.Provider value={data}>
                {/*{isAuth.status === 'done' ? children : <p>Loading...</p>}*/}
                {children}
            </AuthContext.Provider>
        </div>
    );
}

export default AuthContextProvider;