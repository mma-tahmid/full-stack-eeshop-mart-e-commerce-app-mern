import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ForgotPassword = () => {



    const navigate = useNavigate()


    // Create State
    // name is getter function & setName is a setter Function

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")



    // form submit function 
    const handleSubmit = async (event) => {

        event.preventDefault()  // prevent default function use  korle,  form submit Buttton a Click korle page reload hobe na 

        try {
            const response = await axios.post("/api/v3/user-auth/forgot-password", { email, newPassword, answer })

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })

                navigate('/login')
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

            <Layout title={'Forgot password - Ecommerce App'}>

                <div className='form-container'>

                    <h1> Reset Password </h1>

                    <form onSubmit={handleSubmit}>



                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputEmail" className="form-label"> Email </label> */}
                            <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email' required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder='Enter your favorite sports name' required
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your New Password' required
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                        </div>



                        <div>
                            <button type="submit" className="btn btn-primary mb-3">Reset</button>

                        </div>


                    </form>




                </div>

            </Layout>

        </>
    );
};

export default ForgotPassword;