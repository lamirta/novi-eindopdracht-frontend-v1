import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                    <p>
                        © Copyright 2022{" "}
                        {" "}&#8226;
                        Design by{" "}
                        <a title="MirteHouwing" href="https://www.linkedin.com/in/mirtehouwing/">
                            Mirte Houwing
                        </a>
                    </p>
            </div>
        </footer>
    );
}

export default Footer;