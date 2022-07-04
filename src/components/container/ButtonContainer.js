import React, {useContext} from 'react';
// import './ButtonContainer.css';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function ButtonContainer() {
    const {user} = useContext(AuthContext);
    const history = useHistory();

    return (
        <div className="button-container">
            <button
                type="button"
                onClick={() => history.push('/woordenlijsten')}
            >
                Woordenlijsten
            </button>
            {user.role === 'TEACHER' && <>
            <button
                type="button"
                onClick={() => history.push('/toetsen')}
            >
                Toetsen
            </button>
            <button
                type="button"
                onClick={() => history.push('/users')}
            >
                Gebruikers
            </button>
            <button
                type="button"
                onClick={() => history.push('/userprofiles')}
            >
                Profielen
            </button>
            </>}
        </div>
    );
}

export default ButtonContainer;