import React from 'react'
import BlogForm from '../../components/home/blogForm'
import Indexlayout from '../../layout/home/indexlayout'

export default function EditBlog({ categories, blog }) {
    return (
        <Indexlayout>
            <BlogForm categories={categories} blog={blog} />
        </Indexlayout>
    )
}


export async function getServerSideProps(context) {

    const blog_id = context.query.id
    const response_blog = await fetch(`http://127.0.0.1:8000/api/blog/${blog_id}`)
    const data_blog = await response_blog.json()

    const response_category = await fetch("http://127.0.0.1:8000/api/category/")
    const data_category = await response_category.json()

    return {
        props: {
            blog: data_blog,
            categories: data_category,
        },
    }
}