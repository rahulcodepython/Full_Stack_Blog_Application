import React from 'react'
import Head from "next/head";
import BlogForm from '../../components/home/blogForm'
import Indexlayout from '../../layout/home/indexlayout'

export default function EditBlog({ blog }) {
    return (
        <Indexlayout>
            <Head>
                <title>CodeWithRahul Blogs - Edit Blog</title>
            </Head>

            <BlogForm blog={blog} />
        </Indexlayout>
    )
}

export async function getServerSideProps(context) {

    const blog_id = context.query.id
    const response_blog = await fetch(`http://127.0.0.1:8000/api/blog/${blog_id}`)
    const data_blog = await response_blog.json()

    return {
        props: {
            blog: data_blog
        },
    }
}