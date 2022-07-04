import React, {useContext, useEffect, useState} from 'react';
import './WordLists.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ButtonContainer from "../../components/container/ButtonContainer";

function WordLists() {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [wordLists, setWordLists] = useState([]);

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get('http://localhost:8080/wordlists',{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
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
                    <ButtonContainer />
                </section>
                <section>
                    <button
                        type="button"
                        disabled={user.role !== 'TEACHER'}
                        onClick={() => history.push('/woordenlijst-toevoegen')}
                    >
                        Nieuwe woordenlijst aanmaken
                    </button>
                    <div className="hidden-div">Sorry, geen toegang 😔</div>
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