import React from 'react'
import parseddate from '../../scripts/parseddate';

export default function comments({ comments, commentno, user }) {
    return (
        <div className="blog-comments">

            <h4 className="comments-count">{commentno} Comments</h4>

            <div className="reply-form">
                <h4>Leave a Reply</h4>
                <p>Your email address will not be published. Required fields are marked * </p>

                <form action="">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <input name="name" type="text" className="form-control" placeholder="Your Name*" />
                        </div>
                        <div className="col-md-6 form-group">
                            <input name="email" type="text" className="form-control" placeholder="Your Email*" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <input name="website" type="text" className="form-control" placeholder="Your Website" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
                        </div>
                    </div>
                    <button type="submit" className={`btn btn-${user === 'Guest' ? 'secondary disabled' : 'primary'}`}>Post Comment</button>

                </form>

            </div>

            {
                comments.map((comment) => {
                    return <div id="comment-2" className="comment" key={comment.id_no}>
                        <div className="d-flex">
                            <div className="comment-img"><img src={`http://127.0.0.1:8000/${comment.uploader.userImage}`} alt="" style={{ "borderRadius": "100%" }} /></div>
                            <div>
                                <h5>
                                    <a href="">{comment.uploader.name}</a>
                                    {
                                        Number(user) === comment.uploader.id ? <>
                                            <a href="#" className="reply"><i className="bi bi-reply-fill"></i>Reply</a>
                                            <a href="#" className="reply"><i className="bi bi-pencil-fill"></i>Edit</a>
                                            <a href="#" className="reply"><i className="bi bi-trash-fill"></i>Delete</a>
                                        </> : ''
                                    }
                                </h5>
                                {parseddate(comment.created)}
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                        {
                            comment.childComment.length === 0 ? "" : comment.childComment.map((reply) => {
                                return <div id="comment-reply-2" className="comment comment-reply" key={reply.id_no}>
                                    <div className="d-flex">
                                        <div className="comment-img"><img src={`http://127.0.0.1:8000/${reply.uploader.userImage}`} alt="" style={{ "borderRadius": "100%" }} /></div>
                                        <div>
                                            <h5>
                                                <a href="">{reply.uploader.name}</a>
                                                {
                                                    Number(user) === reply.uploader.id ? <>
                                                        <a href="#" className="reply"><i className="bi bi-reply-fill"></i>Reply</a>
                                                        <a href="#" className="reply"><i className="bi bi-pencil-fill"></i>Edit</a>
                                                        <a href="#" className="reply"><i className="bi bi-trash-fill"></i>Delete</a>
                                                    </> : ''
                                                }
                                            </h5>
                                            <span>{parseddate(reply.created)}</span>
                                            <p>{reply.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}
