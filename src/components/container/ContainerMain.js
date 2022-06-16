import React from 'react';
import './ContainerMain.css';
import {useHistory} from "react-router-dom";

function ContainerMain() {
    const history = useHistory();

    return (
        <>
            <div className="body-outer-container">
                <h1>Titel</h1>
                    <section className="content-container-row">
                    </section>
            </div>
        </>
    );
}

export default ContainerMain;