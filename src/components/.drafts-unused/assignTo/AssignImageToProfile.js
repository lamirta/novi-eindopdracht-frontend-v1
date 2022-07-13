import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
// import './AssignImageToProfile.css';

function AssignImageToProfile({imageId, profileId}) {
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [confirmAssign, toggleConfirmAssign] = useState(false);
    const history = useHistory();

//     Image Page moet een component zijn IN profile page...

    function handleImageChange(e) {
        // Sla het gekozen bestand op
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        // Sla het gekozen bestand op in de state
        setFile(uploadedFile);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function assignImgToProfile(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.put(`http://localhost:8080/userprofiles/${profileId}/image`, formData,
                {
                headers: {
                    "Content-Type": "multipart/form-data",
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
        assignImgToProfile();
    }

    return (
        <>
        <div className="body-inner-container-small">
            <h1>Afbeelding aan jouw profiel koppelen</h1>
            Wil je deze afbeelding als jouw profielfoto instellen?
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

export default AssignImageToProfile;