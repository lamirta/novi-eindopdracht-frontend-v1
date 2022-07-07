import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './UpdateUser.css';

function UpdateUser({togglePopup}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [enabled, toggleEnabled] = useState(true);
    const history = useHistory();
    const { username } = useParams();

    // Voorkom een refresh op submit???
    // e.preventDefault();
    async function updateUser() {
        try {
            const result = await axios.put(`http://localhost:8080/users/${username}`, {
                email: email,
                password: password,
                // enabled: enabled
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            history.push(`/users`)
            // or refresh page, find out how??
        } catch (e) {
            console.error(e);
        }
    }

    function handleSubmit() {
        updateUser()
        togglePopup()
    }

    return (
        <>
            <h1>Account Updaten</h1>
            Update het het account van "{username}"
            <button
                type="button"
                onClick={togglePopup}
            >
                Terug
            </button>
            <form onSubmit={handleSubmit}>
                <label>Username
                    <input
                        type="username"
                        disabled
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
                <button
                    type="submit"
                > Update </button>
            </form>
        </>
    );
}

export default UpdateUser;