import React from "react";
import Head from "next/head";
import Indexlayout from "../layout/home/indexlayout";
import Hero from "../components/home/hero";
import About from "../components/home/about";
import Recentblogs from "../components/home/recentblogs";
import Services from "../components/home/services";
import Pricing from "../components/home/pricing";
import Contact from "../components/home/contact";

export default function index() {
    return (
        <Indexlayout>
            <Head>
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <meta content="" name="description" />
                <meta content="" name="keywords" />

                <title>CodeWithRahul Blogs - Home</title>

            </Head>
            <main id="main">
                <Hero />
                <About />
                <Recentblogs />
                <Services />
                <Pricing />
                <Contact />
            </main>
        </Indexlayout>
    );
}