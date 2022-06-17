import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import './SignIn.css';
import {AuthContext} from "../../context/AuthContext";

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:8080/authenticate', {
                username: username,
                password: password,
                // deze paarse keys heten hetzelfde omdat dit vooraf is bepaald in de fake server die we nu gebruiken..
                // Note: dus zelf in mijn eigen beckend aanpassen..
            });
            login(result.data.accessToken);
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.error(error);
        }
        history.push('/profile');
    }

    return (
        <>
            <div className="body-outer-container">
            <h1>Inloggen</h1>
                <section className="body-inner-container-wide">
                <section className="body-inner-container-small">
            <p>Log hier in met jouw username en wachtwoord.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
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
                </section>
                </section>
            </div>
        </>
    );
}

export default SignIn;