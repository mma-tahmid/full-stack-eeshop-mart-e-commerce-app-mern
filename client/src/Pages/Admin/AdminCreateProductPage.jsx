import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import AdminMenu from '../../Components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios'

import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select  // option for drop down menu 

const AdminCreateProductPage = () => {

    const navigate = useNavigate()

    // State for get All Category 
    const [categories, setCategories] = useState([])
    //create state for form manage
    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [categorys, setCategorys] = useState("")
    const [photo, setPhoto] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")


    // get All Categories

    const fetchAllCategoryData = async () => {

        try {
            const response = await axios.get("/api/v3/category/get-all-category")
            if (response.data.success) {
                setCategories(response.data.output) // output comes from backend
                //console.log(response.data.output)
            }

        }

        catch (error) {
            //console.log(error);
            toast.error("Something went wrong")

        }

    }

    useEffect(() => {
        fetchAllCategoryData()

    }, [])


    // Create Product function
    const handleCreate = async (event) => {
        event.preventDefault()

        try {
            // use formData
            const productData = new FormData()

            productData.append("productName", productName)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("categorys", categorys)
            productData.append("photo", photo)
            productData.append("quantity", quantity)
            productData.append("shipping", shipping)

            // if i don't want to use form data than wrap all input and select tag tags with in form tag and add handle create function on form onSubmit event

            const response = await axios.post("/api/v3/products/create-product", productData)

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })
                navigate("/dashboard/admin/products-list")

                // setCategoryName("") // After click submit Button Input field will be clear

                // fetchAllCategoryData() // update all category list 

            }

            else {
                toast.error(response.data.message)
            }

        }
        catch (error) {

            //console.log(error)
            toast.error("Something Went wrong")


        }

    }

    return (

        <>
            <Layout title={"Dashboard-Create Product"}>

                <div className="container m-3 p-3 ">
                    <div className="row">

                        <div className="col-md-3">
                            <AdminMenu />
                        </div>

                        <div className="col-md-9">
                            <h1> Create Product </h1>

                            <div className="m-1 w-75">
                                <Select variant={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3'
                                    onChange={(value) => { setCategorys(value) }} // value its a props
                                >

                                    {
                                        categories?.map((catg, i) => {

                                            return (

                                                <Option key={i} value={catg._id}>

                                                    {catg.categoryName}
                                                </Option>
                                            )
                                        })

                                    }


                                </Select>


                                <div className="mb-3">
                                    <label className='btn btn-outline-primary col-md-12'>

                                        {photo ? photo.name : "Upload Photo"}

                                        {/* condition: photo thakle photo r name show korbe -> Ar photo na thakle Upload photo likha show korbe   */}

                                        <input type="file" name='photo' accept='image/*' onChange={(e) => { setPhoto(e.target.files[0]) }} hidden />
                                        {/* hidden attribute use for hide "choose file" text */}
                                    </label>
                                </div>

                                {/* show Image preview (use Browser property) */}

                                <div className="mb-3">
                                    {photo && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />

                                        </div>
                                    )}
                                </div>

                                {/* Others input field */}

                                <div className="mb-3">

                                    <input type="text" className='form-control' placeholder='Write a Product name'
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">

                                    <textarea type="text" className='form-control' placeholder='Write a Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">

                                    <input type="number" min="0" className='form-control' placeholder='Enter the Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">

                                    <input type="number" min="0" className='form-control' placeholder='Enter the Quantity'
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <Select
                                        variant={false}
                                        placeholder="Select Shipping "
                                        size="large"
                                        showSearch
                                        className="form-select mb-3"
                                        onChange={(value) => {
                                            setShipping(value);
                                        }}
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>

                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={handleCreate}>
                                        CREATE PRODUCT
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
};

export default AdminCreateProductPage;