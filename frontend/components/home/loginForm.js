import React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function LoginForm() {

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
        <form onSubmit={handleSubmit} className="php-email-form">
            <div className="row gy-4">
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

                <div className="col-md-12 text-center">
                    <b>OR</b>
                </div>

                <div className="col-md-12 text-start text-secondary">
                    If you have not any account
                </div>

                <div className="col-md-12 text-center">
                    <Link href="/auth/register">
                        <button type="submit" style={{ "width": "50%" }}>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
