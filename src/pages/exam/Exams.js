import React, {useEffect, useState} from 'react';
import './Exams.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ButtonContainer from "../../components/container/ButtonContainer";

function Exams() {
    const history = useHistory();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function fetchExams() {
            try {
                const response = await axios.get('http://localhost:8080/exams',{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setExams(response.data)
                console.log(response.data)
            } catch(e) {
                console.error(e);
            }
        }
        fetchExams();
    }, []);

    return (
        <>
            <div className="body-outer-container">
                <h1>Toetsen</h1>
                <section className="table-container">
                    <section>
                        <ButtonContainer />
                    </section>
                <section>
                    <button
                        type="button"
                        onClick={() => history.push('/toets-maken')}
                    >
                        Nieuwe toets starten
                    </button>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Toets ID</th>
                            <th>Username</th>
                            <th>Woordenlijst</th>
                            <th>Geslaagd</th>
                            <th>Aantal fouten</th>
                            {/*<th>Timestamp</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {exams.map((exam) => {
                            return <tr key={exam.id}>
                                <td>{exam.id}</td>
                                <td>{exam.userProfile.username.username}</td>
                                <td>{exam.wordList.title}</td>
                                <td>{exam.passed ? "Geslaagd" : "Gezakt"}</td>
                                <td>{exam.wrongEntries}</td>
                                {/*<td>klopt niet {exam.timestamp}</td>*/}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </section>
             </section>
            </div>
        </>
    );
}


export default Exams;