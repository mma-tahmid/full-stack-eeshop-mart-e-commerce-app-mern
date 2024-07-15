import React from 'react';
import Layout from '../Components/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const AllCategoriesPage = () => {

    const categories = useCategory()


    return (

        <>
            <Layout title={"All Categories"}>


                <div className="container">
                    <div className="row">

                        {
                            categories.map((singlecategory, i) => {

                                return (

                                    <div key={i} className="col-md-6 mt-5 mb-3 gx-3 gy-3">

                                        <Link className='text-decoration-none' to={`/category/${singlecategory.slug}`}> 


                                            <div className="card" style={{ width: '18rem' }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{singlecategory.categoryName}</h5>
                            
                                                    <button  className="btn btn-primary mt-3">Click here</button>
                                                </div>
                                            </div>

                                        </Link>

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

export default AllCategoriesPage;