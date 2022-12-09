import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Bloglayout from '../../layout/home/bloglayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import Blog from '../../components/home/blog';

export default function Blogs({ allBlogs, next }) {

    const [blogs, setBlogs] = useState(allBlogs)
    const [nextLink, setNextLink] = useState(next)
    const [hasMore, setHasMore] = useState(true)
    const [dataLength, setDataLength] = useState(1)
    const [totalBlogs, setTotalBlogs] = useState()

    const fetchNextBlog = async () => {
        await fetch(nextLink)
            .then(async (response) => await response.json())
            .then((response) => {
                setBlogs(blogs.concat(response.results))
                setTotalBlogs(response.count)
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

    useEffect(() => {
        if (nextLink !== null) {
            fetchNextBlog();
        }
        else {
            setHasMore(false)
            setDataLength(0)
        }
    }, [])

    return (
        <>
            <Head>
                <title>CodeWithRahul Blogs - Blogs</title>
            </Head>

            <Bloglayout title='All Blogs'>
                <InfiniteScroll dataLength={totalBlogs - dataLength} next={fetchNextBlog} hasMore={hasMore} loader={<h4>Loading...</h4>}>
                    <Blog blogs={blogs} />
                </InfiniteScroll>
            </Bloglayout >
        </>
    )
}

export async function getServerSideProps() {

    const response_allBlogs = await fetch("http://127.0.0.1:8000/api/blogs/")
    const data_allBlogs = await response_allBlogs.json()

    return {
        props: {
            allBlogs: data_allBlogs.results,
            next: data_allBlogs.next
        },
    }
}