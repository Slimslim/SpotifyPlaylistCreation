import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/LoginService";
import { userContext } from "../context/userContext";
// import Nav from "../components/Nav";
// import DisplayAll from "../components/DisplayAll";

const Register = (props) => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [errors, setErrors] = useState({});

    const submnitHandler = (e) => {
        e.preventDefault();

        register(userInfo)
            .then((res) => {
                setUser(res);
                console.log("Registered!!!");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };
    return (
        <div>
            <h1 className="w-50 mx-auto text-white">Register</h1>

            <form
                onSubmit={submnitHandler}
                className="w-50 mx-auto p-3 border border-2 border-dark"
            >
                <div className="form-group mb-2">
                    <div className="d-flex gap-3 text-white">
                        <label>Username</label>
                        <input
                            className={
                                errors.username
                                    ? "form-control border-2 border-danger"
                                    : "form-control"
                            }
                            type="username"
                            name="username"
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
                    {errors.username ? (
                        <p className="text-danger">{errors.username.message}</p>
                    ) : null}
                </div>
                <div className="form-group mb-2 text-white">
                    <div className="d-flex gap-3">
                        <label>Email</label>
                        <input
                            className={
                                errors.email
                                    ? "form-control border-2 border-danger"
                                    : "form-control"
                            }
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
                    {errors.email ? (
                        <p className="text-danger">{errors.email.message}</p>
                    ) : null}
                </div>
                <div className="form-group mb-2 text-white">
                    <div className="d-flex gap-3">
                        <label>Password</label>
                        <input
                            className={
                                errors.password
                                    ? "form-control border-2 border-danger"
                                    : "form-control"
                            }
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
                    {errors.password ? (
                        <p className="text-danger">{errors.password.message}</p>
                    ) : null}
                </div>
                <div className="form-group mb-2 text-white">
                    <div className="d-flex gap-3">
                        <label>Confirm Password</label>
                        <input
                            className={
                                errors.confirmPassword
                                    ? "form-control border-2 border-danger"
                                    : "form-control"
                            }
                            type="password"
                            name="password"
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>
                    {errors.confirmPassword ? (
                        <p className="text-danger">
                            {errors.confirmPassword.message}
                        </p>
                    ) : null}
                </div>
                <button className="btn btn-light border border-dark">
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Register;
