import React from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router';

export default function commentForm({ user, blogId, parentId, commentForEditing, selfId }) {

    const router = useRouter();

    const addNewComment = (comment) => {
        const options = {
            method: commentForEditing ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: commentForEditing ? `{"comment":"${comment}"}` : `{"comment":"${comment}","parentBlog":${blogId}${parentId ? `,"master":${parentId}}` : "}"}`
        };

        const apiURL = commentForEditing ? `http://127.0.0.1:8000/api/editcomment/${selfId}/` : 'http://127.0.0.1:8000/api/addcomment/'

        fetch(apiURL, options)
            .then(response => response.json())
            .then(response => {
                router.reload()
            })
            .catch(err => console.error(err));
    }

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            comment: commentForEditing ? commentForEditing : '',
        },
        onSubmit: (value) => {
            addNewComment(value.comment);
        }
    })

    return (
        <div className="reply-form" id="commentForm" style={{ "marginBottom": "2rem", "marginTop": "0" }}>
            <h4>
                Leave a Reply
            </h4>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col form-group">
                        <textarea name="comment" className="form-control" placeholder="Your Comment*" onChange={handleChange} value={values.comment}></textarea>
                    </div>
                </div>
                <button type="submit" className={`btn btn-${user === 'Guest' ? 'secondary disabled' : 'primary'}`}>Post Comment</button>
            </form>
        </div>
    )
}
