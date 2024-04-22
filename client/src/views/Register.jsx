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
                navigate("/SpotifyLogin");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            });
    };
    return (
        <div>
            <h1 className="w-50 mx-auto">Register</h1>

            <form
                onSubmit={submnitHandler}
                className="w-50 mx-auto p-3 border border-2 border-dark"
            >
                <div className="form-group mb-2">
                    <div className="d-flex gap-3">
                        <label>Username</label>
                        <input
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
                </div>
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
                <div className="form-group mb-2">
                    <div className="d-flex gap-3">
                        <label>Confirm Password</label>
                        <input
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
                </div>
                <button className="btn btn-light border border-dark">
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Register;
