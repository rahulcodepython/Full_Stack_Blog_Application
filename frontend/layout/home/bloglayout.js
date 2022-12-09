import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Indexlayout from './indexlayout';

export default function Bloglayout({ children, title }) {

    const [categories, setCategories] = useState([])
    const [recentBlogs, setRecentBlogs] = useState([])

    const fetchCategories = async () => {
        await fetch("http://127.0.0.1:8000/api/category/")
            .then((response) => response.json())
            .then((response) => setCategories(response))
            .catch((error) => console.log(error))
    }

    const fetchRecentBlogs = async () => {
        await fetch("http://127.0.0.1:8000/api/recentblogs/")
            .then((response) => response.json())
            .then((response) => setRecentBlogs(response))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchCategories();
        fetchRecentBlogs();
    }, [])

    return (
        <Indexlayout>
            <main>
                <section className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li><Link href="/">Home</Link></li>
                            <li>Blogs</li>
                        </ol>
                        <h2>{title}</h2>
                    </div>
                </section>

                <section id="blog" className="blog" style={{ "marginTop": "1rem" }}>
                    <div className="container" dataaos="fade-up">
                        <div className="row">
                            <div className="col-lg-8 entries">
                                {children}
                            </div>

                            <div className="col-lg-4">
                                <div className="sidebar">
                                    <h3 className="sidebar-title">Recent Posts</h3>
                                    <div className="sidebar-item recent-posts">
                                        {
                                            recentBlogs.map((blog) => {
                                                return <div className="post-item clearfix" key={blog.id_no}>
                                                    <img src={`http://127.0.0.1:8000${blog.image}`} alt="" />
                                                    <h4>
                                                        <Link href={`/blog/${blog.id_no}`}>
                                                            {blog.title}
                                                        </Link>
                                                    </h4>
                                                    <time>
                                                        {blog.author} &nbsp; {blog.category}
                                                    </time>
                                                </div>
                                            })
                                        }
                                    </div>

                                    <h3 className="sidebar-title">Categories</h3>
                                    <div className="sidebar-item categories">
                                        <ul>
                                            {
                                                categories.map((category) => {
                                                    return <li key={category.idName}>
                                                        <Link href={`/blogs/${category.idName}`}>
                                                            {category.name}
                                                        </Link>
                                                        &nbsp;
                                                        <span>({category.totalBlog})</span>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Indexlayout>
    )
}
