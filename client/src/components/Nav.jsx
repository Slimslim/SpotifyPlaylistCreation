import React, { useState, useContext } from "react";
import { userContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/LoginService";

import "bootstrap-icons/font/bootstrap-icons.css";

const Nav = (props) => {
    const { user, setUser } = useContext(userContext);
    const { username } = props;
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const logoutHandler = () => {
        logout()
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };
    return (
        <header className="grid border-bottom border-3">
            <nav className="nav justify-content-end">
                <li className="nav-item">
                    <a
                        className="nav-link active px-1"
                        aria-current="page"
                        href="#"
                    >
                        My Playlists
                    </a>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link px-1"
                        to={"/"}
                        onClick={() => logoutHandler()}
                    >
                        <u>logout</u>
                    </Link>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link  px-1 disabled"
                        href="#"
                        aria-disabled="true"
                    >
                        Logged as {user.username}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">
                        <i className="bi bi-person-circle"></i>
                    </a>
                </li>
            </nav>
            <div className="text-center">
                <h1>The Music Playlist Database</h1>
            </div>
        </header>
    );
};

export default Nav;
