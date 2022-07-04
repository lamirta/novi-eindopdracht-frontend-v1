import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import './AddWordList.css';
import {AuthContext} from "../../context/AuthContext";

// TO DO: onderaan een + extra woord button maken, uitzoeken hoe dat werkt met state
// TO DO: for loop maken voor alle worden in 'words' & 'count' in <span>

function AddWordList() {
    const {user} = useContext(AuthContext);
    const [title, setTitle] = useState(null);
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
    const [consoleError, setConsoleError] = useState('');
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/wordlists', {
                title: title,
                words: [
                    wordA, wordB, wordC, wordD, wordE, wordF, wordG, wordH, wordI, wordJ
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            history.push('/woordenlijsten');
        } catch (error) {
            setConsoleError(error.response.data);
            console.log(error.response.data);
            console.error(error);
        }
    }

    return (
        <>
            {user.role !== 'TEACHER' ?
                <div className="content-container-row">
                    <h1 className="error-message"> Sorry, je heb geen toegang tot dit deel van de applicatie 😔 </h1>
                </div> :
                <div className="create-list-outer-container">
                    <h1>Woordenlijst aanmaken</h1>
                    <section>
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
                            Alle gebruikers
                        </button>
                    </section>
                    <section className="content-container-row">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">TITEL
                                <input
                                    placeholder="Geef jouw lijst een titel"
                                    type="text"
                                    id="title"
                                    className={!title ? 'input-error' : ''}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </label>
                            {!title && <p className="error-message">Jouw lijst heeft een titel nodig</p>}
                            <section>
                                <div className="word-container">
                                    <span className="count">1</span>
                                    {/*<div className="input-wrap">*/}
                                    <label htmlFor="wordA">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordA"
                                            onChange={(e) => setWordA(e.target.value)}
                                            value={wordA}
                                        />
                                    </label>
                                    {/*</div>*/}
                                </div>
                                <div className="word-container">
                                    <span className="count">2</span>
                                    <label htmlFor="wordB">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordB"
                                            onChange={(e) => setWordB(e.target.value)}
                                            value={wordB}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">3</span>
                                    <label htmlFor="wordC">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordC"
                                            onChange={(e) => setWordC(e.target.value)}
                                            value={wordC}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">4</span>
                                    <label htmlFor="wordD">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordD"
                                            onChange={(e) => setWordD(e.target.value)}
                                            value={wordD}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">5</span>
                                    <label htmlFor="wordE">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordE"
                                            onChange={(e) => setWordE(e.target.value)}
                                            value={wordE}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">6</span>
                                    <label htmlFor="wordF">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordF"
                                            onChange={(e) => setWordF(e.target.value)}
                                            value={wordF}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">7</span>
                                    <label htmlFor="wordG">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordG"
                                            onChange={(e) => setWordG(e.target.value)}
                                            value={wordG}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">8</span>
                                    <label htmlFor="wordH">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordH"
                                            onChange={(e) => setWordH(e.target.value)}
                                            value={wordH}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">9</span>
                                    <label htmlFor="wordI">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordI"
                                            onChange={(e) => setWordI(e.target.value)}
                                            value={wordI}
                                        />
                                    </label>
                                </div>
                                <div className="word-container">
                                    <span className="count">10</span>
                                    <label htmlFor="wordJ">
                                        <input
                                            placeholder="Woord"
                                            type="text"
                                            id="wordJ"
                                            onChange={(e) => setWordJ(e.target.value)}
                                            value={wordJ}
                                        />
                                    </label>
                                </div>
                            </section>
                            <span>{consoleError && <p className="error-message">{consoleError}</p>}</span>
                            <button
                                type="submit"
                                disabled={!title || !wordA}
                            >
                                Woordenlijst aanmaken
                            </button>
                        </form>
                    </section>
                </div>
            }
        </>
    );
}

export default AddWordList;