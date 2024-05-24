import React from 'react';
import Layout from '../Components/Layout';

import "./css/aboutPage.css"

const AboutPage = () => {

    return (
        <>
            <Layout title={"About us - Ecommerce App"}>


                <div className="row about-css ">
                    <div className="col-md-6 ">
                        <img
                            src="https://i.ibb.co/CK0d8nQ/about.webp"
                            alt="about"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="col-md-4">
                        <p className="text-justify mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                            perferendis eius temporibus dicta blanditiis doloremque explicabo
                            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                            commodi illum quidem neque tempora nam.
                        </p>
                    </div>
                </div>

            </Layout>

        </>
    );
};

export default AboutPage;