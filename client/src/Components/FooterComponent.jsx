import React from 'react';
import "./Css/footerComponents.css"

import { Link } from 'react-router-dom';

const FooterComponent = () => {

    return (

        <>
            <div className='footer'>
                <h4 className='text-center'>All Right Reserved &copy; Tahmid</h4>

                <p className='text-center mt-3'>

                    <Link to="/about"> About </Link>
                    <Link to="/contact"> Contact </Link>
                    <Link to="/policy"> Privacy Policy </Link>

                </p>
            </div>
        </>
    );
};

export default FooterComponent;