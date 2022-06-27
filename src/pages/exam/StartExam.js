import React, {useEffect, useState} from 'react';
import './StartExam.css';
import {useHistory} from "react-router-dom";
import axios from "axios";


// when userEntry !== indexOf original word.. +1 to wrongEntries counter..?
// get request naar wordlist > make loop voor de array met woorden?
// get request naar authContext.. wie er ingelogd is voor ID?


function StartExam() {
    const [userEntry, setUserEntry] = useState(null);
    const [words, setWords] = useState([]);
    const [animalName, setAnimalName] = useState(0);
    const [showElement, setShowElement] = useState(true)

    const [wrongEntries, setWrongEntries] = useState(null);
    const [passed, togglePassed] = useState(false);
    const [userProfileID, setUserProfileID] = useState(null);
    const [wordListTitle, setWordListTitle] = useState(null);
    const [consoleError, setConsoleError] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get('http://localhost:8080/wordlists/dieren');
                // for (let i = 0; i < 11; i++) {
                //     setWord(response.data.words[i]);
                // }
                setWordListTitle(response.data.title.toUpperCase());
                setWords(response.data.words);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchLists();
    }, [animalName]);


    useEffect(()=>{
            setTimeout(function() {
                setShowElement(false)
            }, 4000);
    }, [animalName])


    function animalNames() {
        if (words[animalName] === 'aap'){
            return 'aap';
        } else if (words[animalName] === 'slang'){
            return 'slang';
        } else if (words[animalName] === 'kat') {
            return 'kat';
        } else if (words[animalName] === 'vogel') {
            return 'vogel';
        } else if (words[animalName] === 'eekhoorn') {
            return 'eekhoorn';
        } else if (words[animalName] === 'tijger') {
            return 'tijger';
        } else if (words[animalName] === 'dolfijn') {
            return 'dolfijn';
        }
    }

    function handleClick() {
        setAnimalName(animalName + 1)
        setShowElement(true)
        setUserEntry('');
        console.log(animalNames());
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/exams', {
                wrongEntries: wrongEntries,
                passed: passed,
                userProfile: userProfileID,
                wordList: wordListTitle,
            });
            history.push('/toetsen');
        } catch (error) {
            setConsoleError(error.response.data);
            console.log(error.response.data);
            console.error(error);
        }
    }

    return (
        <>
            <div className="main-exercise-page">
                <header className="exercise-page-header">
                    <h2 className="wordlist-title">Titel Woordenlijst: <span className="wordlist-title-p">"{wordListTitle}"</span></h2>
                </header>
                <div className="container-exercise-wrap">
                <div className="exercise">
                    <div className="exercise-content">
                        <h1 className="exercise-title">
                            {showElement ? <span className="text-animation-hide"> {animalNames()}
                            </span> : <>
                                <label htmlFor="userEntry">
                                    <input
                                        placeholder="typ hier jouw antwoord"
                                        className="exam-entry-input"
                                        type="text"
                                        id="userEntry"
                                        onChange={(e) => //HandleChange function met log in console && vang in variable die weer vergelijkt met woord..??
                                            setUserEntry(e.target.value.toLowerCase())}
                                        value={userEntry}
                                    />
                                </label>
                                <span className="typo-msg">
                                {/*{userEntry !== words && <p className="error-message">Dat is niet de goede letter, probeer nog eens</p>}*/}
                                </span>
                            </>}
                        </h1>
                    {/*    Hier label userEntry neerzetten als het niet lukt met elke keer vernieuwen na word change*/}
                    </div>
                    <div className="exercise-bottom-bar">
                        <div className="btn-block">
                            {/*HIER NOG TERNARY RESPONSE MESSAGE IF WRONG LETTER*/}
                            <div className="btn-right">
                                <button
                                    type="button"
                                    // disabled={userEntry !== words}
                                    id="volgende"
                                    // onClick={(e) => setAnimalName(animalName + 1)}
                                    onClick={() => handleClick()}
                                >
                                    <div className="visual"><span className="text-exam-btn">volgende</span></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>


            {/*<header></header>*/}
            {/*<div className="create-list-outer-container">*/}
            {/*    <h1>TOETS MAKEN</h1>*/}
            {/*    <section className="content-container-row">*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            onClick={() => history.push('/toetsen')}*/}
            {/*        >*/}
            {/*            Alle toets resultaten*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            onClick={() => history.push('/users')}*/}
            {/*        >*/}
            {/*            Gebruikers*/}
            {/*        </button>*/}
            {/*    </section>*/}
            {/*    <section className="content-container-row">*/}
            {/*        <form onSubmit={handleSubmit}>*/}
            {/*            /!*<label htmlFor="title">TITEL*!/*/}
            {/*            /!*    <input*!/*/}
            {/*            /!*        placeholder="Geef jouw lijst een titel"*!/*/}
            {/*            /!*        type="text"*!/*/}
            {/*            /!*        id="title"*!/*/}
            {/*            /!*        className={!title ? 'input-error' : ''}*!/*/}
            {/*            /!*        onChange={(e) => setTitle(e.target.value)}*!/*/}
            {/*            /!*        value={title}*!/*/}
            {/*            /!*    />*!/*/}
            {/*            /!*</label>*!/*/}
            {/*            /!*{!title && <p className="error-message">Jouw lijst heeft een titel nodig</p>}*!/*/}
            {/*            <section>*/}
            {/*                <div className="word-container">*/}
            {/*                    <span className="count">1</span>*/}
            {/*                    /!*<div className="input-wrap">*!/*/}
            {/*                    <label htmlFor="wrongEntries">*/}
            {/*                        <input*/}
            {/*                            placeholder="Woord"*/}
            {/*                            type="text"*/}
            {/*                            id="wrongEntries"*/}
            {/*                            onChange={(e) => setWrongEntries(e.target.value)}*/}
            {/*                            value={wrongEntries}*/}
            {/*                        />*/}
            {/*                    </label>*/}
            {/*                    /!*</div>*!/*/}
            {/*                </div>*/}
            {/*                <div className="word-container">*/}
            {/*                    <span className="count">2</span>*/}
            {/*                    <label htmlFor="passed">*/}
            {/*                        <input*/}
            {/*                            placeholder="Woord"*/}
            {/*                            type="text"*/}
            {/*                            id="passed"*/}
            {/*                            onChange={(e) => togglePassed(e.target.value)}*/}
            {/*                            value={passed}*/}
            {/*                        />*/}
            {/*                    </label>*/}
            {/*                </div>*/}
            {/*                <div className="word-container">*/}
            {/*                    <span className="count">3</span>*/}
            {/*                    <label htmlFor="userProfileID">*/}
            {/*                        <input*/}
            {/*                            placeholder="Woord"*/}
            {/*                            type="text"*/}
            {/*                            id="userProfileID"*/}
            {/*                            onChange={(e) => setUserProfileID(e.target.value)}*/}
            {/*                            value={userProfileID}*/}
            {/*                        />*/}
            {/*                    </label>*/}
            {/*                </div>*/}
            {/*                <div className="word-container">*/}
            {/*                    <span className="count">4</span>*/}
            {/*                    <label htmlFor="wordListTitle">*/}
            {/*                        <input*/}
            {/*                            placeholder="Woord"*/}
            {/*                            type="text"*/}
            {/*                            id="wordListTitle"*/}
            {/*                            onChange={(e) => setWordListTitle(e.target.value)}*/}
            {/*                            value={wordListTitle}*/}
            {/*                        />*/}
            {/*                    </label>*/}
            {/*                </div>*/}

            {/*            </section>*/}
            {/*            <span>{consoleError && <p className="error-message">{consoleError}</p>}</span>*/}
            {/*            <button*/}
            {/*                type="submit"*/}
            {/*                // disabled={!title || !wordA}*/}
            {/*            >*/}
            {/*                Examen gemaakt*/}
            {/*            </button>*/}
            {/*        </form>*/}
            {/*    </section>*/}
            {/*</div>*/}
        </>
    );
}

export default StartExam;