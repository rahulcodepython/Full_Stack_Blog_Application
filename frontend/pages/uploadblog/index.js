import React from 'react'
import Head from "next/head";
import Indexlayout from '../../layout/home/indexlayout'
import BlogForm from '../../components/home/blogForm';

export default function Addblog() {

    return (
        <Indexlayout>
            <Head>
                <title>CodeWithRahul Blogs - New Blog</title>
            </Head>

            <BlogForm />
        </Indexlayout>
    )
}