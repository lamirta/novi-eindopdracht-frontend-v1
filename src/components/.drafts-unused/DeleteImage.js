import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";


// To Be Implemented
function DeleteImage({imageId, togglePopup}) {
    // const { title } = useParams();
    const history = useHistory();


    async function deleteImg() {
        try {
            const result = await axios.delete(`http://localhost:8080/images/${imageId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status)
            // history.push('/userprofiles');
        } catch (e) {
            console.error(e)
        }
    }

    function handleClickDelete() {
        deleteImg();
        togglePopup()
    }


    return (
        <>
            <h1>Afbeelding Verwijderen</h1>
            <br></br>
            Weet je zeker dat je deze afbeelding wilt verwijderen?
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

export default DeleteImage;