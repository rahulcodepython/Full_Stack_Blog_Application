import React, { useState } from 'react'
import parseddate from '../../scripts/parseddate';
import { useRouter } from 'next/router'
import CommentForm from './commentForm';

export default function comment({ data, user, blogId, parentId }) {

    const router = useRouter();

    const [toggleReplyAndEditForm, setToggleReplyAndEditForm] = useState(false)
    const [commentForEditing, setCommentForEditing] = useState(false)
    const [editCommentId, setEditCommentId] = useState(false)

    const deleteComment = (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };

        fetch(`http://127.0.0.1:8000/api/editcomment/${id}/`, options)
            .then(() => router.reload())
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="d-flex">
                <div className="comment-img">
                    <img src={`http://127.0.0.1:8000/${data.uploader.userImage}`} alt="" style={{ "borderRadius": "100%" }} />
                </div>
                <div>
                    <h5>
                        <a href="">{data.uploader.name}</a>
                        <a className="reply" onClick={() => {
                            toggleReplyAndEditForm === true ? setToggleReplyAndEditForm(false) : setToggleReplyAndEditForm(true)
                        }}
                            style={{
                                "cursor": "pointer"
                            }}>
                            <i className="bi bi-reply-fill"></i>
                            Reply
                        </a>
                        {
                            Number(user) === data.uploader.id ? <>
                                <a className="reply" onClick={() => {
                                    setCommentForEditing(data.comment)
                                    setEditCommentId(data.id_no)
                                    toggleReplyAndEditForm === true ? setToggleReplyAndEditForm(false) : setToggleReplyAndEditForm(true)
                                }} style={{ "cursor": "pointer" }}>
                                    <i className="bi bi-pencil-fill"></i>
                                    Edit
                                </a>
                                <a className="reply" onClick={() => deleteComment(data.id_no)} style={{ "cursor": "pointer" }}>
                                    <i className="bi bi-trash-fill"></i>Delete
                                </a>
                            </> : ''
                        }
                    </h5>
                    {parseddate(data.created)}
                    <p style={{ "fontStyle": "italic" }}>{data.comment}</p>
                </div>
            </div>
            {
                toggleReplyAndEditForm && <CommentForm user={user} blogId={blogId} parentId={parentId} commentForEditing={commentForEditing} selfId={editCommentId} />
            }
        </>
    )
}
