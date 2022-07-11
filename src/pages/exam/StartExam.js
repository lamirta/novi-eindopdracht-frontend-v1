import React, {useContext, useEffect, useState} from 'react';
import './StartExam.css';
import {useHistory, useLocation} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Popup from "../../components/popup/PopUp";
import SaveExam from "../../components/exams/SaveExam";
import ExamHeader from "../../components/exams/ExamHeader";
import ExamBtnNext from "../../components/exams/ExamBtnNext";


// when userEntry !== indexOf original word.. +1 to wrongEntries counter..?
// get request naar wordlist > make loop voor de array met woorden?
// get request naar authContext.. wie er ingelogd is voor ID?


function StartExam() {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    // ExamAnswer related
    const [userEntry, setUserEntry] = useState('');
    const [userKey, setUserKey] = useState('');

    // UserInput related
    const [title, setTitle] = useState('');
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(location.state.words[wordIndexNr]);
    const [wordIndexNr, setWordIndexNr] = useState(0);
    const [currentLetter, setCurrentLetter] = useState(location.state.words[0].charAt(letterIndexNr));
    const [letterIndexNr, setLetterIndexNr] = useState(0);

    // Message & Layout related
    const [endOfExam, setEndOfExam] = useState(false);
    const [showWord, setShowWord] = useState(true);
    const [error, toggleError] = useState(false);
    const [consoleError, setConsoleError] = useState('');

    // Properties for saving Exam Object with axios.post
    const [wordList, setWordList] = useState([]);
    const [wrongEntries, setWrongEntries] = useState(0);
    const [passed, togglePassed] = useState(false);


    useEffect(() => {
        setWordList(location.state);
        setTitle(location.state.title);
        setWords(location.state.words);
        // setCurrentWord(location.state.words[0]);
        // setCurrentLetter(location.state.words[0].charAt(0))
        // setCurrentWord(location.state.words[wordIndexNr]);
        // setCurrentLetter(currentWord.charAt(letterIndexNr));
    }, [wordIndexNr]);


    useEffect(() => {
        setTimeout(function () {
            setShowWord(false);
        }, 2000); // 2 seconds
    }, [wordIndexNr]);


    // even controleren in the console wat er precies geregistreerd wordt
    useEffect(() => {
        console.log("useEffect gaat of, userEntry dependency");
        console.log("Dit is nu currentWord: " + currentWord);
        console.log("Dit is nu currentLetter: " + currentLetter);
        console.log("Dit is nu userKey: " + userKey);
        console.log("Dit is nu letterIndex: " + letterIndexNr);
        // console.log("Dit is nu currentLetter: " + currentWord.charAt(letterIndexNr));
    }, [userEntry]);


    function toNextWord() {
        if (wordIndexNr > words.length - 2) {
            setEndOfExam(true)
            results()
        } else {
            setWordIndexNr(wordIndexNr + 1);
            setShowWord(true);
            setUserEntry('');
            setLetterIndexNr(0)
        }
    }

    function handleInputChange(e) {
        setUserKey(e.key)
        errorHandle(userKey)
    }

    function errorHandle(userKey) {
        if (userKey !== currentLetter) {
            toggleError(!error)
        }
        // setLetterIndexNr(letterIndexNr + 1)
    }


    function trackErrors() {

        setWrongEntries(wrongEntries + 1)
    }

    function results() {
        if (wrongEntries < 8) {
            togglePassed(true)
        }
    }


    return (
        <div className="main-exercise-page">
            <ExamHeader title={title}/>
            <div className="container-exercise-wrap">
                <div className="exercise">
                    <div className="exercise-content">
                        <h1 className="exercise-title">
                            {showWord ? <span className="text-animation-hide">
                                    {currentWord}
                            </span> : <>
                                <label htmlFor="userEntry">
                                    <input
                                        placeholder="typ hier jouw antwoord"
                                        className="exam-entry-input"
                                        type="text"
                                        id="userEntry"
                                        onKeyPress={handleInputChange}
                                        onChange={(e) =>
                                            //HandleChange function met log in console && vang in variable die weer vergelijkt met woord..??
                                        // KeyPress() ??
                                            setUserEntry(e.target.value.toLowerCase())}
                                        value={userEntry}
                                    />
                                </label>
                                <span className="typo-msg">
                                {error && <p className="error-message">Dat is niet de goede letter, probeer nog eens</p>}
                                </span>
                            </>}
                        </h1>
                        {/*    Hier label userEntry neerzetten als het niet lukt met elke keer vernieuwen na word change*/}
                    </div>
                    <ExamBtnNext
                        userEntry={userEntry}
                        currentWord={currentWord}
                        toNextWord={toNextWord}
                    />
                </div>
            </div>

            {endOfExam &&
            <Popup>
                <SaveExam
                    wordList={wordList}
                    wrongEntries={wrongEntries}
                    passed={passed}
                />
            </Popup>}
        </div>
    );
}

export default StartExam;


// function handleClickVolgende() {
//     if (wordLoop(words, wordIndexNr) === null) {
//         setShowWord(false);
//         setEndOfExam(true);
//     } else {
//         setWordIndexNr(wordIndexNr + 1);
//         setShowWord(true);
//         setUserEntry('');
//     }
//     console.log(wordLoop());
// }

//             // for (let i = 0; i < 11; i++) {
//             //     setWord(response.data.words[i]);
//             // }