import React, {useContext, useEffect, useState} from 'react';
import './AllExams.css';
import {useHistory} from "react-router-dom";
import axios from "axios";
import ButtonContainer from "../../components/container/ButtonContainer";
import {AuthContext} from "../../context/AuthContext";
import formatTimeStamp from "../../helpers/formatTimeStamp";

function AllExams() {
    const {user} = useContext(AuthContext);
    const [exams, setExams] = useState([]);
    const [confirmDelete, toggleConfirmDelete] = useState(false);
    const history = useHistory();

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


    function clickDelete() {
        toggleConfirmDelete(!confirmDelete);
    }


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
                        onClick={() => history.push(`/toets-starten/${user.profileId}`)}
                    >
                        Nieuwe toets starten
                    </button>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Toets #</th>
                            <th>Username</th>
                            <th>Woordenlijst</th>
                            <th>Geslaagd</th>
                            <th>Aantal fouten</th>
                            <th>Timestamp</th>
                            {/*<th>Verwijderen</th>*/}
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
                                <td>{formatTimeStamp(exam.timestamp)}</td>
                                {/*<td><button*/}
                                {/*    type="button"*/}
                                {/*    id="delete"*/}
                                {/*    onClick={clickDelete}*/}
                                {/*>*/}
                                {/*     Verwijder toets*/}
                                {/*</button>*/}
                                {/*</td>*/}
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


export default AllExams;