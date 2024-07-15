import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Layout from '../Components/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryWiseProduct = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const params = useParams()

    useEffect(() => {
        if (params?.slug) getProductsByCategory()

    }, [params?.slug])


    const getProductsByCategory = async () => {

        try {
            const response = await axios.get(`/api/v3/products/category-wise-product/${params.slug}`)

            setCategory(response.data.output1)
            setProducts(response.data.output2)


            // console.log(response.data.output1)
            //console.log(response?.data?.output2)
        }

        catch (error) {
            console.log(error)
        }

    }



    return (

        <>

            <Layout>

                <div className="container">
                    <h1> Category wise Product </h1>

                    {category && <h4 className='text-center'>Category- {category.categoryName}</h4>}

                    <h6 className='text-center'> {products?.length} results found</h6>


                    <div className="row">
                        <div className="col-md-9 offset-1">

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

                            {/* <div className='m-2 p-3'>

                                {products && products.length < total && (
                                    <button className='btn btn-warning' onClick={(e) => {
                                        e.preventDefault()

                                        setPage(page + 1)
                                    }}>
                                        {loading ? "Loading" : "Load More"}
                                    </button>
                                )

                                }

                            </div> */}
                        </div>
                    </div>


                </div>


            </Layout>

        </>
    );
};

export default CategoryWiseProduct;