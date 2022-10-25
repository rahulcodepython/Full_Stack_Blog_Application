import React, { useEffect, useState } from 'react'
import Bloglayout from '../../layout/home/bloglayout';
import Comments from '../../components/home/comments';
import parseddate from '../../scripts/parseddate';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function blog({ blog, categories, recentBlogs }) {

    const [comment, setComment] = useState([])
    const [nextLink, setNextLink] = useState(`http://127.0.0.1:8000/api/comments/${blog.id_no}/`)
    const [hasMore, setHasMore] = useState(true)
    const [totalComment, setTotalComment] = useState(1)

    const fetchNextComment = async () => {
        await fetch(nextLink)
            .then(async response => await response.json())
            .then(response => {
                setComment(comment.concat(response.results))
                setTotalComment(response.count - response.results.length)
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
        <Bloglayout title={blog.title} categories={categories} recentBlogs={recentBlogs} tags={blog.seo_tags.split(',')}>
            <article className="entry entry-single">

                <div className="entry-img">
                    <img src={`http://127.0.0.1:8000${blog.image}`} alt="" className="img-fluid" style={{
                        minWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                    }} />
                </div>

                <h2 className="entry-title">
                    <a href="#">{blog.title}</a>
                </h2>

                <div className="entry-meta">
                    <ul>
                        <li className="d-flex align-items-center"><i className="bi bi-clock"></i><a href="#">{parseddate(blog.created)}</a></li>
                        <li className="d-flex align-items-center"><i className="bi bi-heart"></i><a href="#">{blog.likeNo} Likes</a></li>
                        <li className="d-flex align-items-center"><i className="bi bi-card-list"></i><a href="#">{blog.category}</a></li>
                    </ul>
                </div>

                <div className='entry-content' style={{ "margin": "2rem 0" }}>
                    {blog.content}
                </div>

                {/* <div className="entry-content">
                    <p>
                        Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                        Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda perferendis dolore.
                    </p>

                    <p>
                        Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et voluptate cupiditate.
                    </p>

                    <blockquote>
                        <p>
                            Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut. Aut eos aliquam doloribus minus autem quos.
                        </p>
                    </blockquote>

                    <p>
                        Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat.
                        Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                        Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                    </p>

                    <h3>Et quae iure vel ut odit alias.</h3>
                    <p>
                        Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui.
                        Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                        Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                    </p>
                    <img src="/assets/img/blog/blog-inside-post.jpg" className="img-fluid" alt="" />

                    <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                    <p>
                        Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                        Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                    </p>
                    <p>
                        Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                    </p>

                </div> */}

            </article>

            <div className="blog-author d-flex align-items-center">
                <img src={`http://127.0.0.1:8000${blog.author.userImage}`} className="rounded-circle float-left" alt="" />
                <div>
                    <h4>{blog.author.name}</h4>
                    <div className="social-links">
                        <a href="">{blog.author.profession}</a>
                    </div>
                    <p>{blog.author.userBio}</p>
                </div>
            </div>

            <InfiniteScroll dataLength={totalComment} next={fetchNextComment} hasMore={hasMore} loader={<h4>Loading...</h4>}>
                <Comments commentno={blog.commentNo} comments={comment} user={blog.requestedUser} />
            </InfiniteScroll>
        </Bloglayout>
    )
}


export async function getServerSideProps(context) {

    const blog_id = context.query.id
    const response_blog = await fetch(`http://127.0.0.1:8000/api/blog/${blog_id}`)
    const data_blog = await response_blog.json()

    const response_category = await fetch("http://127.0.0.1:8000/api/category/")
    const data_category = await response_category.json()

    const response_recentblogs = await fetch("http://127.0.0.1:8000/api/recentblogs/")
    const data_recentblogs = await response_recentblogs.json()

    return {
        props: {
            blog: data_blog,
            categories: data_category,
            recentBlogs: data_recentblogs
        },
    }
}