import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './DeleteWordList.css';

function DeleteWordList({togglePopup}) {
    const { title } = useParams();
    const history = useHistory();


    async function deleteWordList() {
        try {
            const result = await axios.delete(`http://localhost:8080/wordlists/${title}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status)
            history.push('/woordenlijsten');
        } catch (e) {
            console.error(e)
        }
    }

    function handleClickDelete() {
        deleteWordList();
        togglePopup()
    }


    return (
        <>
            <h1>Woordenlijst Verwijderen</h1>
            <br></br>
            Weet je zeker dat je woordenlijst: <i>"{title}"</i> wilt verwijderen?
            <section>
                <button
                    type="button"
                    onClick={togglePopup}
                >
                    Nee, terug
                </button>
                <button
                    type="button"
                    id="delete"
                    onClick={handleClickDelete}
                >
                    Verwijderen
                </button>
            </section>
        </>
    );
}

export default DeleteWordList;