import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext()


// const [auth, setAuth] = useState({
//     user: null,
//     token: ""
// })


// Normal State ka Global State ka convert korar jonno AuthProvider 

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });


    //set Default axios property

    axios.defaults.headers.common['Authorization'] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.userss,
                token: parseData.createToken
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {/* auth & setAuth ka sobgaijai use korte parbo */}

            {children}

        </AuthContext.Provider>
    )

}

//Create Custom Hook

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }