import React, {useEffect, useState} from 'react';
import './Users.css';
import axios from "axios";
import {useHistory} from "react-router-dom";

function Users() {
    const history = useHistory();
    // de vraag is of ik ook via get request nar users bij userProfiles kan.. want ze hebben wel een relatie, alleen wordt het onder userprofile opgeslagen..
    //Uitproberen met eigen backend.. TO DO

    // const [userProfiles, setUserProfiles] = useState([]);
    //
    // useEffect(() => {
    //     async function fetchUsers() {
    //         try {
    //             const response = await axios.get('http://localhost:8080/userprofiles');
    //             // Plaats alle studenten in de state zodat we het op de pagina kunnen gebruiken
    //             setUserProfiles(response.data);
    //             console.log(response.data);
    //         } catch(e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     fetchUsers();
    // }, []);

    return (
        <>
        <div className="body-outer-container">
            <section className="users-table-container">
                <h1>Alle geregistreerde gebruikers</h1>
                <section>
                    <button
                        type="button"
                        onClick={() => history.push('/woordenlijsten')}
                    >
                        Woordenlijsten
                    </button>
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
                </section>
                <section>
                    <table>
                        <thead>
                        <tr>
                            <th>Userprofile ID</th>
                            <th>Naam</th>
                            <th>Leeftijd</th>
                            <th>School</th>
                            <th>Gebruikersrol</th>
                            <th>Username</th>
                            <th>Emailadres</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{students.map((student) => {*/}
                        {/*    // De key moet op het buitenste element staan en uniek zijn*/}
                        {/*return <tr key={student.studentNumber}>*/}
                        <tr>
                            {/*<td>{student.studentNumber}</td>*/}
                            {/*/!*Even checken of er uberhaupt een file is, en zo ja, dan laten we hem zien!*!/*/}
                            {/*<td>{student.file && <img src={student.file.url} alt={student.name}/>}</td>*/}
                            {/*<td>{student.name}</td>*/}
                            {/*<td>{student.course}</td>*/}
                            {/*<td>{student.emailAddress}</td>*/}
                            <td>Userprofile ID</td>
                            <td>Naam</td>
                            <td>Leeftijd</td>
                            <td>School</td>
                            <td>Gebruikersrol</td>
                            <td>Username</td>
                            <td>Emailadres</td>
                        </tr>
                        {/*})}*/}
                        </tbody>
                    </table>
                </section>

                <table>
                <thead>
                <tr>
                    <th>Userprofile ID</th>
                    <th>Naam</th>
                    <th>Leeftijd</th>
                    <th>School</th>
                    <th>Gebruikersrol</th>
                    <th>Username</th>
                    <th>Emailadres</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Userprofile ID</td>
                        <td>Naam</td>
                        <td>Leeftijd</td>
                        <td>School</td>
                        <td>Gebruikersrol</td>
                        <td>Username</td>
                        <td>Emailadres</td>
                    </tr>
                </tbody>
            </table>
            </section>
        </div>
        </>
    );
};

export default Users;