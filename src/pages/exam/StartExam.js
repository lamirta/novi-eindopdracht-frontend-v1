import React, {useContext, useEffect, useState} from 'react';
import './StartExam.css';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Popup from "../../components/popup/PopUp";
import SaveExam from "../../components/exams/SaveExam";
import wordLoop from "../../helpers/WordLoop";


// when userEntry !== indexOf original word.. +1 to wrongEntries counter..?
// get request naar wordlist > make loop voor de array met woorden?
// get request naar authContext.. wie er ingelogd is voor ID?


function StartExam() {
    const {user} = useContext(AuthContext);
    const [userEntry, setUserEntry] = useState(null);
    const [wordList, setWordList] = useState([]);
    const [words, setWords] = useState([]);
    const [endOfExam, setEndOfExam] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [wordIndexNr, setWordIndexNr] = useState(0);
    const [showElement, setShowElement] = useState(true)
    const [consoleError, setConsoleError] = useState('');
    const [wrongEntries, setWrongEntries] = useState(0);
    const [passed, togglePassed] = useState(false);
    const history = useHistory();

    // aparte component functie van maken
    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get('http://localhost:8080/wordlists/dieren', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // for (let i = 0; i < 11; i++) {
                //     setWord(response.data.words[i]);
                // }
                setWordList(response.data)
                setWords(response.data.words)
                setCurrentWord(response.data.words[0])
                console.log(currentWord);
            } catch(e) {
                console.error(e);
            }
        }
        fetchLists();
    }, [wordIndexNr]);


    useEffect(()=>{
            setTimeout(function() {
                setShowElement(false)
            }, 2000);
    }, [wordIndexNr])


    function toNextWord() {
        setCurrentWord(currentWord + 1)
        // const nextWord = currentWord + 1
        // console.log(nextWord)
        // return nextWord;
    }

    function handleClickVolgende() {
        if (wordLoop(words, wordIndexNr) === null) {
            setShowElement(false)
            setEndOfExam(true);
        } else {
            setWordIndexNr(wordIndexNr + 1)
            setShowElement(true)
            setUserEntry('');
        }
        console.log(wordLoop());
    }

    return (
        <>
            <div className="main-exercise-page">
                <header className="exercise-page-header">
                    <h2 className="wordlist-title">Titel Woordenlijst: <span className="wordlist-title-p">"{wordList.title}"</span></h2>
                </header>
                    <div className="container-exercise-wrap">
                        <div className="exercise">
                            <div className="exercise-content">
                                <h1 className="exercise-title">
                                    {showElement ? <span className="text-animation-hide">
                                        {/*{wordLoop()}*/}
                                            {wordLoop(words, wordIndexNr)}
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
                                            disabled={!userEntry}
                                            id="volgende"
                                            onClick={() => handleClickVolgende()}
                                        >
                                            <div className="visual">
                                                <span className="text-exam-btn">volgende</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                {!endOfExam &&
                <Popup>
                    <SaveExam
                        wordList={wordList}
                        wrongEntries={wrongEntries}
                        passed={passed}
                    />
                </Popup> }
            </div>
        </>
    );
}

export default StartExam;



// function wordLoop() {
//     if (words[wordIndexNr] === words[0]){
//         return words[0];
//     } else if (words[wordIndexNr] === words[1]){
//         return words[1];
//     } else if (words[wordIndexNr] === words[2]) {
//         return words[2];
//     } else if (words[wordIndexNr] === words[3]) {
//         return words[3];
//     } else if (words[wordIndexNr] === words[4]) {
//         return words[4];
//     } else if (words[wordIndexNr] === words[5]) {
//         return words[5];
//     } else if (words[wordIndexNr] === words[6]) {
//         return words[6];
//     } else if (words[wordIndexNr] === words[7]) {
//         return words[7];
//     } else if (words[wordIndexNr] === words[8]) {
//         return words[8];
//     } else if (words[wordIndexNr] === words[9]) {
//         return words[9];
//     }
// }