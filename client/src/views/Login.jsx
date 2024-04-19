import React, { useState } from "react";
import { login } from "../services/LoginService";
import { Link, Navigate, useNavigate } from "react-router-dom";

// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const Login = (props) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [errors, setErrors] = useState({});

    const submnitHandler = (e) => {
        e.preventDefault();

        login(userInfo)
            .then((res) => {
                console.log(res);
                navigate("/SpotifyLogin");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };
    return (
        <div>
            <h1 className="w-50 mx-auto">Login page</h1>

            <form
                onSubmit={submnitHandler}
                className="w-50 mx-auto p-3 border border-2 border-dark"
            >
                <div className="form-group mb-2">
                    <div className="d-flex gap-3">
                        <label>Email</label>
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
                </div>
                <div className="form-group mb-2">
                    <div className="d-flex gap-3">
                        <label>Password</label>
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
                </div>
                <button className="btn btn-light border border-dark">
                    Login
                </button>
                <p>
                    Don't have an account yet ?
                    <Link to={"/register"}>Sing up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
