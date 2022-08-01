import React from 'react';
// import './ExamBtnNext.css';

function ExamBtnNext({userEntry, currentWord, toNextWord}) {

    return (
        <div className="exercise-bottom-bar">
            <div className="btn-block">
                {/*HIER NOG TERNARY RESPONSE MESSAGE IF WRONG LETTER*/}
                <div className="btn-right">
                    <button
                        type="button"
                        disabled={userEntry !== currentWord}
                        id="volgende"
                        onClick={toNextWord}
                    >
                        <div className="visual">
                            <span className="text-exam-btn">
                                volgende
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExamBtnNext;