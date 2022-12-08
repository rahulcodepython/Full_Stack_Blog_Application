import React, { useState, useEffect } from 'react';
import Bloglayout from '../../layout/home/bloglayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import Blog from '../../components/home/blog';

export default function categoryBlog({ allBlogs, next, categories, recentBlogs }) {
    const [blogs, setBlogs] = useState(allBlogs)
    const [nextLink, setNextLink] = useState(next)
    const [hasMore, setHasMore] = useState(true)
    const [dataLength, setDataLength] = useState(1)

    const fetchNextBlog = async () => {
        if (nextLink !== null) {
            await fetch(nextLink)
                .then(async (response) => await response.json())
                .then((response) => {
                    setBlogs(blogs.concat(response.results))
                    setDataLength(dataLength + response.results.length)
                    if (response.next === null) {
                        setHasMore(false)
                    }
                    else {
                        setHasMore(true)
                        setNextLink(response.next);
                    }

                })
        }
        else {
            setHasMore(false)
            setDataLength(0)
        }
    }

    return (
        <Bloglayout title='All Blogs' categories={categories} recentBlogs={recentBlogs}>
            <InfiniteScroll dataLength={dataLength} next={fetchNextBlog} hasMore={hasMore} loader={<h4>Loading...</h4>}>
                <Blog blogs={blogs} />
            </InfiniteScroll>
        </Bloglayout>
    )
}

export async function getServerSideProps(context) {

    const blog_category = context.query.name
    const response_allBlogs = await fetch(`http://127.0.0.1:8000/api/blogs/${blog_category}`)
    const data_allBlogs = await response_allBlogs.json()

    const response_category = await fetch("http://127.0.0.1:8000/api/category/")
    const data_category = await response_category.json()

    const response_recentblogs = await fetch("http://127.0.0.1:8000/api/recentblogs/")
    const data_recentblogs = await response_recentblogs.json()

    return {
        props: {
            allBlogs: data_allBlogs.results,
            next: data_allBlogs.next,
            categories: data_category,
            recentBlogs: data_recentblogs
        },
    }
}