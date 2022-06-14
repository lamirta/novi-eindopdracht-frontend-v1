import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import './SignIn.css';
import {AuthContext} from "../../context/AuthContext";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
                // deze paarse keys heten hetzelfde omdat dit vooraf is bepaald in de fake server die we nu gebruiken..
                // Note: dus zelf in mijn eigen beckend aanpassen..
            });
            login(result.data.accessToken);
        } catch (e) {
            console.error(e);
        }
        history.push('/profile');
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label htmlFor="password">Wachtwoord
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? Vraag dan aan jouw docent om een account voor je aan te maken. ///auth>  <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
};

export default SignIn;