import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import './SignIn.css';
import {AuthContext} from "../../context/AuthContext";

// TO DO:
// Uitvinden of ik ook gelijk door kan linken naar profiel..
// Oplossing, direct na inloggen (alleen eerste keer..??)
    // aparte pagina, waar je assign profiel to user gelijk aanroept?

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        try {
            const result = await axios.post('http://localhost:8080/authenticate', {
                username: username,
                password: password,
                // deze paarse keys heten hetzelfde omdat dit vooraf is bepaald in de fake server die we nu gebruiken..
                // Note: dus zelf in mijn eigen beckend aanpassen..
            });
            login(result.data.jwt);
            history.push(`/user/${username}`);
        } catch (error) {
            console.log(error.response.data);
            console.error(error);
            toggleError(true);
        }
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
                {error && <p className="error-message">Combinatie van username en wachtwoord is onjuist</p>}
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? Vraag dan aan jouw docent om een account voor je aan te maken</p>
                </section>
                </section>
            </div>
        </>
    );
}

export default SignIn;