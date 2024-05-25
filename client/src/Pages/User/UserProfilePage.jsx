import React from 'react';
import Layout from '../../Components/Layout';
import UserMenuLayout from '../../Components/UserMenuLayout';

const UserProfilePage = () => {

    return (

        <>

            <Layout title={"Your Profile"}>


                <div className='container-fluid p-3 m-3 '>

                    <div className="row">

                        <div className="col-md-3">

                            <UserMenuLayout />


                        </div>


                        <div className="col-md-9">
                            <h3> Your Profile </h3>

                        </div>
                    </div>

                </div>

            </Layout>
        </>
    );
};

export default UserProfilePage;