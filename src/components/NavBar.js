import React from 'react';
import './NavBar.css';
import logo from '../assets/logo_flash.png';
import {Link, useHistory} from "react-router-dom";

function NavBar() {
    const history = useHistory();

    return (
        <nav>
            <Link to="/">
          <span className="nav-container">
            <img src={logo} alt="logo"/>
            <h3>
              Flash Word
            </h3>
          </span>
            </Link>

            <div>
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
                <button
                    type="button"
                    // onClick={logout}
                >
                    Log out
                </button>
            </div>
        </nav>
    );
};

export default NavBar;