import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const logout = () => {
        localStorage.removeItem("auth-token");
        window.location.href = '/login';
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <Link to="order" style={{ marginRight:"20px", color:"black" }}><i className="fa-solid fa-box-open fa-xl"></i></Link>
                    {
                        !localStorage.getItem("auth-token") ? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp / Login</Link>
                        </form> : <button onClick={logout} className="btn btn-primary mx-1">Logout</button>
                    }
                </div>
            </div>
        </nav>
    )
}
