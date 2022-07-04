import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './UserPage.css';

function UserPage() {
    const [user, setUser] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [profile, setProfile] = useState([]);
    const { username } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUser(response.data)
                setUserRole(response.data.authorities[0])
                setProfile(response.data.userProfile)
                console.log(response.data);
            } catch(e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchUser();
    }, []);

    // {history.push(`/profile/${profile.id}}

    function handleClick() {
        // toggleClicked(!clicked);
    }


    return (
        <>
            <div className="body-outer-container">
                <h1>Gebruiker username: "{username}"</h1>
                <section className="table-container">
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
                                        {(() => {
                                            switch (userRole.authority) {
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
                                <td>{profile.id !== null ? profile.id :
                                    <button
                                        type="button"
                                        onClick={handleClick}
                                    >
                                        Profiel aanmaken
                                    </button>
                                }
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