import React, {useContext} from 'react';
import './NavBar.css';
import logo from '../assets/nav_logo.png';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const {auth, logout} = useContext(AuthContext);
    console.log(auth);
    const history = useHistory();

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
          </span>
            </Link>

            <h3>
                Woordjes Leren & Spellen!
            </h3>

            <div>
                <button
                    type="button"
                    onClick={() => history.push('/')}
                >
                    Home
                </button>
                {!auth ?
                    <>
                        <button
                            type="button"
                            onClick={() => history.push('/signin')}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => history.push('/signup')}
                        >
                            Registreren
                        </button>
                    </> :
                    <button
                        type="button"
                        onClick={logout}
                    >
                        Log uit
                    </button>
                }
            </div>
        </nav>
    );
};

export default NavBar;