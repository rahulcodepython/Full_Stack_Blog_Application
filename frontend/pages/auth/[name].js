import React from 'react'
import Indexlayout from '../../layout/home/indexlayout'
import LoginForm from '../../components/home/loginForm';
import RegisterForm from '../../components/home/registerForm';

export default function authPage({ pageName }) {

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
                                    {
                                        pageName === "login" ? <LoginForm /> : <RegisterForm />
                                    }
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