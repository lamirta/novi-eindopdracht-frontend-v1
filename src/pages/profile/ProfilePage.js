import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
import ButtonContainer from "../../components/container/ButtonContainer";
import {AuthContext} from "../../context/AuthContext";
import Popup from "../../components/popup/PopUp";
import UpdateUserProfile from "../../components/assignTo/UpdateUserProfile";

function ProfilePage() {
    const {user} = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState([]);
    const [userObject, setUserObject] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [exams, setExams] = useState([]);
    const [image, setImage] = useState([]);
    const [showPopUp, toggleShowPopup] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
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
                setExams(response.data.exams);
                setImage(response.data.profilePic);
                console.log(response.data);
            } catch (e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchProfile();

        // setPreviewUrl(URL.createObjectURL({image}));
    }, [id]);

    // function toggle() {
    //     toggleShowPopup(true)
    // }

    return (
        <>
            <div className="body-outer-container">
                    <h1>Profielpagina van <i>{userProfile.firstName}</i></h1>
                    <section className="profile-button-container">
                {user.role === 'TEACHER' && <ButtonContainer/>}
                    </section>
                    <div className="body-inner-container-wide">
                    <div className="content-outer-container-big">
                    <section>
                    <section>
                {!image ?
                    <> <p><i>Nog geen profiel foto</i></p>
                    <p><strong><Link to={`/profiel/${userProfile.id}/foto-uploaden`}>Profielfoto
                    Uploaden</Link></strong></p>
                    </> : <div className="profile-pic-space">
                    <label className="label-image-preview">
                    <i>Afbeelding ophalen..</i>
                {/*<img src={previewUrl} alt="profiel-foto" className="image-preview"/>*/}
                    </label>
                    </div>}
                    </section>
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
                {user.role === 'STUDENT' &&
                    <button
                    type="button"
                    onClick={() => history.push('/woordenlijsten')}
                    >
                    Woordenlijsten
                    </button>
                }
                    <section>
                    <h2>Top score!</h2>
                {!exams[0] ? <p>Er zijn nog geen toetsen van {userProfile.firstName}</p> :
                    <ol>
                {exams.map((exam) => {
                    return <li className="profile-page-li" key={exam.id}> Aantal
                    fouten: {exam.wrongEntries}
                    <strong>{exam.passed === true ? " & Geslaagd!!" : ""}</strong></li>;
                })}
                    </ol>
                }
                    </section>
                    <button
                    type="button"
                    onClick={() => history.push(`/toetsen-van/${id}`)}
                    >
                {userProfile.firstName}'s Toetsen
                    </button>
                    </div>
                    </div>

                {!userProfile.firstName &&
                <Popup>
                    <UpdateUserProfile
                        profileId={id}
                    />
                </Popup>
                }
            </div>
        </>
    );
}

export default ProfilePage;