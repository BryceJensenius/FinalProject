import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // For FontAwesomeIcon component
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // For icons

const Footer = () => {
    return (
        <footer className="text-body-secondary py-3">
            <div className="container footer-element">
                <p>Follow us at:</p>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} className="icon-style" /> Facebook
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="icon-instagram" /> Instagram
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} className="icon-twitter" /> Twitter
                </a>

            </div>
        </footer>
    );
};

export default Footer;
