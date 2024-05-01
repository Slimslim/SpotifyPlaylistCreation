import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { getUserById, logout } from "../services/LoginService";

import "bootstrap-icons/font/bootstrap-icons.css";

const Nav = (props) => {
    const { user, setUser } = useContext(userContext);
    const { loggedUser } = props;
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const id = window.localStorage.getItem("UUID");

    // useEffect(() => {
    //     getUserById(id)
    //         .then((res) => {
    //             setUser(res);
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             setErrors(err);
    //         });
    // }, []);

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
        <header className="nav_bar_header">
            <h1>The Playlist Track Lab</h1>
            <nav className="navigation_bar">
                <li className="menu_item">
                    <Link
                        className="nav-link active px-1"
                        aria-current="page"
                        to={"/home"}
                    >
                        Home
                    </Link>
                </li>
                <li className="menu_item">
                    <Link
                        className="nav-link active px-1"
                        aria-current="page"
                        to={"/myplaylists"}
                    >
                        My Playlists
                    </Link>
                </li>
                <li className="menu_item">
                    <Link
                        className="nav-link active px-1"
                        to={"/"}
                        onClick={() => logoutHandler()}
                    >
                        <u>logout</u>
                    </Link>
                </li>
                <li className="last_menu_item">
                    <a
                        className="nav-link  px-1 disabled"
                        href="#"
                        aria-disabled="true"
                    >
                        Logged as {loggedUser}
                    </a>
                    <i className="bi bi-person-circle"></i>
                </li>
            </nav>
        </header>
    );
};

export default Nav;
