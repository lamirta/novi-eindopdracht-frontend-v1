import React, {useEffect, useState} from 'react';
// import './AllProfiles.css';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function AllProfiles() {
    const history = useHistory();
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8080/userprofiles');
                setUserProfiles(response.data);
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
                <h1>Alle gebruiker profielen</h1>
                <section className="users-table-container">
                    <section className="content-container-row">
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
                        <button
                            type="button"
                            onClick={() => history.push('/users')}
                        >
                            Gebruikers
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
                            {userProfiles.map((userprofile) => {
                                return <tr key={userprofile.id}>
                                    <td><Link to="/profile">Klik</Link></td>
                                    <td>{userprofile.id}</td>
                                    <td>{userprofile.firstName + " " + userprofile.lastName}</td>
                                    <td>{userprofile.age}</td>
                                    <td>{userprofile.school}</td>
                                    <td>
                                        {(() => {
                                            switch (userprofile.username.authorities[0].authority) {
                                                case "ROLE_USER":
                                                    return "Leerling";
                                                case "ROLE_DOCENT":
                                                    return "Docent";
                                                case "ROLE_ADMIN":
                                                    return "Admin";
                                                default:
                                                    return "Undefined";
                                            }
                                        })()}
                                    </td>
                                    <td>{userprofile.username.username}</td>
                                    <td>{userprofile.username.email}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </section>
                </section>
            </div>
        </>
    );
};

export default AllProfiles;