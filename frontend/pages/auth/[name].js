import React from 'react'
import Indexlayout from '../../layout/home/indexlayout'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie";

export default function authPage({ pageName }) {

    const router = useRouter()
    const [cookies, setCookie] = useCookies(['refreshToken']);

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (value) => {
            const options = {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            fetch('http://127.0.0.1:8000/token/', options)
                .then(response => response.json())
                .then(response => {
                    setCookie("refreshToken", response.refresh, { path: '/', maxAge: `${60 * 60 * 24}` })
                    sessionStorage.setItem("accessToken", response.access)
                    router.push('/')
                })
                .catch(err => console.error(err));
        }
    })

    return (
        <Indexlayout>
            <section id="hero" className="hero d-flex align-items-center" style={{ "height": "auto" }}>
                <div className="container">

                    <section id="contact" className="contact">

                        <div className="container" dataaos="fade-up">

                            <header className="section-header">
                                <p>
                                    {
                                        pageName === 'login' ? "Login" : "Register"
                                    }
                                </p>
                            </header>

                            <div className="row gy-4">

                                <div className="col-lg-6">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                                </div>

                                <div className="col-lg-6">
                                    <form onSubmit={handleSubmit} className="php-email-form">
                                        <div className="row gy-4">
                                            {
                                                pageName === "login" ? <>
                                                    <div className="col-md-12 ">
                                                        <input type="email" className="form-control" value={values.email} onChange={handleChange} name="email" placeholder="Your Email" required />
                                                    </div>

                                                    <div className="col-md-12">
                                                        <input type="password" className="form-control" value={values.password} onChange={handleChange} name="password" placeholder="password" required />
                                                    </div>

                                                    <div className="col-md-12 text-center">
                                                        <button type="submit" style={{ "width": "50%" }}>Login</button>
                                                    </div>

                                                    <div className="col-md-12 text-end text-primary" style={{ "cursor": "pointer" }}>
                                                        Forgot Password ?
                                                    </div>
                                                </>
                                                    : <>
                                                        <div className="col-md-6 ">
                                                            <input type="text" className="form-control" name="name" placeholder="Your Full Name" required />
                                                        </div>

                                                        <div className="col-md-6 ">
                                                            <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                                        </div>

                                                        <div className="col-md-6 ">
                                                            <input type="text" className="form-control" name="profession" placeholder="Your Profession" required />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <input type="password" className="form-control" name="password" placeholder="password" required />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <textarea className="form-control" name="userBio" rows="6" placeholder="Message" required></textarea>
                                                        </div>

                                                        <div className="col-md-12 text-center">
                                                            <button type="submit" style={{ "width": "50%" }}>Register</button>
                                                        </div>
                                                    </>
                                            }
                                            <div className="col-md-12 text-center">
                                                <b>OR</b>
                                            </div>

                                            <div className="col-md-12 text-start text-secondary">
                                                {
                                                    pageName === "login" ? "If you have not any account." : "If you have already an account."
                                                }
                                            </div>

                                            <div className="col-md-12 text-center">
                                                <Link href={`${pageName === 'login' ? 'new' : 'login'}/`}>
                                                    <button type="submit" style={{ "width": "50%" }}>
                                                        {
                                                            pageName === "login" ? "Register" : "Login"
                                                        }
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </section>
        </Indexlayout>
    )
}

export async function getServerSideProps(context) {
    const pageName = context.query.name

    return {
        props: {
            pageName: pageName
        }
    }
}