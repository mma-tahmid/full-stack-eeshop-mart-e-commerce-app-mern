import React from 'react';
import Layout from '../Components/Layout';
import { useSearch } from '../contextApi/searchcontext';

const SearchPage = () => {

    const [values, setValues] = useSearch()

    return (

        <>

            <Layout title={"Search-results"}>

                <div className="container">

                    <div className="text-center">
                        <h1>Search Results</h1>

                        <h6> {values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`} </h6>

                        <div className="d-flex flex-wrap mt-4">
                            {


                                values?.results.map((singleProduct, i) => {

                                    return (

                                        <div key={i} className="card m-3" style={{ width: '18rem' }}>
                                            <img src={`/api/v3/products/get-product-photo/${singleProduct._id}`} className="card-img-top" alt={singleProduct.productName} />

                                            <div className="card-body">
                                                <h5 className="card-title">{singleProduct.productName}</h5>
                                                <p className="card-text">{singleProduct.description.substring(0, 30)}... </p>
                                                <p className="card-text"> BDT {singleProduct.price} </p>


                                                <button className='btn btn-primary ms-1'> More Details</button>

                                                <button className='btn btn-secondary ms-1'> Add to Cart </button>
                                            </div>
                                        </div>

                                    )
                                }

                                )}

                        </div>
                    </div>

                </div>



            </Layout>

        </>
    );
};

export default SearchPage;