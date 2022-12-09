import React, { useState, useEffect } from 'react'

export default function Recentblogs() {

    const [recentBlogs, setRecentBlogs] = useState([])

    const fetchRecentBlogs = async () => {
        await fetch("http://127.0.0.1:8000/api/recentblogs/")
            .then((response) => response.json())
            .then((response) => setRecentBlogs(response))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchRecentBlogs();
    }, [])

    return (
        <section id="recent-blog-posts" className="recent-blog-posts">
            <div className="container" dataaos="fade-up">
                <header className="section-header">
                    <h2>Blog</h2>
                    <p>Recent posts form our Blog</p>
                </header>

                <div className="row">
                    {
                        recentBlogs.map((blog) => {
                            return <div className="col-lg-4" key={blog.id_no} style={{ "marginBottom": "1rem" }}>
                                <div className="post-box">
                                    <div className="post-img">
                                        <img src={`http://127.0.0.1:8000/${blog.image}`} className="img-fluid" alt="" />
                                    </div>
                                    <span className="post-date">
                                        {blog.category} &nbsp;
                                        Author: {blog.author}
                                    </span>
                                    <h3 className="post-title">{blog.title}</h3>
                                    <a href={`/blog/${blog.id_no}`} className="readmore stretched-link mt-auto">
                                        <span>Read More</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
