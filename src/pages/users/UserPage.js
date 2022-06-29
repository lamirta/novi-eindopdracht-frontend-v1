import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './UserPage.css';

function UserPage() {
    const [user, setUser] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [profile, setProfile] = useState([]);
    const { username } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}`);
                setUser(response.data);
                setUserRoles(response.data.authorities[0]);
                setProfile(response.data.userProfile);
                console.log(response.data);
            } catch(e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchUser();
    }, []);


    return (
        <>
            <div className="body-outer-container">
                <h1>Gebruiker username: "{username}"</h1>
                <section className="users-table-container">
                    <section>
                        <button
                            type="button"
                            onClick={() => history.push('/users')}
                        >
                            Alle gebruikers
                        </button>
                    </section>
                    <section>
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
                            Gebruikersrol toevoegen / verwijderen
                        </button>
                    </section>
                    <section className="content-container-row">
                        <table>
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>E-mailadres</th>
                                <th>Status</th>
                                <th>Gebruikersrol</th>
                                <th>Profiel Pagina</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.enabled === true ? "Actief" : "Gedeactiveerd"}</td>
                                    <td>
                                        {/*<i>To Be Implemented..</i>*/}
                                        {/*{userRoles.authority}*/}
                                        {(() => {
                                            //Hier nog een manier verzinnen als een user 2 authorities heeft. User & Docent..
                                            switch (userRoles.authority) {
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
                                <td>{profile.id}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
            </div>
        </>
    );
}

export default UserPage;