import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

export default function BlogForm({ blog }) {

    const router = useRouter();

    const [categories, setCategories] = useState([])

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: blog ? {
            "title": blog.title,
            "category": blog.category,
            "description": blog.description,
            "content": blog.content
        }
            : {
                "title": '',
                "category": '',
                "description": '',
                "content": ''
            },

        onSubmit: (value) => {
            const options = {
                method: blog ? 'PATCH' : 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    'Content-Type': "application/json"
                },
                body: `{"title":"${value.title}","category":"${value.category}","description":"${value.description}","content":"${value.content}"}`
            };

            const apiURL = blog ? `http://127.0.0.1:8000/api/editblog/${blog.id_no}/` : `http://127.0.0.1:8000/api/addblog/`

            fetch(apiURL, options)
                .then(response => response.json())
                .then(response => router.push(`/blog/${response.id_no}`))
                .catch(err => console.error(err));
        }
    })

    const fetchCategories = async () => {
        await fetch("http://127.0.0.1:8000/api/category/")
            .then((response) => response.json())
            .then((response) => setCategories(response))
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <section id="contact" className="contact" style={{ "marginTop": "4rem" }}>
            <div className="container" dataaos="fade-up">
                <header className="section-header">
                    {
                        blog ? <>
                            <h2>Update Blog</h2>
                            <p>Update Blog</p>
                        </>
                            : <>
                                <h2>New Blog</h2>
                                <p>Add New Blog</p>
                            </>
                    }
                </header>

                <div className="row gy-4">
                    <div className="col-lg-12">
                        <form onSubmit={handleSubmit} className="php-email-form" encType='multipart/form-data'>
                            <div className="row gy-4">
                                <div className="col-md-12">
                                    <input type="text" name="title" className="form-control" placeholder="Blog Title" value={values.title} onChange={handleChange} required />
                                </div>

                                <div className="col-md-12 ">
                                    <select className="form-control" name="category" value={values.category} onChange={handleChange} required>

                                        {
                                            categories.map((category) => {
                                                return <option key={category.idName} value={category.idName}>{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <textarea className="form-control" name="description" rows="6" placeholder="Blog Description" value={values.description} onChange={handleChange} required></textarea>
                                </div>

                                <div className="col-md-12">
                                    <textarea className="form-control" name="content" rows="6" placeholder="Blog Content" value={values.content} onChange={handleChange} required></textarea>
                                </div>

                                <div className="col-md-12 text-center">
                                    <button type="submit">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}