import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
// import './AssignUserToProfile.css';

function AssignUserToProfile({username, profileId}) {
    const history = useHistory();

    // Header: moet na data?? omwisselen?
    async function assignUserToProfile() {
        try {
            const result = await axios.put(`http://localhost:8080/userprofiles/${profileId}/username`, {
                username: username
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            console.log(result.status)
            history.push(`/profiel/${profileId}`);
        } catch (e) {
            console.error(e)
        }
    }

    function handleClickBtn() {
        assignUserToProfile();
    }

    return (
        <>
            <div className="body-inner-container-small">
                <h1>Profiel aangemaakt voor: {username}! 🥳</h1>
                <br></br>
                Ga naar profielpagina: #{profileId} >>
                <section>
                <button
                    type="button"
                    onClick={handleClickBtn}
                >
                    Naar profiel
                </button>
                </section>
            </div>
        </>
    );
}

export default AssignUserToProfile;