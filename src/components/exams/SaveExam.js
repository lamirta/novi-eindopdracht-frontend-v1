import React, {useState} from 'react';
// import './SaveExam.css';
import axios from "axios";

function SaveExam({assignToProfile, imageId, profileId}) {
    const [confirmAssign, toggleConfirmAssign] = useState(false);

//     Image Page moet een component zijn IN profile page...

    // useEffect(() => {
    async function assignImgToProfile() {
        try {
            const result = await axios.put(`http://localhost:8080/userprofiles/${profileId}/profilepic`, {
                id: imageId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            console.log(result.status)
        } catch (e) {
            console.error(e)
        }
    }
    //     assignImgToProfile();
    // }, []);

    function handleClickBtn() {
        assignImgToProfile();
    }

    return (
        <>
            <div className="body-inner-container-small">
                <h1>Afbeelding aan jouw profiel koppelen</h1>
                <p>Wil je deze afbeelding als jouw profielfoto instellen?</p>
                <section>
                    <label htmlFor="assign-img-profile">
                        <input
                            type="checkbox"
                            name="assign-img-profile-chkbx"
                            id="assign-img-profile"
                            checked={confirmAssign}
                            onChange={() => toggleConfirmAssign(!confirmAssign)} />
                    </label>
                    <p>Ja!</p>
                </section>
                <button
                    type="button"
                    disabled={!confirmAssign}
                    onClick={handleClickBtn}
                >
                    Instellen
                </button>
            </div>
        </>
    );
}

export default SaveExam;