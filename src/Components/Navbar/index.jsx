import React, { Fragment } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import jwt_decode from "jwt-decode";

import Styles from "./style.module.css";
export default function Navbar() {

    let { pathname } = useLocation();
    function logout() {
        localStorage.clear();
    }
    let token = localStorage.getItem("token");
    let decoded = {};
    try {
        decoded = jwt_decode(token);
    } catch (error) {
        localStorage.clear();
    }
    const isActive = {
        fontWeight: "bold",
        backgroundColor: "#fff",
        color: " #f5c518",
        borderRadius: "2px",
    };
    return (
        <Fragment>
            <nav className={`${Styles.navColor} navbar navbar-expand-lg`}>
                <Link to="/home" className={`${Styles.colorSt} navbar-brand`}>Movies App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white"><i className="fas fa-bars"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/home" className={`${Styles.colorSt} nav-link`} activeStyle={isActive}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/trending" className={`${Styles.colorSt} nav-link`} activeStyle={isActive}>Trending</NavLink>
                        </li>
                    </ul>
                    {pathname !== '/home' && pathname !== '/trending' && !pathname.includes("movie")
                        ? <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <NavLink to="/login" className={`${Styles.colorSt} nav-link`} activeStyle={isActive}>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className={`${Styles.colorSt} nav-link`} activeStyle={isActive}>Register</NavLink>
                            </li>
                        </ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink onClick={logout} to="/login" className={`${Styles.colorSt} nav-link`} activeStyle={isActive}>Log out</NavLink>
                            </li>
                            <li className="nav-item">
                                <span className={`${Styles.nameSt} nav-link`}>
                                    Welcome {decoded?.first_name} {decoded?.last_name}
                                </span>
                            </li>
                        </ul>}
                </div>
            </nav>
        </Fragment >
    )

}
