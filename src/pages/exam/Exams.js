import React, {useEffect, useState} from 'react';
import './Exams.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function Exams() {
    const history = useHistory();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8080/exams');
                setExams(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchUsers();
    }, []);

    return (
        <>
            <div className="body-outer-container">
                <h1>Toetsen</h1>
                <section className="content-container-row">
                    <button
                        type="button"
                        onClick={() => history.push('/users')}
                    >
                        Nieuwe toets starten (users)
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/')}
                    >
                        Home
                    </button>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Ga naar Toets</th>
                            <th>Toets ID</th>
                            <th>Username</th>
                            <th>Woordenlijst</th>
                            <th>Geslaagd</th>
                            <th>Aantal fouten</th>
                            <th>Timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exams.map((exam) => {
                            return <tr key={exam.id}>
                                <td><Link to="/profile">Klik</Link></td>
                                <td>{exam.id}</td>
                                <td>{exam.userProfile.username.username}</td>
                                <td>{exam.wordList.title}</td>
                                <td>{exam.passed ? "Geslaagd" : "Gezakt"}</td>
                                <td>{exam.wrongEntries}</td>
                                <td>klopt niet {exam.timestamp}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}

export default Exams;