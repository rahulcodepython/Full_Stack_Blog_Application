import Link from 'next/link';
import React from 'react';
import Indexlayout from './indexlayout';

export default function bloglayout({ children, title, categories, recentBlogs, tags }) {
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
                                            recentBlogs.map((blogs) => {
                                                return <div className="post-item clearfix" key={blogs.id_no}>
                                                    <img src={`http://127.0.0.1:8000${blogs.image}`} alt="" />
                                                    <h4><Link href={`/blog/${blogs.id_no}`}>{blogs.title}</Link></h4>
                                                    <time>
                                                        {blogs.author}
                                                        <span style={{ "marginLeft": "1rem", "marginRight": "0.2rem" }}><i className="bi bi-card-list"></i></span>{blogs.category}
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
                                                    return <li key={category.name}>
                                                        <Link href={`/category/${category.name}`}>
                                                            {category.name}
                                                        </Link>
                                                        &nbsp;
                                                        <span>({category.totalBlog})</span>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>

                                    {
                                        tags && <>
                                            <h3 className="sidebar-title">Tags</h3>
                                            <div className="sidebar-item tags">
                                                <ul>
                                                    {
                                                        tags.map((tag) => {
                                                            return <li key={tag}><a href="#">{tag}</a></li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Indexlayout>
    )
}
