import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/AdminMenu';
import Layout from '../../Components/Layout';

import axios from "axios"
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminProductListPage = () => {

    const [productList, setProductList] = useState([])


    // get All Products
    const fetchAllProductData = async () => {

        try {
            const response = await axios.get("/api/v3/products/get-all-products")
            if (response.data.success) {
                setProductList(response.data.output) // output comes from backend
                //console.log(response.data.output)
            }

        }

        catch (error) {
            console.log(error);
            toast.error("Something went wrong")

        }

    }

    //life cycle Method

    useEffect(() => {
        fetchAllProductData()
    }, [])

    return (

        <>
            <Layout>
                <div className="row">

                    <div className="col-md-3">
                        <AdminMenu />

                    </div>

                    <div className="col-md-9">

                        <h1 className='text-center'> All Products List </h1>

                        <div className="d-flex flex-wrap">
                            {
                                productList?.map((singleProduct, i) => {

                                    return (

                                        <Link key={i} className='text-decoration-none' to={`/dashboard/admin/update-single-product/${singleProduct.slug}`}>
                                            {/* //key={i} means--> unique key row return row korbe */}


                                            <div className="card m-3" style={{ width: '18rem' }}>
                                                <img src={`/api/v3/products/get-product-photo/${singleProduct._id}`} className="card-img-top" alt={singleProduct.productName} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{singleProduct.productName}</h5>
                                                    <p className="card-text">{singleProduct.description} </p>

                                                </div>
                                            </div>



                                        </Link>


                                    )

                                })
                            }
                        </div>


                    </div>
                </div>
            </Layout >
        </>
    );
};

export default AdminProductListPage;