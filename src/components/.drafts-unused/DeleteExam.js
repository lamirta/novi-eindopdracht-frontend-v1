import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

function DeleteExam({examId, togglePopup}) {
    const history = useHistory();


    async function deleteExam() {
        try {
            const result = await axios.delete(`http://localhost:8080/wordlists/${examId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status)
            history.push('/toetsen');
        } catch (e) {
            console.error(e)
        }
    }

    function handleClickDelete() {
        deleteExam();
        togglePopup()
    }


    return (
        <>
            <h1>Toets Verwijderen</h1>
            <br></br>
            Weet je zeker dat je toets:  <i>"{examId}"</i> wilt verwijderen?
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

export default DeleteExam;