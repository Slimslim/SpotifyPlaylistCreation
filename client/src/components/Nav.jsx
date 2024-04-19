import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/LoginService";

const Nav = (props) => {
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
        <header>
            <nav className="d-flex justify-content-around p-2 mb-2">
                <div className="d-flex align-self-center">
                    <h2 className="display-1">Nav bar - with user info</h2>
                </div>
                <div className="d-flex align-items-center">
                    <Link to={"/"} onClick={() => logoutHandler()}>
                        <u>logout</u>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
