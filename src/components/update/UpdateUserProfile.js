import React, {useState} from 'react';
import axios from "axios";

function UpdateUserProfile({profileId, name, togglePopup}) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState(null);
    const [school, setSchool] = useState();


    async function updateUserProfile() {
        try {
            const result = await axios.put(`http://localhost:8080/userprofiles/${profileId}`, {
                firstName: firstName,
                lastName: lastName,
                age: age,
                school: school,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status);
        } catch (e) {
            console.error(e);
        }
    }

    function handleSubmit() {
        updateUserProfile();
        togglePopup();
    }

    return (
        <>
            <h1>Update Profiel</h1>
            {!name ? "Deze profielpagina is nog erg leeg, vul alvast een voornaam in 👏"
                : <>"Update dit profiel 👏"
                    <button
                        type="button"
                        onClick={togglePopup}
                    >
                        Terug
                    </button>
                </>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">Voornaam
                        <input
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </label>
                    {!firstName && <><p className="error-message">Vul een voornaam in</p></>}
                    <label htmlFor="lastName">Achternaam
                        <input
                            type="text"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </label>
                    <label htmlFor="age">Leeftijd
                        <input
                            type="text"
                            pattern="[0-9]*"
                            id="age"
                            onChange={(e) =>
                                setAge((a) => (e.target.validity.valid ? e.target.value : a))
                            }
                            value={age}
                        />
                    </label>
                    <label htmlFor="school">School
                        <input
                            type="text"
                            id="school"
                            onChange={(e) => setSchool(e.target.value)}
                            value={school}
                        />
                    </label>
                    <br></br>
                    <button
                        type="submit"
                        disabled={!firstName}
                    >Update
                    </button>
                </form>
        </>
    );
}

export default UpdateUserProfile;