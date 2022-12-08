import React from 'react'
import Indexlayout from '../layout/home/indexlayout'
import BlogForm from '../components/home/blogForm';

export default function addblog({ categories }) {

    return (
        <Indexlayout>
            <BlogForm categories={categories} />
        </Indexlayout>
    )
}


export async function getServerSideProps() {

    const response_category = await fetch("http://127.0.0.1:8000/api/category/")
    const data_category = await response_category.json()

    return {
        props: {
            categories: data_category,
        },
    }
}