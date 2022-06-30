import React from "react";
import "./PopUp.css";

function Popup({children, toggle}) {

    return(
        <div className="popup-general"
             // onClick={toggle}
        >
            <section className="popup-inner"
                     // Misschien: stopImmediatePropagation()
                     // onClick={(e) => e.stopPropagation()}
            >
                {children}
            </section>
        </div>
    );
}

export default Popup;