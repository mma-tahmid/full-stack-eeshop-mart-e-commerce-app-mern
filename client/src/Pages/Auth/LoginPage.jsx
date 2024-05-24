import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '../../contextApi/authContext';

const LoginPage = () => {


    const navigate = useNavigate()

    // Create State
    // name is getter function & setName is a setter Function

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // custom Hook
    const [auth, setAuth] = useAuth()

    // form submit function 
    const handleSubmit = async (event) => {

        event.preventDefault()  // prevent default function use  korle,  form submit Buttton a Click korle page reload hobe na 

        try {
            const response = await axios.post("/api/v3/user-auth/login", { email, password })

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })
                setAuth({
                    ...auth,
                    user: response.data.userss,
                    token: response.data.createToken
                })

                localStorage.setItem('auth', JSON.stringify(response.data)) // json Data local storage a support kore na. tai stringify korte hoi

                navigate('/')
            }
            else {
                toast.error(response.data.message)
            }

        }

        catch (error) {
            //console.log(error)
            toast.error("Some thing went Wrong")
        }

    }



    return (

        <>

            <Layout>

                <div className='form-container'>

                    <h1> Login Page </h1>

                    <form onSubmit={handleSubmit}>



                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputEmail" className="form-label"> Email </label> */}
                            <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email' required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>


                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>



                </div>


            </Layout>

        </>
    );
};

export default LoginPage;