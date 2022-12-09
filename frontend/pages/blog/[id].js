import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Bloglayout from '../../layout/home/bloglayout';
import parseddate from '../../scripts/parseddate';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentForm from '../../components/home/commentForm';
import Comment from '../../components/home/comment';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function blog({ blog }) {

    const router = useRouter();

    const [comments, setComments] = useState([])
    const [nextLink, setNextLink] = useState(`http://127.0.0.1:8000/api/comments/${blog.id_no}/`)
    const [hasMore, setHasMore] = useState(true)
    const [dataLength, setDataLength] = useState(1)
    const [like, setLike] = useState(0)
    const [likeNo, setLikeNo] = useState(blog.likeNo)
    const [user, setUser] = useState('Guest')

    const fetchNextComment = async () => {
        await fetch(nextLink)
            .then(async (response) => await response.json())
            .then(response => {
                setComments(comments.concat(response.results))
                setDataLength(dataLength + response.results.length)
                if (response.next === null) {
                    setHasMore(false)
                }
                else {
                    setHasMore(true)
                    setNextLink(response.next)
                }
            })
    }

    const likeRequestURL = `http://127.0.0.1:8000/api/addlike/${blog.id_no}/`

    const addLike = () => {

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };

        fetch(likeRequestURL, options)
            .then(response => response.json())
            .then(response => {
                if (response.Status === 'Ok') {
                    setLike(1)
                    setLikeNo(likeNo + 1)
                }
            })
            .catch(err => console.error(err));
    }

    const removeLike = () => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };

        fetch(likeRequestURL, options)
            .then(response => response.json())
            .then(response => {
                if (response.Status === 'Ok') {
                    setLike(0)
                    setLikeNo(likeNo - 1)
                }
            })
            .catch(err => console.error(err));
    }

    const deleteBlog = () => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };

        fetch(`http://127.0.0.1:8000/api/editblog/${blog.id_no}/`, options)
            .then(response => router.push("/blogs"))
    }

    useEffect(() => {
        for (const l in blog.like) {
            if (blog.like[l].id === Number(sessionStorage.getItem("userid"))) {
                setLike(1)
            }
        }

        if (sessionStorage.getItem("userid")) {
            setUser(sessionStorage.getItem("userid"))
        }

    }, [])

    return (
        <>
            <Head>
                <title>CodeWithRahul Blogs - {blog.title}</title>
            </Head>

            <Bloglayout title={blog.title}>
                <article className="entry entry-single">

                    <div className="entry-img">
                        <img src={`http://127.0.0.1:8000${blog.image}`} alt="" className="img-fluid" style={{
                            minWidth: "100%",
                            minHeight: "100%",
                            objectFit: "cover",
                        }} />
                    </div>

                    <h2 className="entry-title">
                        <a>{blog.title}</a>
                    </h2>

                    <div className="entry-meta">
                        <ul>
                            <li className="d-flex align-items-center"><i className="bi bi-clock"></i><a href="#">{parseddate(blog.created)}</a></li>
                            <li className="d-flex align-items-center"
                                style={{ "cursor": "pointer" }}
                                onClick={() => {
                                    like === 1 ? removeLike() : addLike()
                                }}>
                                <i className={`bi bi-${like === 1 ? 'heart-fill' : 'heart'}`}></i>
                                <a>
                                    {likeNo}
                                </a>
                            </li>
                            <li className="d-flex align-items-center">
                                <i className="bi bi-card-list"></i>
                                <a>{blog.category}</a>
                            </li>
                            <li className="d-flex align-items-center">
                                <i className="bi bi-pencil-fill"></i>
                                <Link href={`/uploadblog/${blog.id_no}`}>Edit Blog</Link>
                            </li>
                            <li className="d-flex align-items-center" style={{ "cursor": "pointer" }} onClick={() => deleteBlog()}>
                                <i className="bi bi-trash-fill"></i>
                                <a>Delete Blog</a>
                            </li>
                        </ul>
                    </div>

                    <div className='entry-content' style={{ "margin": "2rem 0" }}>
                        {blog.content}
                    </div>

                    <>
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
                    </>

                    <div className="entry-footer">
                        {
                            blog.seo_tags ? <>
                                <ul className='tags'>
                                    {
                                        blog.seo_tags.split(',').map((tag) => {
                                            return <li key={tag}><a>{tag}</a></li>
                                        })
                                    }
                                </ul>
                            </>
                                :
                                <></>
                        }
                    </div>

                </article>

                <div className="blog-author d-flex align-items-center">
                    <img src={`http://127.0.0.1:8000${blog.author.userImage}`} className="rounded-circle float-left" alt="" />
                    <div>
                        <h4>{blog.author.name}</h4>
                        <div className="social-links">
                            <a>{blog.author.profession}</a>
                        </div>
                        <p>{blog.author.userBio}</p>
                    </div>
                </div>

                <div className="blog-comments">

                    <h4 className="comments-count" style={{ "marginBottom": "2rem" }}>{blog.commentNo} Comments</h4>

                    <CommentForm user={user} blogId={blog.id_no} />

                    <InfiniteScroll dataLength={dataLength} next={fetchNextComment} hasMore={hasMore} loader={<h4>Loading...</h4>}>
                        {
                            comments.map((comment) => {
                                return <div id="comment-2" className="comment" key={comment.id_no}>
                                    <Comment data={comment} user={Number(user)} blogId={blog.id_no} parentId={comment.id_no} />

                                    {
                                        comment.childComment.length === 0 ? "" : comment.childComment.map((reply) => {
                                            return <div id="comment-reply-2" className="comment comment-reply" key={reply.id_no} style={{ "paddingLeft": "5rem" }}>
                                                <Comment data={reply} user={Number(user)} blogId={blog.id_no} parentId={comment.id_no} />
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </InfiniteScroll>

                </div>
            </Bloglayout>
        </>
    )
}

export async function getServerSideProps(context) {

    const blog_id = context.query.id
    const response_blog = await fetch(`http://127.0.0.1:8000/api/blog/${blog_id}`)
    const data_blog = await response_blog.json()

    return {
        props: {
            blog: data_blog
        },
    }
}