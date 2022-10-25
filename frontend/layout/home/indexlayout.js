import React from 'react';
import Navbar from "../../components/home/navbar";
import Footer from "../../components/home/footer";

export default function indexlayout({ children }) {
    return (
        <>
            <Navbar id="header" className="header fixed-top" />
            {children}
            <Footer />
        </>
    )
}
