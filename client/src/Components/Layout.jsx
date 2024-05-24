import React from 'react';
import { Helmet } from "react-helmet";
import Header from './NavBarComponent';
import Footer from './FooterComponent';


const Layout = ({ children, title, description, keywords, author }) => {

    return (

        <>

            {/* React SEO CODE  */}

            <Helmet>
                <meta charSet="utf-8" />

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />

                <title>{title}</title>

            </Helmet>

            {/* END REACT SEO CODE */}


            <Header />

            <main style={{ minHeight: '70vh' }}>

                {children}

            </main>

            <Footer />


        </>
    );
};


Layout.defaultProps = {
    title: "E-Commerce App -shop now",
    description: "mern Stack Project",
    keywords: "mern, react,node, express js, mongodb",
    author: "tahmid"
}

export default Layout;