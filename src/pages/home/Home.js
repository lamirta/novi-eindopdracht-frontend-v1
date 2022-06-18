import React from 'react';
import './Home.css';
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <div className="body-outer-container">
                <h1>Flash Word</h1>
                <div className="home-inner-container-wide">
            <div className="home-inner-container-small">
            <section>
                <p>Flash Word is een online platform speciaal ontwikkeld voor het verbeteren van spellingvaardigheid.{" "}
                    <a title="ProZwolle" href="https://www.pro-zwolle.nl/">
                        Pro Zwolle
                    </a> biedt deze webapplicatie aan tijdens hun behandelingen, zodat leerlingen spelling kunnen
                    oefenen met woordenlijsten door middel van oefeningen en toetsen op het platform. Leerlingen kunnen
                    een account aanmaken en hier hun woordenlijsten, oefeningen, resultaten en voortgang bijhouden.
                </p>
            </section>
            <h2>Dyslexie</h2>
            <section>
                <p>Dyslexie is een stoornis die gekenmerkt wordt door een hardnekkig probleem met het aanleren en/of
                    vlot toepassen van het lezen en/of spellen op woordniveau. Hardnekkigheid is een belangrijk kenmerk van dyslexie, niet alleen bij het leren lezen en spellen,
                    maar ook bij het snel en vlot kunnen lezen.</p>

                <p>De behandelingen van {" "}
                    <a title="ProZwolle" href="https://www.pro-zwolle.nl/">
                        Pro Zwolle
                    </a> voor dyslexie zijn gericht op het vergroten van de leesvaardigheid
                    en/of spellingvaardigheid, het verminderen van de beperking, het omgaan met de beperking en het
                    voorkomen van nadelige gevolgen ervan.
                </p>
            </section>
            <section>
                <p>Als je ingelogd bent, bekijk dan de <Link to="/profile">Profielpagina</Link></p>
                <p>Je kunt ook <Link to="/signin">inloggen</Link> of jezelf <Link to="/registreren">registreren</Link> als je
                    nog geen account hebt. (Dit kan alleen jouw docent doen..)</p>
                <p>Ga naar: <Link to="/woordenlijsten">woordenlijsten</Link></p>
                <p>Ga naar: <Link to="/toetsen">toetsen</Link></p>
                <p>Ga naar: <Link to="/users">users</Link></p>
            </section>
            </div>
                </div>
            </div>
        </>
    );
}

export default Home;