import React, { useState } from 'react';
import Bloglayout from '../layout/home/bloglayout';
import Link from 'next/link';
import parseddate from '../scripts/parseddate';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function blogs({ allBlogs, totalBlogs, next, categories, recentBlogs }) {

    const [blogs, setBlogs] = useState(allBlogs)
    const [nextLink, setNextLink] = useState(next)
    const [hasMore, setHasMore] = useState(true)
    const [dataLength, setDataLength] = useState(2)

    const fetchNextBlog = async () => {
        await fetch(nextLink)
            .then(async (response) => await response.json())
            .then(async (response) => {
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

    return (
        <Bloglayout title='All Blogs' categories={categories} recentBlogs={recentBlogs}>
            <InfiniteScroll dataLength={totalBlogs - dataLength} next={fetchNextBlog} hasMore={hasMore} loader={<h4>Loading...</h4>}>
                {
                    blogs.map((blog) => {
                        return <article className="entry" key={blog.id_no}>

                            <div className="entry-img">
                                <img src={`http://127.0.0.1:8000${blog.image}`} alt="" className="img-fluid" style={{
                                    minWidth: "100%",
                                    minHeight: "100%",
                                    objectFit: "cover",
                                }} />
                            </div>

                            <h2 className="entry-title">
                                <Link href={`/blog/${blog.id_no}`}>{blog.title}</Link>
                            </h2>

                            <div className="entry-meta">
                                <ul>
                                    {/* <li className="d-flex align-items-center"><img src={`http://127.0.0.1:8000${blog.author.userImage}`} alt='' width={40} height={40} style={{ "borderRadius": "100%", "marginRight": "0.5rem" }} /><a href="blog-single.html">{blog.author.name}</a></li> */}
                                    <li className="d-flex align-items-center"><i className="bi bi-clock"></i><a href="#">{parseddate(blog.created)}</a></li>
                                    <li className="d-flex align-items-center"><i className="bi bi-heart"></i><a href="#">{blog.likeNo} Likes</a></li>
                                    <li className="d-flex align-items-center"><i className="bi bi-chat-dots"></i><a href="#">{blog.commentNo} Comments</a></li>
                                    <li className="d-flex align-items-center"><i className="bi bi-card-list"></i><a href="#">{blog.category}</a></li>
                                </ul>
                            </div>

                            <div className="entry-content">
                                <p>
                                    {blog.description}
                                </p>
                                <div className="read-more">
                                    <Link href={`/blog/${blog.id_no}`}>Read More</Link>
                                </div>
                            </div>

                        </article>
                    })
                }
            </InfiniteScroll>
        </Bloglayout>
    )
}

export async function getServerSideProps() {

    const response_allBlogs = await fetch("http://127.0.0.1:8000/api/blogs/")
    const data_allBlogs = await response_allBlogs.json()

    const response_category = await fetch("http://127.0.0.1:8000/api/category/")
    const data_category = await response_category.json()

    const response_recentblogs = await fetch("http://127.0.0.1:8000/api/recentblogs/")
    const data_recentblogs = await response_recentblogs.json()

    return {
        props: {
            allBlogs: data_allBlogs.results,
            totalBlogs: data_allBlogs.count,
            next: data_allBlogs.next,
            categories: data_category,
            recentBlogs: data_recentblogs
        },
    }
}