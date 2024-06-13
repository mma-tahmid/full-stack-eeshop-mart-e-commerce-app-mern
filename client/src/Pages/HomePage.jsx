import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { useAuth } from '../contextApi/authContext';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { prices } from '../Components/Price';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate()

    const [auth, setAuth] = useAuth()

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // state for filter
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])


    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



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

    // const fetchAllProductsData = async () => {

    //     try {
    //         const response = await axios.get("/api/v3/products/get-all-products")
    //         setProducts(response.data.output)
    //         //console.log(response.data.output)

    //     }

    //     catch (error) {
    //         //console.log()
    //         toast.error("Something went wrong")

    //     }

    // }

    const fetchAllProductsData = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`/api/v3/products/product-listts/${page}`)
            setLoading(false)
            setProducts(response.data.output)
            //console.log(response.data.output)

        }

        catch (error) {
            //console.log()
            setLoading(false)
            toast.error("Something went wrong")

        }

    }

    useEffect(() => {
        if (!checked.length || !radio.length) fetchAllProductsData()
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProducts()
    }, [checked, radio])



    // get Total Count
    const fetchTotalCountNumber = async () => {

        try {

            const response = await axios.get("/api/v3/products/product-count")
            setTotal(response.data.output)
        }

        catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        fetchTotalCountNumber()
    }, [])


    // Load More function
    const loadingMore = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`/api/v3/products/product-listts/${page}`)
            setProducts([...products, ...response.data.output])
            setLoading(false)
        }

        catch (error) {

            //console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (page === 1) return
        loadingMore()

    }, [page])

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



    // get filter Products

    const filterProducts = async () => {

        try {

            const response = await axios.post(`/api/v3/products/product-filters`, { checked, radio })
            setProducts(response.data.output)
        }
        catch (error) {
            console.log(error)

        }
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

                        <div className='d-flex flex-column mt-4'>

                            {/* Reload the Browser Automatic */}

                            <button className='btn btn-secondary w-50' onClick={() => window.location.reload()}> Reset Filter  </button>

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
                                                <p className="card-text">{singleProduct.description.substring(0, 30)}... </p>
                                                <p className="card-text"> BDT {singleProduct.price} </p>


                                                <button className='btn btn-primary ms-1' onClick={() => navigate(`/product-details/${singleProduct.slug}`)} > More Details</button>

                                                <button className='btn btn-secondary ms-1'> Add to Cart </button>
                                            </div>
                                        </div>

                                    )

                                })
                            }


                        </div>

                        <div className='m-2 p-3'>

                            {products && products.length < total && (
                                <button className='btn btn-warning' onClick={(e) => {
                                    e.preventDefault()

                                    setPage(page + 1)
                                }}>
                                    {loading ? "Loading" : "Load More"}
                                </button>
                            )

                            }

                        </div>
                    </div>


                </div>
            </Layout >

        </>
    );
};

export default HomePage;