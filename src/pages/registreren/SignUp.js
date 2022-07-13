import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import './SignUp.css';
import {AuthContext} from "../../context/AuthContext";


function SignUp() {
    const {user} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [consoleError, setConsoleError] = useState('');
    const [addSuccess, toggleAddSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:8080/users', {
                username: username,
                password: password,
                email: email,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            toggleAddSuccess(true);
            console.log(result.data)
        } catch(error) {
            setConsoleError(error.response.data);
            console.log(error.response.data);
            console.log(error.response.status);
            console.error(error);
        }
    }

    return (
        <>
            <div className="body-outer-container">
                <h1>Nieuwe gebruiker aanmaken</h1>
            <section className="body-inner-container-small">
            <p>Alleen een docent kan nieuwe gebruikers aanmaken. Jij bent: <strong>
                {(() => {
                    switch (user.role) {
                        case "STUDENT":
                            return " Leerling";
                        case "TEACHER":
                            return " Docent ☑️";
                        default:
                            return " Undefined";
                    }
                })()}</strong></p>
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
                {!username && <><p className="error-message">Alle velden zijn verplicht</p></>}
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
                    <p className="success-msg-1">Nieuwe gebruiker is opgeslagen!</p>
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