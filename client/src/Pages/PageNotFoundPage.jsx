import React from 'react';
import Layout from '../Components/Layout';
import "./css/pageNotFoundPage.css"
import { Link } from 'react-router-dom';

const PageNotFoundPage = () => {

    return (

        <>
            <Layout title={"go back - page not found"}>
                <div className="pnf">
                    <h1 className="pnf-title">404</h1>
                    <h2 className="pnf-heading">Oops ! Page Not Found</h2>
                    <Link to="/" className="pnf-btn">
                        Go Back
                    </Link>
                </div>
            </Layout>

        </>
    );
};

export default PageNotFoundPage;