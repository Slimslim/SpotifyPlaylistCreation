import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const storeIdInLocalStorage = (id) => {
        window.localStorage.setItem("UUID", id);
    };

    return (
        <userContext.Provider value={{ user, setUser, storeIdInLocalStorage }}>
            {props.children}
        </userContext.Provider>
    );
};
