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

    // TO DO: maak een helper functie voor jwt expiration

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

    async function getUserData(username, token) {
        try {
            const result = await axios.get(`http://localhost:8080/users/${username}`, { headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`}
            })
            console.log(result.data);
            toggleIsAuth({
                ...isAuth,
                auth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    enabled: result.data.enabled,
                    role: result.data.authorities[0].authority,
                    profile: result.data.userProfile,
                    profileId: result.data.userProfile.id,
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
        history.push('/');
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
        // profileId: isAuth.user.profileId,
        login: signIn,
        logout: signOut,
    };

    return (
        <div>
            <AuthContext.Provider value={data}>
                {isAuth.status === 'done' ? children : <p>Loading...</p>}
                {/*{children}*/}
            </AuthContext.Provider>
        </div>
    );
}

export default AuthContextProvider;