import React from 'react';

function ExamHeader({title}) {

    return (
        <>
            <header className="exercise-page-header">
                <h2 className="wordlist-title">
                    Titel Woordenlijst:
                    <span className="wordlist-title-p">
                         {""} {title.toUpperCase()}
                    </span>
                </h2>
            </header>
        </>
    );
}

export default ExamHeader;