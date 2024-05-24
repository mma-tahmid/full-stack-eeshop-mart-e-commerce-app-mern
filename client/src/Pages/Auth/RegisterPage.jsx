import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import "../css/registerPage.css"
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const RegisterPage = () => {

    const navigate = useNavigate()

    // Create State
    // name is getter function & setName is a setter Function
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")


    // form submit function 
    const handleSubmit = async (event) => {

        event.preventDefault()  // prevent default function use  korle,  form submit Buttton a Click korle page reload hobe na 

        try {
            const response = await axios.post("/api/v3/user-auth/registration", { name, email, password, phone, address, answer })

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

            <Layout title="Register-E-Commerce App">

                <div className='form-container'>

                    <h1> Register Page </h1>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputName" className="form-label"> Name </label> */}
                            <input type="text" className="form-control" id="exampleInputName" placeholder='Enter your Name' required
                                value={name}
                                onChange={(event) => setName(event.target.value)} // arrow function
                            // onchange use korle input filed a type korte parbo
                            />

                        </div>

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

                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputPhone" className="form-label"> Phone </label> */}
                            <input type="text" className="form-control" id="exampleInputPhone" placeholder='Enter your  Phone Number' required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />

                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputAddress" className="form-label"> Address </label> */}
                            <input type="text" className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' required
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="exampleInputAddress" className="form-label"> Address </label> */}
                            <input type="text" className="form-control" id="exampleInputAddress" placeholder='What is your favorite sports' required
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>



                </div>

            </Layout>

        </>
    );
};

export default RegisterPage;

