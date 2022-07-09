import React, {useContext, useEffect, useState} from 'react';
import './ExamInfo.css';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function ExamInfo({props}) {
    const {user} = useContext(AuthContext);
    const [userEntry, setUserEntry] = useState(null);
    const [wordLists, setWordLists] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [selectedList, setSelectedList] = useState();
    const [words, setWords] = useState([]);
    const [endOfExam, setEndOfExam] = useState(false);
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
                setWords(response.data.words);
                console.log(response.data);
                console.log(selectedList);
            } catch (e) {
                console.error(e);
            }
        }
        fetchLists();
    }, [selectedList]);


    return (
        <>
            <div className="body-outer-container">
                <section className="content-container-column-fff">
                    <h1>Toets Starten 💪</h1>
                    <section>
                    <strong>Je staat op het punt om een nieuwe toets te starten, {user.profile.firstName}!</strong>
                    <p><i> Lees de instructies van de toets goed door voor je begint, zodat je weet wat je moet doen. </i></p>
                    </section>

                    <section>
                    <h3>Uitleg</h3>
                    <p>Je kiest een woordenlijst en gaat daar een toets mee maken. De woorden uit de woordenlijst
                        zijn kort in beeld te zien en verdwijnen dan weer. Zodra het woord uit beeld is, verschijnt
                        er een invoerveld waar jij het woord kan natypen. Je kan pas op de "volgende" knop drukken,
                        wanneer het woord goed is ingevuld.
                        Als je een foute letter intypt, komt deze niet in beeld. Zo krijg je het woord pas te zien als
                    alles goed gespeld is! Wel telt een foute letter als 1 fout.
                        Als alle woorden geweest zijn, zie je of je de toets gehaald hebt. Je slaagd als je onder de 8
                        fouten blijft.
                    </p>
                    </section>

                    <section className="choose-wl">
                        <h3>Kies een woordenlijst</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Selecteer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {wordLists.map((wl) => {
                                return <tr key={wl.title}>
                                    <td>{wl.title}</td>
                                    <td>
                                        <div id="select-list"> <label htmlFor="select-list">
                                            <input
                                                type="radio"
                                                name="select-list"
                                                onChange={(e) => setSelectedList(wl.title)}
                                            />
                                        </label></div>
                                    </td>
                                </tr>;
                            })}
                            </tbody>
                        </table>
                    </section>
                    {selectedList && <>
                    <p>Ben je er helemaal klaar voor? Dan kan je beginnen!</p>
                        <button
                            type="button"
                            id="btn-start"
                            onClick={() => history.push(`/toets-maken`)}
                        > <span className="text-btn-start">Start de toets!</span>
                        </button>
                    </>}
                </section>
            </div>
        </>
    );
}

export default ExamInfo;


