import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './MyExams.css';

function MyExams() {
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
    }, []);

    return (
        <>
            <div className="body-outer-container">
                <h1>Toets Resultaten van: <i>"{profile.firstName} {profile.lastName}"</i></h1>
                <div className="table-container">
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/toets-maken')}
                    >
                        Nieuwe toets starten
                    {/*    Hier een pop up maken, vragen welke woordenlijst..*/}
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push(`/profile/${profile.id}`)}
                    >
                        Terug
                    </button>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            {/*<th>Toets ID</th>*/}
                            {/*<th>Jouw username</th>*/}
                            <th>Woordenlijst</th>
                            <th>Geslaagd</th>
                            <th>Aantal fouten</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exams.map((exam) => {
                            return <tr key={exam.id}>
                                {/*<td>{exam.id}</td>*/}
                                {/*<td>{profile.username.username}</td>*/}
                                <td>{exam.wordList.title}</td>
                                <td>{exam.passed ? "Geslaagd 🎉" : "Gezakt"}</td>
                                <td>{exam.wrongEntries}</td>
                                <td> TO DO{exam.timestamp}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </section>
                </div>
            </div>
        </>
    );
}

export default MyExams;