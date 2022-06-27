import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './WordListPage.css';

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

    return (
        <>
            <div className="body-outer-container">
                <h1>Woordenlijst: '{wordList.title}'</h1>
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Terug naar alle woordenlijsten
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/users')}
                    >
                        Naar alle gebruikers
                    </button>
                </section>
                <section className="content-container-row">
                    {/*<table>*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>Titel</th>*/}
                    {/*        <th>Aantal Woorden</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {words.map((word) => {*/}
                    {/*        return <tr key={word.}>*/}
                    {/*            <td>{wl.title}</td>*/}
                    {/*            <td>{wl.words.length}</td>*/}
                    {/*        </tr>*/}
                    {/*    })}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </section>
            </div>
        </>
    );
}

export default WordListPage;