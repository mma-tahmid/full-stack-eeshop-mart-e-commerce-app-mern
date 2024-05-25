import React from 'react';
import Layout from '../../Components/Layout';
import AdminMenu from '../../Components/AdminMenu';

const AdminCreateProductPage = () => {

    return (

        <>
            <Layout title={"Dashboard-Create Product"}>

                <div className="container m-3 p-3 ">
                    <div className="row">

                        <div className="col-md-3">
                            <AdminMenu />
                        </div>

                        <div className="col-md-9">
                            <h1> Create Product Page </h1>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
};

export default AdminCreateProductPage;