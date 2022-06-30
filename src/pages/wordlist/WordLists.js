import React, {useEffect, useState} from 'react';
import './WordLists.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function WordLists() {
    const history = useHistory();
    const [wordLists, setWordLists] = useState([]);

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get('http://localhost:8080/wordlists');
                setWordLists(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchLists();
    }, []);

    return (
        <>
            <div className="body-outer-container">
                <h1>Woordenlijsten</h1>
                <section className="table-container">
                <section>
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Woordenlijsten
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/toetsen')}
                    >
                        Toetsen
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/users')}
                    >
                        Gebruikers
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/userprofiles')}
                    >
                        Profielen
                    </button>
                </section>
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijst-toevoegen')}
                    >
                        Nieuwe woordenlijst aanmaken
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
                                <td><button
                                    type="button"
                                    onClick={() => history.push(`/woordenlijst/${wl.title}`)}
                                >
                                    Naar deze lijst
                                </button></td>
                                <td>{wl.title}</td>
                                <td>{wl.words.length}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </section>
                </section>
        </div>
        </>
    );
}

export default WordLists;