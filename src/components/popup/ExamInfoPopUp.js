import React from "react";
// import "./ExamInfoPopUp.css";

function ExamInfoPopUp() {

    return(
        <>
            <h3>Uitleg</h3>
            <p>De woorden uit de woordenlijst zijn kort in beeld te zien en verdwijnen dan weer.</p>
            <p>Zodra het woord uit beeld is, verschijnt er een invoerveld waar jij het woord kan natypen. Je kan pas op de "volgende" knop drukken,
                wanneer het woord goed is ingevuld.</p>
            <p>Als je een foute letter intypt, komt deze niet in beeld. Zo krijg je het woord pas te zien als
                alles goed gespeld is! Wel telt een foute letter als 1 fout.</p>
            <p>Wanneer alle woorden geweest zijn, zie je of je de toets gehaald hebt. Je slaagd als je onder de 8
                fouten blijft.
            </p>
        </>
    );
}

export default ExamInfoPopUp;