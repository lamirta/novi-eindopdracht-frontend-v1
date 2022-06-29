import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import './SignUp.css';

// hoe krijg ik een succes melding als user is aangemaakt?
// hoe krijg ik een foutmelding als de username al bezet is? krijg die vanuit de backend hier?

// <div class="status">{2 woorden opgeslagen als een concept}</div>
// "status" veranderd wanneer er een nieuwe melding komt..

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);  //kan ik dit niet null maken..? en dan if null?
    const [username, setUsername] = useState('');
    const [consoleError, setConsoleError] = useState('');
    const [addSuccess, toggleAddSuccess] = useState(false);
    const history = useHistory();

    //Implementeer unmounting-effecten op de registreer-, inlog- en profielpagina door het request te annuleren met een Axios Canceltoken.

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users', {
                username: username,
                password: password,
                email: email,
            })
            // history.push('/signin')
            toggleAddSuccess(true);
        } catch(error) {
            setConsoleError(error.response.data);
            console.log(error.response.data);
            console.error(error);
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
                        // className={username.length < 0 ? 'input-error' : ''}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </label>
                {!username && <p className="error-message">Alle velden zijn verplicht</p>}
                <label htmlFor="email">Email
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                {!email && <p className="error-message">Alle velden zijn verplicht</p>}
                <label htmlFor="password">Wachtwoord
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!password && <p className="error-message">Alle velden zijn verplicht</p>}

                <br></br>
                {addSuccess === true && <>
                    <p className="success-message">Nieuwe gebruiker is opgeslagen!</p>
                    <p>Ga door naar <Link to="/users">alle gebruikers</Link> <strong>of</strong> refresh de pagina</p>
                </>}
                {addSuccess ? <></> : <>{consoleError && <p className="error-message">{consoleError}: kies een andere username</p>}</>}
                <button
                    type="submit"
                    disabled={!username || !email || !password}
                >Registreren
                </button>
            </form>
                <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
            </section>
            </div>
        </>
    );
}

export default SignUp;