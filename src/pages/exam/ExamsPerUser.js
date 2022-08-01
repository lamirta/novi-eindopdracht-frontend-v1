import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import './ExamsPerUser.css';
import {AuthContext} from "../../context/AuthContext";
import formatTimeStamp from "../../helpers/formatTimeStamp";

function ExamsPerUser() {
    const {user} = useContext(AuthContext);
    const [profile, setProfile] = useState([]);
    const [exams, setExams] = useState([]);
    const history = useHistory();
    const { id } = useParams();


    useEffect(() => {
        async function fetchExams() {
            try {
                const response = await axios.get(`http://localhost:8080/userprofiles/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setProfile(response.data)
                setExams(response.data.exams)
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchExams();
    }, [exams.length]);


    const format = (timestamp) => {
        return formatTimeStamp(timestamp);
    }

    return (
        <>
            <div className="body-outer-container">
                <h1>Toets Resultaten van: <i>"{profile.firstName} {profile.lastName}"</i></h1>
                <div className="table-container">
                <section className="button-container-column">
                    <span>
                    <button
                        type="button"
                        disabled={profile.id !== user.profileId}
                        onClick={() => history.push(`/toets-starten/${user.profileId}`)}
                    >
                        Nieuwe toets starten
                    </button>
                    <div className="hidden-div-2">Je bent niet ingelogd als {profile.firstName}</div>
                    </span>
                    <button
                        type="button"
                        onClick={() => history.push(`/profiel/${profile.id}`)}
                    >
                        Terug
                    </button>
                </section>
                    {(user.profileId === profile.id || user.role === 'TEACHER') &&
                    <>
                    {!exams[0] ?
                            <span className="exam-user-info">
                                <p className="exam-p"> Nog geen toetsen van {profile.firstName}</p>
                            </span>
                     :
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            {/*<th>Username</th>*/}
                            <th>Woordenlijst</th>
                            <th>Geslaagd</th>
                            <th>Aantal fouten</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exams.map((exam) => {
                            return <tr key={exam.id}>
                                {/*<td>{profile.username.username}</td>*/}
                                <td>{exam.wordList.title}</td>
                                <td>{exam.passed ? "Geslaagd 🎉" : "Gezakt"}</td>
                                <td>{exam.wrongEntries}</td>
                                <td>
                                    {
                                        format(exam.timestamp)
                                    }
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </section>
                    } </>}
                </div>
            </div>
        </>
    );
}

export default ExamsPerUser;