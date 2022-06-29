import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
import './WordListPage.css';

function WordListPage() {
    const [wordList, setWordList] = useState([]);
    const [words, setWords] = useState([]);
    const history = useHistory();
    const { title } = useParams();

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get(`http://localhost:8080/wordlists/${title}`);
                setWordList(response.data);
                setWords(response.data.words);
                console.log(response.data);
            } catch(e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchLists();
    }, []);

    function mapWords() {
        const listItems = words.map((word) =>
            <li>{word}</li>
        );
        return (
            <ol>{listItems}</ol>
        );
    }
    // propertiesMap.forEach((key, value) -> System.out.printf("%s=%s%n", key, value));

    async function handleDelete(e) {
        // e.preventDefault();
        // try {
        //     await axios.post('http://localhost:8080/exams', {
        //         wrongEntries: wrongEntries,
        //         passed: passed,
        //         userProfile: userProfileID,
        //         wordList: wordListTitle,
        //     });
        //     history.push('/toetsen');
        // } catch (error) {
        //     setConsoleError(error.response.data);
        //     console.log(error.response.data);
        //     console.error(error);
        // }
    }

    return (
        <>
            <div className="body-outer-container">
                <h1>Titel woordenlijst: <i>'{wordList.title}'</i></h1>
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Terug naar alle woordenlijsten
                    </button>
                    <button
                        type="button"
                        id="delete"
                        onClick={() => handleDelete()}
                    >
                        Verwijder deze lijst
                    </button>
                </section>
                <section className="content-container-row">
                    <div className="content-container-row-page-list">
                        {mapWords()}
                    </div>
                </section>
            </div>
        </>
    )
}

export default WordListPage;