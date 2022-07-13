import React from 'react';
import './ExamIntro.css';
import ButtonContainer from "../container/ButtonContainer";

function ExamIntro({props}) {
    return (
        <>
            <div className="body-outer-container">
                <h1>Toets Starten!</h1>
                <section className="table-container">
                    <section>
                        <ButtonContainer />
                    </section>
                    <section className="content-container-row">
                        <p>UITLEG OVER TOETS MAKEN</p>
                        <p>

                        </p>
                    </section>
                </section>
            </div>
        </>
    );
}

export default ExamIntro;