import React, { useState, useContext } from "react";
import { login } from "../services/LoginService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const Login = (props) => {
    const { user, setUser, storeIdInLocalStorage } = useContext(userContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [errors, setErrors] = useState({});

    const submnitHandler = (e) => {
        e.preventDefault();

        login(userInfo)
            .then((res) => {
                console.log("Login user data: ", res[0]);
                setUser(res[0]);
                storeIdInLocalStorage(res[0]._id);
                //redirect to '/SpotifyLogin' page to request login to spotify
                navigate("/SpotifyLogin");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };
    return (
        <div className="user_login_page">
            <form onSubmit={submnitHandler} className="user_login_container">
                <div className="email_container">
                    <label className="login_labels">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                email: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="password_container">
                    <label className="login_labels">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <button className="btn btn-light border border-dark">
                    Login
                </button>
                <p></p>
                <p className="login_labels">
                    Don't have an account yet ?
                    <Link to={"/register"}>Sing up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
