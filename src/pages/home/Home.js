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
                <p>Flash Word is een online platform speciaal ontwikkeld voor het verbeteren van spellingvaardigheid. Op
                    dit moment is de applicatie nog in ontwikkeling, om uiteindelijk ingezet te worden door {" "}
                    <a title="Pro-Zwolle" href="https://www.pro-zwolle.nl/">
                        Pro Zwolle
                    </a>. Zij willen deze webapplicatie aanbieden tijdens hun behandelingen, zodat leerlingen spelling
                    kunnen oefenen met woordenlijsten door middel van oefeningen en toetsen op het platform. Leerlingen
                    krijgen inloggegevens van hun docent en kunnen dan een profiel aanmaken, woordenlijsten inzien,
                    oefeningen en toetsen maken, resultaten en voortgang bijhouden.
                </p>
            </section>
            <section className="home-column-container">
                <div className="home-row-container">
                    <p>De ontwikkeling van deze applicaties is tevens onderdeel van de eindopdracht voor de Full Stack
                        Software Development bootcamp van Novi Hogeschool. Er is een demo versie beschikbaar voor het
                        testen en de beoordeling. Wanneer je de front- en backend local <i>up and running</i> hebt kan
                        je als docent inloggen:
                    </p>
                    <span className="home-user-info">
                    <p className="home-p">username: TestDocent</p>
                    <p className="home-p">password: password</p>
                    </span>
                </div>
                <div className="home-row-container">
                <p>Een docent heeft toegang tot alle functionaliteiten in de applicatie, inzicht in alle gegevens en
                        kan nieuwe accounts aanmaken. Er zijn al een paar 'test accounts' beschikbaar. Log bijvoorbeeld
                        in als leerling:</p>
                    <span className="home-user-info">
                    <p className="home-p">username: TestLeerling</p>
                    <p className="home-p">password: password</p>
                    </span>
                </div>
            </section>
            <section>
                <h2>Dyslexie</h2>
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
            {/*<section>*/}
            {/*    <p>Als je ingelogd bent, bekijk dan de <Link to="/userprofiles">Profielpagina's</Link></p>*/}
            {/*    <p>Je kunt ook <Link to="/signin">inloggen</Link> of jezelf <Link to="/registreren">registreren</Link> als je*/}
            {/*        nog geen account hebt. (Dit kan alleen jouw docent doen..)</p>*/}
            {/*    <p>Ga naar: <Link to="/woordenlijsten">woordenlijsten</Link></p>*/}
            {/*    <p>Ga naar: <Link to="/toetsen">toetsen</Link></p>*/}
            {/*    <p>Ga naar: <Link to="/users">users</Link></p>*/}
            {/*</section>*/}
            </div>
                </div>
            </div>
        </>
    );
}

export default Home;