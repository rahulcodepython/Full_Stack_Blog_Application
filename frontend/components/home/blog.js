import React from 'react'
import Link from 'next/link'
import HeartIcon from './heartIcon'
import parseddate from '../../scripts/parseddate'

export default function Blog({ blogs }) {
    return (
        <>
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
                                <li className="d-flex align-items-center">
                                    <img src={`http://127.0.0.1:8000${blog.author.userImage}`} alt='' width={40} height={40} style={{ "borderRadius": "100%", "marginRight": "0.5rem" }} />
                                    <a>{blog.author.name}</a>
                                </li>

                                <li className="d-flex align-items-center">
                                    <i className="bi bi-clock"></i>
                                    <a>{parseddate(blog.created)}</a>
                                </li>

                                <li className="d-flex align-items-center">
                                    <HeartIcon like={blog.like} />
                                    <a>{blog.likeNo}</a>
                                </li>

                                <li className="d-flex align-items-center">
                                    <i className="bi bi-chat-dots"></i>
                                    <a>{blog.commentNo} Comments</a>
                                </li>

                                <li className="d-flex align-items-center">
                                    <i className="bi bi-card-list"></i>
                                    <a>{blog.category}</a>
                                </li>
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
        </>
    )
}
