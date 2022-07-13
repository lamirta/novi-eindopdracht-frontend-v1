import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
import ButtonContainer from "../../components/container/ButtonContainer";
import {AuthContext} from "../../context/AuthContext";
import Popup from "../../components/popup/PopUp";
import UpdateUserProfile from "../../components/update/UpdateUserProfile";
import DeleteUser from "../../components/delete/DeleteUser";

function ProfilePage() {
    const {user} = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState([]);
    const [userObject, setUserObject] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [exams, setExams] = useState([]);
    const [image, setImage] = useState([]);
    const [confirmDelete, toggleConfirmDelete] = useState(false);
    const [confirmUpdate, toggleConfirmUpdate] = useState(false);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8080/userprofiles/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUserProfile(response.data);
                setUserObject(response.data.username);
                setUserRole(response.data.username.authorities[0]);
                setExams(response.data.exams.sort((a, b) => { return a.wrongEntries - b.wrongEntries}));
                setImage(response.data.profilePic);
                console.log(response.data);
            } catch (e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchProfile();
    }, [id]);

    function clickDelete() {
        toggleConfirmDelete(!confirmDelete);
    }

    function clickUpdate() {
        toggleConfirmUpdate(!confirmUpdate);
    }


    return (
        <>
            <div className="body-outer-container">
                {(user.profileId === userProfile.id || user.role === 'TEACHER') ? <>

                    <h1>Profielpagina van <i>{userProfile.firstName}</i></h1>
                    <section className="profile-button-container">
                {user.role === 'TEACHER' && <ButtonContainer/>}
                    </section>
                    <div className="body-inner-container-wide">
                    <div className="content-outer-container-big">
                    <section>
                    <div className="profile-pic-space">
                        <div className="image-cropper">
                          {!image ?
                              <div className="profile-pic-upl"> 📸
                                  <strong><Link to={`/profiel/${userProfile.id}/foto-uploaden`}>
                                      Profielfoto Uploaden</Link></strong>
                              </div> :
                              <img src={image.url} alt="profiel-foto" className="profile-pic"/>}
                        </div>
                    </div>
                        <div className="table-container">{image && <p><strong><Link to={`/profiel/${userProfile.id}/foto-uploaden`}>
                            Profielfoto Veranderen</Link></strong></p>}
                        </div>
                    </section>
                    <section>
                    <h2>Gegevens
                {(() => {
                    switch (userRole.authority) {
                    case "STUDENT":
                    return " Leerling";
                    case "TEACHER":
                    return " Docent";
                    default:
                    return " Undefined";
                }
                })()}:
                    </h2>
                    <p><strong>Username: </strong>
                {userObject.username}
                    </p>
                    <p><strong>Profiel ID:</strong> #{userProfile.id}</p>
                    <p><strong>Naam: </strong>{userProfile.firstName} {userProfile.lastName}</p>
                    <p><strong>Email:</strong> {userObject.email}</p>
                {userProfile.age &&
                    <p><strong>Leeftijd:</strong> {userProfile.age}</p>}
                {userProfile.school &&
                    <p><strong>School:</strong> {userProfile.school}</p>}
                    </section>
                    </div>
                    <div className="content-outer-container-big">
                        <button
                            type="button"
                            onClick={clickUpdate}
                        >
                            Deze gebruiker aanpassen
                        </button>
                        <br></br>
                {user.role === 'STUDENT' &&
                    <button
                    type="button"
                    onClick={() => history.push('/woordenlijsten')}
                    >
                    Woordenlijsten
                    </button>
                }
                {user.role === 'TEACHER' &&
                        <button
                            type="button"
                            id="delete"
                            onClick={clickDelete}
                        >
                            Deze gebruiker verwijderen
                        </button> }
                        <br></br>
                <section>
                    <h2>Top score!</h2>
                {!exams[0] ? <p>Er zijn nog geen toetsen van {userProfile.firstName}</p> :
                    <ol> {exams.slice(0, 3).map((exam) => {
                    return <li className="profile-page-li" key={exam.id}> Aantal fouten:
                        {exam.wrongEntries} <strong>{exam.passed === true ? " & Geslaagd 🎉!!" : ""}
                        </strong></li> })}
                    </ol> }
                </section>
                    <button
                    type="button"
                    onClick={() => history.push(`/toetsen-van/${id}`)}
                    > {userProfile.firstName}'s Toetsen
                    </button>
                    </div>
                    </div>
                {!userProfile.firstName &&
                <Popup
                >
                    <UpdateUserProfile
                        profileId={id}
                    />
                </Popup>
                }
                {confirmDelete &&
                <Popup>
                    <DeleteUser
                        profileId={id}
                        togglePopup={clickDelete}
                    />
                </Popup>
                }
                {confirmUpdate &&
                <Popup>
                    <UpdateUserProfile
                        profileId={id}
                        name={userProfile.firstName}
                        togglePopup={clickUpdate}
                    />
                </Popup>
                }
                </> : <h1 className="error-message">Sorry, je hebt geen toegang 😔🛑</h1> }
            </div>
        </>
    );
}

export default ProfilePage;