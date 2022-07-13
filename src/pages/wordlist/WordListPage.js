import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
import './WordListPage.css';
import {AuthContext} from "../../context/AuthContext";
import Popup from "../../components/popup/PopUp";
import DeleteWordList from "../../components/delete/DeleteWordList";

function WordListPage() {
    const {user, auth} = useContext(AuthContext);
    const [wordList, setWordList] = useState([]);
    const [words, setWords] = useState([]);
    const [confirmDelete, toggleConfirmDelete] = useState(false);
    const history = useHistory();
    const { title } = useParams();

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get(`http://localhost:8080/wordlists/${title}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
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

    function clickDelete() {
        toggleConfirmDelete(!confirmDelete);
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
                        disabled={user.role !== 'TEACHER'}
                        onClick={clickDelete}
                    >
                        Verwijder deze lijst
                    </button>
                    <div className="hidden-div">Sorry, geen toegang 😔</div>
                </section>
                <section className="content-container-row">
                    <div className="content-container-row-page-list">
                        {mapWords()}
                    </div>
                </section>
                {confirmDelete &&
                <Popup>
                    <DeleteWordList
                        togglePopup={clickDelete}
                    />
                </Popup>
                }
            </div>
        </>
    )
}

export default WordListPage;