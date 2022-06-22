import React, {useEffect, useState} from 'react';
import './Profile.css';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";

function Profile() {
    const [userProfile, setUserProfile] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:8080/userprofiles/${id}`);
                setUserProfile(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchUser();
    }, [{id}]);



    return (
        <>
            <div className="body-outer-container">
            <h1>Profielpagina: <i>{userProfile.firstName} {userProfile.lastName}</i></h1>
                <div className="body-inner-container-wide">
                <div className="content-outer-container-big">
            <section>
                <h2>User Gegevens</h2>
                <p><strong><Link to="/foto-uploaden">Profielfoto Uploaden</Link></strong></p>
                <p><strong>Username:</strong> {userProfile.username.username}</p>
                <p><strong>Profiel ID:</strong> ===>>> {userProfile.id}</p>
            </section>
            <section>
                <h2>
                    {(() => {
                        //Hier nog een manier verzinnen als een user 2 authorities heeft. User & Docent..
                        switch (userProfile.username.authorities[0].authority) {
                            case "ROLE_USER":
                                return "Leerling";
                            case "ROLE_DOCENT":
                                return "Docent";
                            case "ROLE_ADMIN":
                                return "Admin";
                            default:
                                return "Undefined";
                        }
                    })()}</h2>
                <p><strong>Full Name: </strong>{userProfile.firstName} {userProfile.lastName}</p>
                <p><strong>Email:</strong> {userProfile.username.email}</p>
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
                    <li>Aantal fouten: {userProfile.exams[0].wrongEntries} / {userProfile.exams[0].passed === true ? "Geslaagd!!" : ""}</li>
                    <li>Aantal fouten: {userProfile.exams[1].wrongEntries} / {userProfile.exams[0].passed === true ? "Geslaagd!!" : ""}</li>
                    <li>Aantal fouten: {userProfile.exams[2].wrongEntries} / {userProfile.exams[0].passed === true ? "Geslaagd!!" : ""}</li>
                </ol>
                <p>Ga <Link to="/toetsen">hier</Link> naar al jouw resultaten van de afgelopen tijd</p>
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

export default Profile;