import React from 'react';

// if / else statement to translate:
// user.authorities[0].authority === ROLE_USER >> Leerling
// user.authorities[0].authority === ROLE_DOCENT >> Docent
// user.authorities[0].authority === ROLE_ADMIN >> Admin



function AuthorityTranslate() {
    return (
        <div>
            {/*{(() => {*/}
            {/*    switch (user.authorities[0].authority) {*/}
            {/*        case "ROLE_USER":*/}
            {/*            return "Leerling";*/}
            {/*        case "ROLE_DOCENT":*/}
            {/*            return "Docent";*/}
            {/*        case "ROLE_ADMIN":*/}
            {/*            return "Admin";*/}
            {/*        default:*/}
            {/*            return "Undefined";*/}
            {/*    }*/}
            {/*})()}*/}
        </div>
    );
};

export default AuthorityTranslate;