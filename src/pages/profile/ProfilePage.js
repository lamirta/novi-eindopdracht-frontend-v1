import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";

function ProfilePage() {
    const [userProfile, setUserProfile] = useState([]);
    const [user, setUser] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [exams, setExams] = useState([]);
    const [image, setImage] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8080/userprofiles/${id}`);
                setUserProfile(response.data);
                setUser(response.data.username);
                setUserRole(response.data.username.authorities[0]);
                setExams(response.data.exams);
                setImage(response.data.profilePic);
                console.log(response.data);
            } catch(e) {
                console.error(e);
                console.log(e.response.data);
            }
        }
        fetchProfile();
    }, []);

    return (
        <>
            <div className="body-outer-container">
            <h1>Profielpagina: <i>{userProfile.firstName} {userProfile.lastName}</i></h1>
                <div className="body-inner-container-wide">
                <div className="content-outer-container-big">
            <section>
                <h2>User Gegevens</h2>
                <p><strong><Link to="/foto-uploaden">Profielfoto Uploaden</Link></strong></p>
                <p><strong>Username: </strong>
                    "{user.username}"
                </p>
                <p><strong>Profiel ID:</strong> #{userProfile.id}</p>
            </section>
            <section>
                <h2>GEBRUIKERSROL:
                    {(() => {
                        //Hier nog een manier verzinnen als een user 2 authorities heeft. User & Docent..
                        switch (userRole.authority) {
                            case "ROLE_USER":
                                return " Leerling";
                            case "ROLE_DOCENT":
                                return " Docent";
                            case "ROLE_ADMIN":
                                return " Admin";
                            default:
                                return " Undefined";
                        }
                    })()}
                </h2>
                <p><strong>Full Name: </strong>{userProfile.firstName} {userProfile.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Leeftijd:</strong> {userProfile.age}</p>
                <p><strong>School:</strong> {userProfile.school}</p>
            </section>
                </div>
                <div className="content-outer-container-big">
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

            </section>
            <section>
                <h2>Jouw top score!</h2>
                <ol>
                    {exams.map((exam) => {
                    return <li key={exam.id}> Aantal fouten: {exam.wrongEntries} <strong>{exam.passed === true ? " & Geslaagd!!" : ""}</strong></li>
                })}
                </ol>
                <p>Ga <Link to={`/mijn-toetsen/${id}`}>hier</Link> naar al jouw resultaten van de afgelopen tijd</p>
            </section>
                </div>
                </div>
                <span className="profile-span-bottom">
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
                </span>
            </div>
        </>
    );
}

export default ProfilePage;