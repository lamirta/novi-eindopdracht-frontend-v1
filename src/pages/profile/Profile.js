import React from 'react';
import './Profile.css';
import {Link} from "react-router-dom";

function Profile() {
    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Profielfoto:</strong>..upload functie hier</p>
                <p><strong>Gebruikersnaam:</strong> hardcoded-test</p>
                <p><strong>Email:</strong> hardcoded@test.com</p>
            </section>
            <section>
                <h2>Woordenlijsten</h2>
                <button>Nieuwe Woordenlijst</button>
                <ul>
                    <li>Lijst 1</li>
                    <li>Lijst 2</li>
                    <li>Lijst 3</li>
                </ul>
            </section>
            <section>
                <h2>Scorelijst</h2>
                <p>Ga <Link to="/">hier</Link> naar jouw resultaten van de afgelopen tijd</p>
                {/*Hierboven een component of een pagina van maken..?*/}
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;