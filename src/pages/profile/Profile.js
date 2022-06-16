import React from 'react';
import './Profile.css';
import {Link, useHistory} from "react-router-dom";

function Profile() {
    const history = useHistory();

    return (
        <>
            <div className="body-outer-container">
            <h1>Profielpagina</h1>
                <div className="body-inner-container-wide">
                <div className="content-outer-container-big">
            <section>
                <h2>User Gegevens</h2>
                <p><strong>Profielfoto:</strong>..upload functie hier</p>
                <p><strong>Username:</strong> hardcoded-test</p>
                <p><strong>Profiel ID:</strong> get request database.</p>
            </section>
            <section>
                <h2>Gegevens Rol (Leerling / Docent / Admin)</h2>
                <p><strong>Full Name: </strong>Voornaam + Achternaam</p>
                <p><strong>Email:</strong> hardcoded@test.com</p>
                <p><strong>Leeftijd:</strong> hardcoded-test</p>
                <p><strong>School:</strong> hardcoded-test</p>
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
                    <li>exam result 1</li>
                    <li>exam result 2</li>
                    <li>exam result 3</li>
                </ol>
                <p>Ga <Link to="/">hier</Link> naar jouw resultaten van de afgelopen tijd</p>
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