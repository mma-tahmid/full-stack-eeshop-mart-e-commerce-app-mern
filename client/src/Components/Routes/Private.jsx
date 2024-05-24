import { useEffect, useState } from "react";
import { useAuth } from "../../contextApi/authContext"
import { Outlet } from "react-router-dom";
import axios from 'axios'
import Spinner from "../Spinner";

export default function PrivateRotess() {


    const [ok, setOk] = useState(false)

    const [auth, setAuth] = useAuth()


    useEffect(() => {

        const authCheck = async () => {
            const response = await axios.get('/api/v3/user-auth/user-authentication')

            if (response.data.ok) {
                setOk(true)
            }

            else {
                setOk(false)
            }
        }

        if (auth?.token) authCheck()

    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />

}

