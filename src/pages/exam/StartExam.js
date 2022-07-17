import React, {useContext, useEffect, useState, useRef} from 'react';
import './StartExam.css';
import {useHistory, useLocation} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Popup from "../../components/popup/PopUp";
import SaveExam from "../../components/exams/SaveExam";
import ExamHeader from "../../components/exams/ExamHeader";
import ExamBtnNext from "../../components/exams/ExamBtnNext";
import ExamInfoPopUp from "../../components/popup/ExamInfoPopUp";


// when userEntry !== indexOf original word.. +1 to wrongEntries counter..?


function StartExam() {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();
    const textInput = useRef(null);

    // ExamAnswer related
    const [userEntry, setUserEntry] = useState('');
    // const [userKey, setUserKey] = useState('');

    // UserInput related
    const [title, setTitle] = useState('');
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [wordIndexNr, setWordIndexNr] = useState(0);
    const [letterIndexNr, setLetterIndexNr] = useState(-1);

    // Message & Layout related
    const [endOfExam, setEndOfExam] = useState(false);
    const [showWord, setShowWord] = useState(true);
    const [info, toggleInfo] = useState(false);
    const [error, toggleError] = useState(false);
    const [progress, setProgress] = useState(0);
    const [wordsTotal, setWordsTotal] = useState(0);

    // Properties for saving Exam Object with axios.post
    const [wordList, setWordList] = useState([]);
    const [wrongEntries, setWrongEntries] = useState(0);
    const [passed, togglePassed] = useState(false);


    useEffect(() => {
        setWordList(location.state);
        setTitle(location.state.title);
        setWords(location.state.words);
        setWordsTotal(location.state.words.length);
    }, []);


    useEffect(() => {
        setCurrentWord(location.state.words[wordIndexNr]);
        setProgress((wordIndexNr / wordsTotal) * 100)
        toggleError(false)


        setTimeout(function () {
            setShowWord(false);
        }, 2000); // 2 seconds
    }, [wordIndexNr]);


    useEffect(() => {
        if (!showWord) {
            textInput.current.focus()
            setLetterIndexNr(letterIndexNr + 1)
        }
    }, [showWord]);


    // even controleren in the console wat er precies geregistreerd wordt
    useEffect(() => {
        console.log("useEffect is fired, w/ userEntry dependency");
        console.log("Dit is nu currentWord: " + currentWord);
        console.log("Dit is nu currLetter charAt: " + currentWord.charAt(letterIndexNr));
        // console.log("Dit is nu userKey: " + userKey);
        console.log("Dit is nu userEntry: " + userEntry);
        console.log("Dit is nu letterIndex: " + letterIndexNr);
        console.log("Dit is nu wordIndex: " + wordIndexNr);
        console.log("Dit is nu error: " + error);
    }, [userEntry]);


    function handleKeyDown(e) {
        console.log(e);
        // setUserKey(e.key)
        // console.log("log of userKey(down): " + userKey);
        // errorHandle(e.key)
        // trackErrors()

        if (e.code === "Enter" || e.code === "NumpadEnter" || e.which === 13) {
            console.log("Enter key was pressed.");
            e.preventDefault();
            if (userEntry === currentWord) {
                toNextWord();
            }
        }

        if (e.key !== currentWord.charAt(letterIndexNr)) {
            // setWrongEntries(wrongEntries + 1)
            e.preventDefault()
            toggleError(true)
            addError(e)
        } else {
            setLetterIndexNr(letterIndexNr + 1)
            toggleError(false)
        }

    }

    function toNextWord() {
        if (wordIndexNr > words.length - 2) {
            setEndOfExam(true)
            results()
        } else {
            setWordIndexNr(wordIndexNr + 1);
            setShowWord(true);
            setUserEntry('');
            toggleError(false)
            setLetterIndexNr(-1)
        }
    }


    function errorHandle(userKey) {
        if (userKey !== currentWord.charAt(letterIndexNr)) {
            toggleError(true)

        } else {
            toggleError(false)

        }
    }

    function addError(e) {
        if ((e.key !== "Enter") && e.key !== currentWord.charAt(letterIndexNr)) {
            setWrongEntries(wrongEntries + 1)
            console.log("log wrongEntries: " + wrongEntries);
        }
    }

    function results() {
        if (wrongEntries < 8) {
            togglePassed(true)
        }
    }

    function clickInfo() {
        toggleInfo(!info)
    }


    return (
        <div className="main-exercise-page">
            <ExamHeader title={title} progress={progress} wordsDone={wordIndexNr} wordsTotal={wordsTotal} toggleInfo={clickInfo} />
            <div className="container-exercise-wrap">
                <div className="exercise">
                    <div className="exercise-content">
                        <h1 className="exercise-title">
                            {showWord ? <span className="text-hide">
                                    {currentWord}
                            </span> : <>
                                <label htmlFor="userEntry">
                                    <input
                                        ref={textInput}
                                        autoComplete="off"
                                        placeholder="typ hier jouw antwoord"
                                        className="exam-entry-input"
                                        type="text"
                                        id="userEntry"
                                        onKeyDown={handleKeyDown}
                                        onChange={(e) =>
                                            // setUserEntry(e.target.value.toLowerCase())}
                                            setUserEntry(e.target.value)}

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
                <span>Fouten: {wrongEntries}</span>
            </div>

            {endOfExam &&
            <Popup>
                <SaveExam
                    wordList={wordList}
                    wrongEntries={wrongEntries}
                    passed={passed}
                />
            </Popup>}
            {info &&
            <Popup>
                <div className="content-container-column-fff">
                         {/*"exam-exercise-info-message"*/}
                <ExamInfoPopUp />
                </div>
                <button
                    type="button" onClick={clickInfo}>
                    <span className="text-btn-start">Terug naar de toets!</span>
                </button>
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