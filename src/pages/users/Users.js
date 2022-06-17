import React, {useEffect, useState} from 'react';
import './Users.css';
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

function Users() {
    const history = useHistory();
    // de vraag is of ik ook via get request naar users bij userProfiles kan.. want ze hebben wel een relatie, alleen wordt het onder userprofile opgeslagen..
    // Uitproberen met eigen backend.. TO DO

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8080/users');
                // Plaats alle studenten in de state zodat we het op de pagina kunnen gebruiken
                setUsers(response.data);
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
            <h1>Alle geregistreerde gebruikers</h1>
            <section className="users-table-container">
                <section>
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Woordenlijsten
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/toetsen')}
                    >
                        Toetsen
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/users')}
                    >
                        Gebruikers
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/userprofiles')}
                    >
                        Profielen
                    </button>
                </section>
                <section>
                    <button
                    >
                        Nieuwe gebruiker aanmaken
                    </button>
                    <button
                    >
                        Gebruiker zoeken
                    </button>
                    <button
                    >
                        Gebruiker aanpassen
                    </button>
                    <button
                    >
                        Gebruiker verwijderen
                    </button>
                    <button
                    >
                        Gebruikersrol toevoegen
                    </button>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Ga naar Gebruiker</th>
                            <th>Username</th>
                            <th>E-mailadres</th>
                            <th>Gebruikersrol</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            // De key moet op het buitenste element staan en uniek zijn
                        return <tr key={user.username}>
                            <td><Link to="/profile">Klik</Link></td>
                            <td>{user.username}</td>
                            {/*Even checken of er uberhaupt een file is, en zo ja, dan laten we hem zien!*/}
                            <td>{user.email}</td>
                            <td>
                                {(() => {
                                    switch (user.authorities[0].authority) {
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
                            <td>{user.enabled === true ? "Actief" : "Deactief"}</td>
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

export default Users;