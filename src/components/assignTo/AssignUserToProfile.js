import React, {useState} from 'react';
import axios from "axios";
// import './AssignUserToProfile.css';

function AssignUserToProfile({assignToProfile, username, profileId}) {
    // const { profileId } = useParams();
    const [confirmAssign, toggleConfirmAssign] = useState(false);
    const [clicked, toggleClicked] = useState(false);

// Waar krijgt hij de profile ID vandaan?
//     Image Page moet een component zijn IN profile page..


    // Header: moet na data?? omwisselen?
    async function assignUserToProfile() {
        try {
            await axios.put(`http://localhost:8080/userprofiles/${profileId}/username`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                username: username,
            })
            assignToProfile();
        } catch (e) {
            console.error(e)
        }
    }

    function handleClick() {
        // toggleClicked(!clicked);
        assignUserToProfile()
    }

    return (
        <>
            <div className="body-inner-container-small">
                <h1>Afbeelding aan jouw profiel koppelen</h1>
                <p>Wil je deze afbeelding als jouw profielfoto instellen?</p>
                <section>
                    <input
                        type="checkbox"
                        name="assign-img-profile"
                        id="assign-img-profile"
                        checked={confirmAssign}
                        onChange={() => toggleConfirmAssign(!confirmAssign)}
                    />
                    <p>Ja!</p>
                </section>
                <button
                    type="button"
                    disabled={!clicked}
                    onClick={handleClick}
                >
                    Instellen
                </button>
            </div>
        </>
    );
}

export default AssignUserToProfile;