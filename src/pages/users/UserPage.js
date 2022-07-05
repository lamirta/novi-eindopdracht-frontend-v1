import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import Popup from "../../components/popup/PopUp";
import AssignImageToProfile from "../../components/assignTo/AssignImageToProfile";
import AssignUserToProfile from "../../components/assignTo/AssignUserToProfile";
import CreateEmptyProfile from "../../components/assignTo/CreateEmptyProfile";
import {AuthContext} from "../../context/AuthContext";
// import './UserPage.css';

function UserPage() {
    const {user} = useContext(AuthContext);
    const [userObject, setUserObject] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [profile, setProfile] = useState([]);
    const [clicked, toggleClicked] = useState(false);
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
                setUserObject(response.data)
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


    function handleClick() {
        toggleClicked(true)
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
                                <td>{userObject.username}</td>
                                <td>{userObject.email}</td>
                                <td>{userObject.enabled === true ? "Actief" : "Gedeactiveerd"}</td>
                                    <td>
                                        {(() => {
                                            switch (userRole.authority) {
                                                case "STUDENT":
                                                    return " Leerling";
                                                case "TEACHER":
                                                    return " Docent";
                                                default:
                                                    return " Undefined";
                                            }
                                        })()}
                                    </td>
                                <td>{!profile ?
                                    <button
                                        type="button"
                                        onClick={handleClick}
                                    >
                                        Profiel aanmaken
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        onClick={() => history.push(`/profiel/${profile.id}`)}
                                    >
                                        Naar profielpagina
                                    </button>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
                {clicked &&
                <section className="table-container">
                    <CreateEmptyProfile
                        userObject={userObject}
                    />
                </section>
                }
            </div>
        </>
    );
}

// <AssignUserToProfile
//     username={username}
//     profileId={profile.id}
// />

// <div className="hidden-div">
//                                         <span>Sorry, alleen
//                                             "<strong>{ userObject.username }</strong>"
//                                            kan een eigen profiel aanmaken
//                                         </span>
// </div>

export default UserPage;