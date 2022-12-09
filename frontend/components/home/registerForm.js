import Link from 'next/link'
import React from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function RegisterForm() {

    const router = useRouter()
    const [cookies, setCookie] = useCookies(['refreshToken']);

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            name: '',
            profession: '',
            password: '',
            userBio: ''
        },
        onSubmit: (value) => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{"email":"${value.email}","name":"${value.name}","profession":"${value.profession}","password":"${value.password}","userBio":"${value.userBio}"}`
            };

            fetch('http://127.0.0.1:8000/user/addnewuser/', options)
                .then(response => response.json())
                .then(response => {
                    const options = {
                        method: 'POST',
                        body: `{"email":"${value.email}","password":"${value.password}"}`,
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
                })
        }
    })

    return (
        <form onSubmit={handleSubmit} className="php-email-form">
            <div className="row gy-4">
                <div className="col-md-12 ">
                    <input type="email" className="form-control" name="email" value={values.email} onChange={handleChange} placeholder="Your Email" required />
                </div>

                <div className="col-md-12 ">
                    <input type="text" className="form-control" name="name" value={values.name} onChange={handleChange} placeholder="Your Full Name" required />
                </div>

                <div className="col-md-12 ">
                    <input type="text" className="form-control" name="profession" value={values.profession} onChange={handleChange} placeholder="Your Profession" required />
                </div>

                <div className="col-md-12">
                    <input type="password" className="form-control" name="password" value={values.password} onChange={handleChange} placeholder="password" required />
                </div>

                <div className="col-md-12">
                    <textarea className="form-control" name="userBio" rows="6" value={values.userBio} onChange={handleChange} placeholder="Something about you" required></textarea>
                </div>

                <div className="col-md-12 text-center">
                    <button type="submit" style={{ "width": "50%" }}>Register</button>
                </div>

                <div className="col-md-12 text-center">
                    <b>OR</b>
                </div>

                <div className="col-md-12 text-start text-secondary">
                    If you have already an account.
                </div>

                <div className="col-md-12 text-center">
                    <Link href="/auth/login">
                        <button type="submit" style={{ "width": "50%" }}>
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
