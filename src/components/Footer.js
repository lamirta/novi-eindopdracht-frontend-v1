import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer
            style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
            }}>
            <div className="footer-content">
                    <p>
                        © Copyright 2022{" "}
                        <a title="ProZwolle" href="https://www.pro-zwolle.nl/">
                            Pro Zwolle
                        </a>
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