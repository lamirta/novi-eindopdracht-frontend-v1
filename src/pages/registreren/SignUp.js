import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import './SignUp.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [enabled, setEnabled] = useState('');
    const history = useHistory();

    //Implementeer unmounting-effecten op de registreer-, inlog- en profielpagina door het request te annuleren met een Axios Canceltoken.

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users', {
                username: username,
                email: email,
                password: password,
                enabled: enabled,
            })
            history.push('/signin')
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="body-outer-container">
                <h1>Nieuwe gebruiker aanmaken</h1>
            <section className="body-inner-container-small">
            <p>Alleen een admin kan nieuwe users aanmaken. Kijk bij jouw gebruikersrol of jij een admin bent.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </label>
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
                <label htmlFor="password">Wachtwoord
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <button type="submit">Registreren</button>
            </form>
                <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
            </section>
            </div>
        </>
    );
};

export default SignUp;