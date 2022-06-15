import React from 'react';
import './WordLists.css';
import {useHistory} from "react-router-dom";

function WordLists() {
    const history = useHistory();

    return (
        <>
        <div>
            <section>
                <h2>Woordenlijsten</h2>

                <ul>
                    <li>Lijst 1</li>
                    <li>Lijst 2</li>
                    <li>Lijst 3</li>
                </ul>

                <button
                    type="button"
                    onClick={() => history.push('/woordenlijsten')}
                >
                    Nieuwe Woordenlijst
                </button>

                <button
                    type="button"
                    onClick={() => history.push('/')}
                >
                    Home
                </button>

            </section>
        </div>
        </>
    );
};

export default WordLists;