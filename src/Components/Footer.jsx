import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">
                <div className="row text-center text-md-start">
                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase">WebStore</h5>
                        <p>Your go-to place for quality <br /> and affordable products.</p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                            <li><Link to="/product" className="text-light text-decoration-none">Products</Link></li>
                            <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase mb-3">Follow Us</h6>
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                            <a href="https://facebook.com" className="text-light" target="_blank" rel="noreferrer">
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="https://twitter.com" className="text-light" target="_blank" rel="noreferrer">
                                <i className="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="https://instagram.com" className="text-light" target="_blank" rel="noreferrer">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="bg-secondary" />
                <div className="text-center">
                    <small>© {new Date().getFullYear()} WebStore. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
}
