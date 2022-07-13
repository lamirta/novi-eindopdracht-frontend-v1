import React, {useContext, useEffect, useState} from 'react';
import './Users.css';
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import ButtonContainer from "../../components/container/ButtonContainer";

function Users() {
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    // const [profiles, setProfiles] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8080/users', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUsers(response.data)
                // setProfiles(response.data.userProfile)
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
            <section className="table-container">
                <section>
                    <ButtonContainer />
                </section>
                <section>
                    <button
                        type="button"
                        disabled={user.role !== 'TEACHER'}
                        onClick={() => history.push('/registreren')}
                    >
                        Nieuwe gebruiker aanmaken
                    </button>
                    <div className="hidden-div">Sorry, geen toegang 😔</div>
                </section>
                <section className="content-container-row">
                    <table>
                        <thead>
                        <tr>
                            <th>Ga naar Gebruiker</th>
                            <th>Username</th>
                            <th>Naam</th>
                            <th>E-mailadres</th>
                            <th>Gebruikersrol</th>
                            <th>Status</th>
                            <th>Profielpagina</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u) => {
                        return <tr key={u.username}>
                            <td><button
                                type="button"
                                onClick={() => history.push(`/user/${u.username}`)}
                            >
                                Naar gebruiker
                            </button></td>
                            <td>{u.username}</td>
                            <td>{u.userProfile.firstName}</td>
                            <td>{u.email}</td>
                            <td>
                                {(() => {
                                    switch (u.authorities[0].authority) {
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
                            <td>{u.enabled === true ? "Actief" : "Gedeactiveerd"}</td>
                            <td><button
                                type="button"
                                onClick={() => history.push(`/profiel/${u.userProfile.id}`)}
                            >
                                Profielpagina 🙋
                            </button></td>
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