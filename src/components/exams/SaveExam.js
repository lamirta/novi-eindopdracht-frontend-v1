import React, {useContext, useState} from 'react';
// import './SaveExam.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

function SaveExam({wordList, wrongEntries, passed}) {
    const {user} = useContext(AuthContext);
    // const [confirmAssign, toggleConfirmAssign] = useState(false);
    const history = useHistory();


    async function saveExam() {
        // e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/exams', {
                wrongEntries: wrongEntries,
                passed: passed,
                userProfile: user.profile,
                wordList: wordList,
            }, {
            headers: {
                "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
            console.error(error);
        }
    }

    function handleClickResults() {
        saveExam()
        history.push(`/toetsen-van/${user.profileId}`);
    }

    function handleClickProfile() {
        saveExam()
        history.push(`/profiel/${user.profileId}`);
    }

    return (
        <>
            <div className="body-inner-container-small">
                <h1>GOED GEDAAN!! 🥳</h1>
                <p>Einde van de toets. Bekijk je resultaten:</p>
             <section>
            <h3>Aantal fouten: "{wrongEntries}"</h3>
            <p>{!passed && "Blijf onder de 10 fouten om te slagen"}<strong>{passed && "Geslaagd!!! 🎉"}</strong></p>
             </section>
                <div className="body-inner-container-wide">
                <button
                    type="button"
                    onClick={handleClickResults}
                >
                    Naar al mijn toetsen
                </button>
                <button
                    type="button"
                    onClick={handleClickProfile}
                >
                    Naar mijn profiel
                </button>
                </div>
            </div>
        </>
    );
}

export default SaveExam;

//Assign To ..
// async function assignProfileToExam() {
//     try {
//         const result = await axios.put(`http://localhost:8080/exams/${examId}/profileId`, {
//             id: profileId
//         }, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             },
//         })
//         console.log(result.status)
//     } catch (e) {
//         console.error(e)
//     }
// }