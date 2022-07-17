import React, {useState} from 'react';
import "./ExamHeader.css";
import infoIcon from '../../assets/info_icon.png';

function ExamHeader({title, progress, wordsDone, wordsTotal, toggleInfo}) {

    function handleInfo() {
        toggleInfo();
    }

    return (
        <>
            <header className="exercise-page-header">
                <div className="exercise-header-inner">
                <h2 className="wordlist-title">
                    Woordenlijst:
                    <span className="wordlist-title-p">
                         {""} {title.toUpperCase()}
                    </span>
                </h2>
                    <div className="progress-container">
                    <div className="progress-bar">
                        <span className="progress" style=
                            {{
                                width: `${progress}%`}}> </span>
                    </div>
                    <div className="progress-text">
                        {/*{wordsDone} van de {wordsTotal} woorden gehad*/}
                        nog {(wordsTotal - wordsDone)} van de {wordsTotal} te gaan
                    </div>
                    </div>
                    <button type="button" onClick={handleInfo}>
                    <div className="exercise-header-info">
                        <img src={infoIcon} alt="info-icon" id="info-icon" />
                    </div>
                    </button>
                </div>
            </header>
        </>
    );
}

export default ExamHeader;