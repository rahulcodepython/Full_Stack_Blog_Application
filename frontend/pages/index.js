import React from "react";
import Head from "next/head";
import Indexlayout from "../layout/home/indexlayout";
import Hero from "../components/home/hero";
import About from "../components/home/about";
import Recentblogs from "../components/home/recentblogs";
import Services from "../components/home/services";
import Pricing from "../components/home/pricing";
import Contact from "../components/home/contact";

export default function index({ recentBlogs }) {
    return (
        <Indexlayout>
            <Head>
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <meta content="" name="description" />
                <meta content="" name="keywords" />

                <title>FlexStart Bootstrap Template - Index</title>

            </Head>
            <main id="main">
                <Hero />
                <About />
                <Recentblogs blogs={recentBlogs} />
                <Services />
                <Pricing />
                <Contact />
            </main>
        </Indexlayout>
    );
}


export async function getServerSideProps() {

    const response_recentblogs = await fetch("http://127.0.0.1:8000/api/recentblogs/")
    const data_recentblogs = await response_recentblogs.json()

    return {
        props: {
            recentBlogs: data_recentblogs
        },
    }
}