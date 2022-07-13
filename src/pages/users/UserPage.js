import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import Popup from "../../components/popup/PopUp";
import {AuthContext} from "../../context/AuthContext";
import DeleteUser from "../../components/delete/DeleteUser";
import UpdateUser from "../../components/update/UpdateUser";
import UpdateRole from "../../components/update/UpdateRole";
import ButtonContainer from "../../components/container/ButtonContainer";
// import './UserPage.css';

function UserPage() {
    const {user} = useContext(AuthContext);
    const [userObject, setUserObject] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [profile, setProfile] = useState([]);
    const [updateUser, toggleUpdateUser] = useState(false);
    const [deleteUser, toggleDeleteUser] = useState(false);
    const [updateRole, toggleUpdateRole] = useState(false);
    const [showPopup, toggleShowPopup] = useState(false);
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


    function handleUpdateUser() {
        toggleShowPopup(!showPopup)
        toggleUpdateUser(!updateUser)
    }

    function handleClickDelete() {
        toggleShowPopup(!showPopup)
        toggleDeleteUser(!deleteUser)
    }

    function handleUpdateRole() {
        toggleShowPopup(!showPopup)
        toggleUpdateRole(!updateRole)
    }



    return (
        <>
            <div className="body-outer-container">
                {(user.username === userObject.username || user.role === 'TEACHER') ? <>

                <h1>Gebruiker username: "{username}"</h1>
                <section className="table-container">
                    <section>
                        <ButtonContainer />
                    </section>
                    <section>
                        <button
                            type="button"
                            disabled={user.role !== 'TEACHER'}
                            onClick={handleUpdateUser}
                        >
                            Gebruiker aanpassen
                        </button>
                        <button
                            type="button"
                            id="delete"
                            disabled={user.role !== 'TEACHER'}
                            onClick={handleClickDelete}
                        >
                            Gebruiker verwijderen
                        </button>
                        <button
                            type="button"
                            disabled={user.role !== 'TEACHER'}
                            onClick={handleUpdateRole}
                        >
                            Gebruikersrol aanpassen
                        </button>
                    </section>
                    {/*// component van maken table*/}
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
                                <td>{userObject.enabled === true ? "Actief " : "Gedeactiveerd "}
                                </td>
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
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => history.push(`/profiel/${profile.id}`)}
                                    >
                                        Naar profielpagina
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
                {showPopup &&
                <Popup>
                    {updateUser && <UpdateUser
                        togglePopup={handleUpdateUser}
                    />}
                    {deleteUser && <DeleteUser
                        profileId={profile.id}
                        togglePopup={handleClickDelete}
                    />}
                    {updateRole && <UpdateRole
                        togglePopup={handleUpdateRole}
                        userRole={userRole}
                    />}
                </Popup>
                }
            </> : <h1 className="error-message">Sorry, je hebt geen toegang 😔🛑</h1> }
            </div>
        </>
    );
}

export default UserPage;
