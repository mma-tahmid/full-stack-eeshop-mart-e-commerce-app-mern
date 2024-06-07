import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { useAuth } from '../contextApi/authContext';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { prices } from '../Components/Price';

const HomePage = () => {

    const [auth, setAuth] = useAuth()

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // state for filter
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])



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
            ///toast.error("Something went wrong")
        }

    }

    useEffect(() => {
        fetchAllCategoryData()

    }, [])


    // get All Products

    const fetchAllProductsData = async () => {

        try {
            const response = await axios.get("/api/v3/products/get-all-products")
            setProducts(response.data.output)
            //console.log(response.data.output)

        }

        catch (error) {
            //console.log()
            toast.error("Something went wrong")

        }

    }

    useEffect(() => {
        fetchAllProductsData()
    }, [])


    // Filter By Category
    const handleFilter = (value, id) => {
        let all = [...checked]

        if (value) {
            all.push(id)
        }

        else {
            all = all.filter((c) => c !== id)
        }

        setChecked(all)

    }
    return (

        <>

            <Layout title={"All Products-Best offers"}>
                {/* <h2> Home Page  </h2>
                <pre> {JSON.stringify(auth, null, 4)} </pre> */}

                <div className="container-fluid row mt-3">

                    <div className="col-md-3">
                        <h4 className='text-center'> Filter By Category</h4>

                        <div className='d-flex flex-column flex-wrap'>
                            {
                                categories?.map((category, i) => {

                                    return (

                                        <Checkbox key={i} onChange={(e) => handleFilter(e.target.checked, category._id)}>

                                            {category.categoryName}

                                        </Checkbox>


                                    )

                                })
                            }
                        </div>


                        {/* Price Filter */}
                        <h4 className='text-center'> Filter By price </h4>

                        <div className='d-flex flex-column flex-wrap'>

                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    prices.map((product, i) => {
                                        return (
                                            <div key={i}>
                                                <Radio value={product.Array}> {product.name} </Radio>
                                            </div>

                                        )
                                    })
                                }

                            </Radio.Group>

                        </div>

                    </div>

                    <div className="col-md-9">

                        {/* {JSON.stringify(checked, null, 4)} */}
                        {/* {JSON.stringify(radio, null, 4)} */}

                        <h1 className='text-center'> All Products</h1>

                        <div className="d-flex flex-wrap">

                            {
                                products?.map((singleProduct, i) => {

                                    return (

                                        <div key={i} className="card m-3" style={{ width: '18rem' }}>
                                            <img src={`/api/v3/products/get-product-photo/${singleProduct._id}`} className="card-img-top" alt={singleProduct.productName} />

                                            <div className="card-body">
                                                <h5 className="card-title">{singleProduct.productName}</h5>
                                                <p className="card-text">{singleProduct.description} </p>


                                                <button className='btn btn-primary ms-1'> More Details</button>

                                                <button className='btn btn-secondary ms-1'> Add to Cart </button>
                                            </div>
                                        </div>

                                    )

                                })
                            }

                            <h1>Products</h1>

                        </div>
                    </div>
                </div>
            </Layout >

        </>
    );
};

export default HomePage;