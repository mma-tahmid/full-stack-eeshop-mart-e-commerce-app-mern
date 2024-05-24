import React from 'react';
import Layout from '../Components/Layout';
import { useAuth } from '../contextApi/authContext';

const HomePage = () => {

    const [auth, setAuth] = useAuth()

    return (

        <>

            <Layout title={"home-page"}>
                <h2> Home Page  </h2>
                <pre> {JSON.stringify(auth, null, 4)} </pre>
            </Layout>

        </>
    );
};

export default HomePage;