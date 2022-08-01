import React, {useContext, useEffect, useState} from 'react';
import './ExamInfo.css';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ExamInfoPopUp from "../../components/popup/ExamInfoPopUp";

function ExamInfo() {
    const {user} = useContext(AuthContext);
    const [wordLists, setWordLists] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const history = useHistory();


    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await axios.get('http://localhost:8080/wordlists', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setWordLists(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchLists();
    }, []);


    return (
        <>
            <div className="body-outer-container">
                <section className="content-container-column-exam">
                    <h1>Toets Starten 💪</h1>
                    <section>
                    <h3><strong>Je staat op het punt om een nieuwe toets te starten, {user.profile.firstName}!</strong></h3>
                    <p><i> Lees de instructies van de toets goed door voor je begint, zodat je weet wat je moet doen. </i></p>
                    </section>
                    <section className="exam-exercise-explanation">
                        <ExamInfoPopUp />
                    </section>
                    <section>
                        <h3>Kies een woordenlijst</h3>
                        <table>
                            <thead className="choose-wl">
                            <tr className="choose-wl-tr">
                                <th>Title</th>
                                <th>Selecteer</th>
                            </tr>
                            </thead>
                            <tbody className="choose-wl">
                            {wordLists.map((wl) => {
                                return <tr key={wl.title}>
                                    <td>{wl.title}</td>
                                    <td>
                                        <div id="select-list"> <label htmlFor="select-list">
                                            <input
                                                type="radio"
                                                name="select-list"
                                                onChange={(e) => setSelectedList(wl)}
                                            />
                                        </label></div>
                                    </td>
                                </tr>;
                            })}
                            </tbody>
                        </table>
                    </section>
                    {selectedList.title && <>
                    <strong>Woordenlijst: <i>{selectedList.title}</i>.</strong><p>Ben je er helemaal klaar voor? Dan kan je beginnen!</p>
                        <button
                            type="button"
                            id="btn-start"
                            onClick={
                                // () => history.push(`/toets-maken`)
                                () => history.push({pathname: `/toets-maken`, state: selectedList})
                            }
                        > <span className="text-btn-start">
                            {/*<link to={`/toets-maken`} > Start de toets! </link>*/}
                            Start de toets!
                        </span>
                        </button>
                    </>}
                </section>
            </div>
        </>
    );
}

export default ExamInfo;


