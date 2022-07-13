import React, {useContext} from 'react';
import './NavBar.css';
import logo from '../../assets/nav_logo.png';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const {auth, user, logout} = useContext(AuthContext);
    const history = useHistory();

    function NavToProfile() {

    }

    return (
        <nav>
            <div className="nav-container">
          <span className="nav-logo-container-1">
            <Link to="/">
                <img src={logo} alt="logo"/>
            </Link>
            <h3>
                Woordjes Spellen!
            </h3>
          </span>

            <div className="nav-logo-container-2">
                <button
                    type="button"
                    onClick={() => history.push('/')}
                >
                    Home
                </button>
                {!auth ?
                        <button
                            type="button"
                            onClick={() => history.push('/signin')}
                        >
                            Log in
                        </button>
                    : <>
                    <button
                        type="button"
                        onClick={() => history.push(`/profiel/${user.profileId}`)}
                    >
                        Mijn Profiel
                    </button>
                    <button
                        type="button"
                        onClick={logout}
                    >
                        Log uit
                    </button>
                    </>
                }
            </div>
            </div>
        </nav>
    );
}

export default NavBar;