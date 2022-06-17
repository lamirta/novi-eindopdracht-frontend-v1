import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import './AddWordList.css';

// TO DO: onderaan een + extra woord button maken, uitzoeken hoe dat werkt met state

function AddWordList() {
    const [title, setTitle] = useState('');
    const [wordA, setWordA] = useState(null);
    const [wordB, setWordB] = useState(null);
    const [wordC, setWordC] = useState(null);
    const [wordD, setWordD] = useState(null);
    const [wordE, setWordE] = useState(null);
    const [wordF, setWordF] = useState(null);
    const [wordG, setWordG] = useState(null);
    const [wordH, setWordH] = useState(null);
    const [wordI, setWordI] = useState(null);
    const [wordJ, setWordJ] = useState(null);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/wordlists', {
                title: title,
                words: [
                    wordA, wordB, wordC, wordD, wordE, wordF, wordG, wordH, wordI, wordJ
                ]
            });
            history.push('/woordenlijsten');
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.error(error);
        }
    }

    return (
        <>
            <div className="body-outer-container">
                <h1>Woordenlijst aanmaken</h1>
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Alle woordenlijsten
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/users')}
                    >
                        Gebruikers
                    </button>
                </section>
                <section className="content-container-row">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">TITEL
                        <input
                            placeholder="Geef jouw lijst een titel"
                            type="text"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>
                    <section>
                    <label htmlFor="wordA">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordA"
                            onChange={(e) => setWordA(e.target.value)}
                            value={wordA}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordB"
                            onChange={(e) => setWordB(e.target.value)}
                            value={wordB}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordC"
                            onChange={(e) => setWordC(e.target.value)}
                            value={wordC}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordD"
                            onChange={(e) => setWordD(e.target.value)}
                            value={wordD}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordE"
                            onChange={(e) => setWordE(e.target.value)}
                            value={wordE}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordF"
                            onChange={(e) => setWordF(e.target.value)}
                            value={wordF}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordG"
                            onChange={(e) => setWordG(e.target.value)}
                            value={wordG}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordH"
                            onChange={(e) => setWordH(e.target.value)}
                            value={wordH}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordI"
                            onChange={(e) => setWordI(e.target.value)}
                            value={wordI}
                        />
                    </label>
                    <label htmlFor="words">
                        <input
                            placeholder="Woord"
                            type="text"
                            id="wordJ"
                            onChange={(e) => setWordJ(e.target.value)}
                            value={wordJ}
                        />
                    </label>
                    </section>
                    <button type="submit">Woordenlijst aanmaken</button>
                </form>
                </section>
            </div>
        </>
    );
}

export default AddWordList;