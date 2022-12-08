import React from 'react'

export default function recentblogs({ blogs }) {
    return (
        <section id="recent-blog-posts" className="recent-blog-posts">

            <div className="container" dataaos="fade-up">

                <header className="section-header">
                    <h2>Blog</h2>
                    <p>Recent posts form our Blog</p>
                </header>

                <div className="row">

                    <div className="col-lg-4">
                        <div className="post-box">
                            <div className="post-img"><img src={`http://127.0.0.1:8000/${blogs[0].image}`} className="img-fluid" alt="" /></div>
                            <span className="post-date">{blogs[0].category}&nbsp; Author: {blogs[0].author}</span>
                            <h3 className="post-title">{blogs[0].title}</h3>
                            <a href={`/blog/${blogs[0].id_no}`} className="readmore stretched-link mt-auto"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="post-box">
                            <div className="post-img"><img src={`http://127.0.0.1:8000/${blogs[1].image}`} className="img-fluid" alt="" /></div>
                            <span className="post-date">{blogs[1].category}&nbsp; Author: {blogs[1].author}</span>
                            <h3 className="post-title">{blogs[0].title}</h3>
                            <a href={`/blog/${blogs[1].id_no}`} className="readmore stretched-link mt-auto"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="post-box">
                            <div className="post-img"><img src={`http://127.0.0.1:8000/${blogs[2].image}`} className="img-fluid" alt="" /></div>
                            <span className="post-date">{blogs[2].category}&nbsp; Author: {blogs[2].author}</span>
                            <h3 className="post-title">{blogs[0].title}</h3>
                            <a href={`/blog/${blogs[2].id_no}`} className="readmore stretched-link mt-auto"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
