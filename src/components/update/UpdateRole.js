import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
// import './UpdateRole.css';

function UpdateRole({togglePopup, userRole}) {
    const [confirmChange, toggleConfirmChange] = useState(false);
    const [newAuthority, setNewAuthority] = useState('New Role');
    const { username } = useParams();
    const history = useHistory();


    // Delete
    async function deleteRole() {
        try {
            const result = await axios.delete(`http://localhost:8080/users/${username}/authorities/${userRole.authority}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status)
            history.push(`/users`);
        } catch (e) {
            console.error(e)
        }
    }

    // Add
    async function addRole() {
        try {
            const result = await axios.post(`http://localhost:8080/users/${username}/authorities`, {
                username: username,
                authority: newAuthority,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log(result.status);
        } catch (e) {
            console.error(e);
        }
    }

    function handleSubmit() {
        addRole()
        deleteRole()
        togglePopup()
    }

    function handleOldRole() {
        if (userRole.authority === 'STUDENT') {
            return "Leerling";
        } else if (userRole.authority === 'TEACHER') {
            return "Docent";
        }
    }

    // function handleNewRole() {
    //     if (userRole.authority === 'STUDENT') {
    //         setNewAuthority('TEACHER')
    //     } else if (userRole.authority === 'TEACHER') {
    //         setNewAuthority('STUDENT')
    //     }
    //     toggleConfirmChange(!confirmChange)
    // }

    function handleNewRole() {
        if (userRole.authority === 'TEACHER') {
            setNewAuthority('STUDENT')
        } else if (userRole.authority === 'STUDENT') {
            setNewAuthority('TEACHER')
        }
            toggleConfirmChange(!confirmChange)
    }

    return (
        <>
            <h1>Verander gebruikersrol "{handleOldRole()}"</h1>
            <br></br>
            Weet je zeker dat je het account van "{username}" om wilt zetten?
                <button
                    type="button"
                    onClick={togglePopup}
                >
                    Nee, terug
                </button>
            <section className="table-container">
                <br></br>
                <h3>Verander van "{handleOldRole()}" naar: </h3>
                <h2>"{newAuthority}"</h2>
                <label htmlFor="change-role">
                    <input
                        type="checkbox"
                        name="change-role"
                        checked={confirmChange}
                        onChange={() => handleNewRole()}
                    />
                </label>
                <button
                    type="button"
                    id="delete"
                    disabled={!confirmChange}
                    onClick={handleSubmit}
                >
                    Update Rol
                </button>
            </section>
        </>
    );
}

export default UpdateRole;