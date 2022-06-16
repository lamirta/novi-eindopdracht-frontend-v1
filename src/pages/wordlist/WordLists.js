import React, {useEffect, useState} from 'react';
import './WordLists.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function WordLists() {
    const history = useHistory();
    const [wordLists, setWordLists] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8080/wordlists');
                setWordLists(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchUsers();
    }, []);

    return (
        <>
            <div className="body-outer-container">
                <h1>Woordenlijsten</h1>
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Nieuwe woordenlijst aanmaken
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/users')}
                    >
                        Gebruikers
                    </button>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Ga naar Woordenlijst</th>
                            <th>Titel</th>
                            <th>Aantal Woorden</th>
                        </tr>
                        </thead>
                        <tbody>
                        {wordLists.map((wl) => {
                            return <tr key={wl.title}>
                                <td><Link to="/profile">Klik</Link></td>
                                <td>{wl.title}</td>
                                <td>{wl.title}</td>
                                {/*<td>{wl.passed ? "Geslaagd" : "Gezakt"}</td>*/}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </section>
        </div>
        </>
    );
};

export default WordLists;