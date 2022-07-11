import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import Popup from "../popup/PopUp";
import AssignUserToProfile from "./assignTo/AssignUserToProfile";
// import './CreateEmptyProfile.css';

function CreateEmptyProfile({userObject}) {
    const [profileId, setProfileId] = useState(null);
    const [created, toggleCreated] = useState(false);
    const history = useHistory();


    async function createProfile(e) {
        e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:8080/userprofiles`, {
                firstName: "Voornaam"
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            console.log(result.status)
            console.log(result.data)
            setProfileId(result.data.id)
            //kijken wat je terug krijgt uit data, id opvangen, hieronder in history push stoppen.
            // history.push(`/profiel/${profileId}`);
        } catch (e) {
            console.error(e)
        }
    }

    function handleClickAanmaken() {
        createProfile();
        toggleCreated(true);
    }

    // function handleClickAssign() {
    //     toggleAssign(true)
    // }

    return (
        <>
            <div className="body-inner-container-small">
                <h1>Profielpagina voor <i>{userObject.username}</i> aanmaken</h1>
                <br></br>
                <p><i>{userObject.username}</i> heeft nog geen profiel pagina.</p>
                Maak een profiel pagina aan, zodat deze gebruiker toegang heeft tot de applicatie.
                <section>
                    <button
                        type="button"
                        onClick={handleClickAanmaken}
                    >
                        Aanmaken!
                    </button>
                </section>
                {created &&
                <section >
                    <AssignUserToProfile
                        username={userObject.username}
                        profileId={profileId}
                    />
                </section>
                // <section>
                //     <button
                //         type="button"
                //         onClick={handleClickAssign}
                //     >
                //         Koppel aan gebruiker
                //     </button>
                // </section>
                }
            </div>
        </>
    );
}

export default CreateEmptyProfile;