import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Bloglayout from '../../layout/home/bloglayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import Blog from '../../components/home/blog';

export default function categoryBlog({ allBlogs, next, category }) {
    const [blogs, setBlogs] = useState([])
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

    useEffect(() => {
        setBlogs(allBlogs)
    }, [allBlogs])

    return (
        <>
            <Head>
                <title>CodeWithRahul Blogs - {`${category} Blogs`}</title>
            </Head>

            <Bloglayout title='All Blogs'>
                <InfiniteScroll dataLength={dataLength} next={fetchNextBlog} hasMore={hasMore} loader={<h4>Loading...</h4>}>
                    <Blog blogs={blogs} />
                </InfiniteScroll>
            </Bloglayout>
        </>
    )
}

export async function getServerSideProps(context) {

    const blog_category = context.query.category
    const response_allBlogs = await fetch(`http://127.0.0.1:8000/api/blogs/${blog_category}`)
    const data_allBlogs = await response_allBlogs.json()

    return {
        props: {
            category: blog_category,
            allBlogs: data_allBlogs.results,
            next: data_allBlogs.next
        },
    }
}