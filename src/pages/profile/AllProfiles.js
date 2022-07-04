import React, {useEffect, useState} from 'react';
// import './AllProfiles.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ButtonContainer from "../../components/container/ButtonContainer";

function AllProfiles() {
    const history = useHistory();
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        async function fetchProfiles() {
            try {
                const response = await axios.get(`http://localhost:8080/userprofiles`,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUserProfiles(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }

        fetchProfiles();
    }, []);

    return (
        <>
            <div className="body-outer-container">
                <h1>Alle gebruiker profielen</h1>
                <section className="table-container">
                    <section>
                        <ButtonContainer />
                    </section>
                    <section>
                        <button
                        >
                            Profiel zoeken
                        </button>
                        <button
                        >
                            Profiel aanpassen
                        </button>
                        <button
                        >
                            Profiel verwijderen
                        </button>
                    </section>
                    <section className="content-container-row">
                        <table>
                            <thead>
                            <tr>
                                <th>Ga naar profiel</th>
                                <th>ID</th>
                                <th>Naam</th>
                                <th>Leeftijd</th>
                                <th>School</th>
                                <th>Gebruikersrol</th>
                                <th>Username</th>
                                <th>E-mailadres</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userProfiles.map((up) => {
                                return <tr key={up.id}>
                                    <td><button
                                        type="button"
                                        onClick={() => history.push(`/profile/${up.id}`)}
                                    >
                                        Naar profielpagina
                                    </button></td>
                                    <td>{up.id}</td>
                                    <td>{up.firstName + " " + up.lastName}</td>
                                    <td>{up.age}</td>
                                    <td>{up.school}</td>
                                    <td>
                                        {(() => {
                                            switch (up.username.authorities[0].authority) {
                                                case "STUDENT":
                                                    return " Leerling";
                                                case "TEACHER":
                                                    return " Docent";
                                                // case "ADMIN":
                                                //     return " Admin";
                                                default:
                                                    return " Undefined";
                                            }
                                        })()}
                                    </td>
                                    <td>{up.username.username}</td>
                                    <td>{up.username.email}</td>
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

export default AllProfiles;