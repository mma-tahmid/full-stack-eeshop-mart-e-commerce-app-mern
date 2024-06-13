import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {

    const params = useParams()

    const [product, setProduct] = useState({}) // intialy set Object because  set empty object for single product 

    const [similarProducts, setSimilarProducts] = useState([])

    const fetchSingleProductData = async () => {

        try {
            const response = await axios.get(`/api/v3/products/get-single-products/${params.slug}`)
            if (response.data.success) {
                setProduct(response?.data.output) // output comes from backend

                fetchSimilarProductData(response.data.output._id, response.data.output.categorys._id)
                //console.log(response.data.output)
            }

        }

        catch (error) {
            //console.log(error);

        }

    }


    useEffect(() => {
        if (params?.slug)
            fetchSingleProductData()
    }, [params?.slug])

    // get Similar Product according to Category

    const fetchSimilarProductData = async (pid, cid) => {

        try {
            const response = await axios.get(`/api/v3/products/similar-product/${pid}/${cid}`)
            if (response.data.success) {
                setSimilarProducts(response?.data.output) // output comes from backend
                //console.log(response.data.output)
            }

        }

        catch (error) {
            //console.log(error);

        }

    }



    return (

        <>
            <Layout>
                {/* <h1> Product Details </h1> */}
                {/* {JSON.stringify(product,null,4)} */}

                <div className="row container mt-2">

                    <div className="col-md-6">

                        <img height="300" width={200} src={`/api/v3/products/get-product-photo/${product._id}`} className="card-img-top" alt={product.productName} />

                    </div>

                    <div className="col-md-6 ">

                        <h1 className='text-center'>Product Details</h1>
                        <h5>Name: {product.productName}</h5>
                        <h5>Description: {product.description}</h5>
                        <h5>Price: {product.price}</h5>
                        <h5>Category: {product.categorys?.categoryName}</h5>

                        <button className='btn btn-secondary ms-1'> Add to Cart </button>

                    </div>

                </div>

                <div className="row container">
                    <h3 className='text-center my-3'>Similar Products </h3>

                    {/* {JSON.stringify(similarProducts, null, 4)} */}

                    {similarProducts.length < 1 && (<p className='text-center'> No Similar Products Found</p>)}

                    <div className="d-flex flex-wrap">
                        {
                            similarProducts?.map((singleProduct, i) => {

                                return (

                                    <div key={i} className="card m-3" style={{ width: '18rem' }}>
                                        <img src={`/api/v3/products/get-product-photo/${singleProduct._id}`} className="card-img-top" alt={singleProduct.productName} />

                                        <div className="card-body">
                                            <h5 className="card-title">{singleProduct.productName}</h5>
                                            <p className="card-text">{singleProduct.description.substring(0, 30)}... </p>

                                            <p className="card-text"> BDT {singleProduct.price} </p>


                                            {/* <button className='btn btn-primary ms-1' onClick={() => navigate(`/product-details/${singleProduct.slug}`)} > More Details</button> */}

                                            <button className='btn btn-secondary ms-1'> Add to Cart </button>
                                        </div>
                                    </div>

                                )

                            })
                        }
                    </div>


                </div>
            </Layout>
        </>
    );
};

export default ProductDetailsPage;