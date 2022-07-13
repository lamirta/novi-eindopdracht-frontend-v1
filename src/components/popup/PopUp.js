import React from "react";
import "./PopUp.css";

function Popup({children}) {

    return(
        <div className="popup-general">
            <section className="popup-inner">
                <div className="popup-inner-small">
                {children}
                </div>
            </section>
        </div>
    );
}

export default Popup;