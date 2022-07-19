import React, {useEffect, useState} from 'react';
// import './DeleteUser.css';
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";

function DeleteUser({profileId, togglePopup}) {
    const { username } = useParams();
    const history = useHistory();

    // useEffect(() => { niet de oplossing
    async function deleteUserAndProfile() {
        try {
            const result = await axios.delete(`http://localhost:8080/userprofiles/${profileId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status)
            history.push(`/users`);
        } catch (e) {
            console.error(e)
        }
    }

    function handleClickDelete() {
        deleteUserAndProfile();
        togglePopup()
    }


    return (
        <>
                <h1>Account Verwijderen</h1>
                <br></br>
                Weet je zeker dat je <i>dit profiel</i> wilt verwijderen? Het hele account van deze gebruiker wordt daarmee verwijderd
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

export default DeleteUser;

