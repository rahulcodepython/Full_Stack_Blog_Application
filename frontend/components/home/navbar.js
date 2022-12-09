import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie";

export default function navbar() {

    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

    const [classNameNavbar, setClassNameNavbar] = useState('')
    const [classNameToggle, setClassNameTclassNameToggle] = useState('list')
    const [classNameDropdown, setClassNameDropdown] = useState('')
    const [shadow, setShadow] = useState("none")
    const [bg, setBg] = useState("none")
    const [userData, setUserData] = useState({ "userType": "Guest" })

    const getUserDataWhileAccessTokenPresent = (token) => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const fetchedObject = fetch('http://127.0.0.1:8000/user/getdata', options)
            .then(response => response.json())
            .then(response => { return response })
            .catch(err => console.error(err));

        return fetchedObject;
    }

    const getUserDataWhileRefreshTokenPresent = (token) => {
        const options = {
            method: 'POST',
            body: `{"refresh": "${token}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getUserDataAfterRefreshingAllTokens = fetch('http://127.0.0.1:8000/token/refresh/', options)
            .then(response => response.json())
            .then(response => {
                setCookie("refreshToken", response.refresh, { path: '/', maxAge: `${60 * 60 * 24}` })
                sessionStorage.setItem("accessToken", response.access)
                return getUserDataWhileAccessTokenPresent(response.access)
            })
            .catch(err => console.error(err));

        return getUserDataAfterRefreshingAllTokens;
    }

    const toggleMobile = () => {
        if (classNameToggle === 'list') {
            setClassNameNavbar('navbar-mobile')
            setClassNameTclassNameToggle('x')
        }
        else {
            setClassNameNavbar('')
            setClassNameTclassNameToggle('list')
        }
    }

    const toggleDropDown = () => {
        if (classNameDropdown === '') {
            setClassNameDropdown('dropdown-active')
        }
        else {
            setClassNameDropdown('')
        }
    }

    const logout = () => {
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("userid")
        removeCookie(['refreshToken']);
        router.reload()
    }

    useEffect(() => {
        if (sessionStorage.getItem("accessToken")) {
            const returnedObject = getUserDataWhileAccessTokenPresent(sessionStorage.getItem("accessToken"))
            returnedObject.then((obj) => {
                setUserData(obj)
                sessionStorage.setItem("userid", obj.id)
            })
        }
        else if (cookies.refreshToken) {
            const returnedObject = getUserDataWhileRefreshTokenPresent(cookies.refreshToken);
            returnedObject.then((obj) => {
                setUserData(obj)
                sessionStorage.setItem("userid", obj.id)
            })
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY === 0) {
                setShadow("none");
                setBg("none");
            }
            else {
                setShadow("sm");
                setBg("white");
            }
        })

    }, [])

    return (
        <header id="header" className={`header fixed-top shadow-${shadow} p-3 mb-5 bg-${bg} rounded`}>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

                <a href="/" className="logo d-flex align-items-center">
                    <img src="/assets/img/logo.png" alt="" />
                    <span>FlexStart</span>
                </a>

                <nav id="navbar" className={`navbar ${classNameNavbar}`}>
                    <ul>
                        <li><Link className="nav-link scrollto active" href="/#hero">Home</Link></li>
                        <li><Link className="nav-link scrollto" href="/#about">About</Link></li>
                        <li><Link className="nav-link scrollto" href="/#services">Services</Link></li>
                        <li><Link className="nav-link scrollto" href="/#portfolio">Portfolio</Link></li>
                        <li><Link className="nav-link scrollto" href="/#pricing">Pricing</Link></li>
                        <li><Link href="/blogs">Blogs</Link></li>
                        <li><Link className="nav-link scrollto" href="/#contact">Contact</Link></li>
                        {
                            userData.userType ? <li className="dropdown">
                                <a href="#" onClick={toggleDropDown}>
                                    <span>
                                        <img src="/assets/img/guest.png" style={{
                                            "width": "3rem",
                                            "height": "3rem",
                                            "borderRadius": "100%",
                                            "marginRight": "0.3rem"
                                        }} />
                                        Guest
                                    </span>
                                    <i className="bi bi-chevron-down"></i>
                                </a>
                                <ul className={classNameDropdown}>
                                    <li><Link href="/auth/login">Login</Link></li>
                                    <li><Link href="/auth/new">Register</Link></li>
                                    <li><a href="#">Drop Down 3</a></li>
                                    <li><a href="#">Drop Down 4</a></li>
                                </ul>
                            </li>
                                :
                                <li className="dropdown">
                                    <a href="#" onClick={toggleDropDown}>
                                        <span>
                                            <img src={`http://127.0.0.1:8000/${userData.userImage}`} style={{
                                                "width": "3rem",
                                                "height": "3rem",
                                                "borderRadius": "100%",
                                                "marginRight": "0.3rem"
                                            }} />
                                            {userData.name}
                                        </span>
                                        <i className="bi bi-chevron-down"></i>
                                    </a>
                                    <ul className={classNameDropdown}>
                                        <li>
                                            <a href='#' onClick={() => logout()}>
                                                Logout
                                            </a>
                                        </li>
                                        <li><Link href="/uploadblog">Add New Blog</Link></li>
                                    </ul>
                                </li>
                        }
                    </ul>
                    <i className={`bi bi-${classNameToggle} mobile-nav-toggle`} onClick={toggleMobile}></i>
                </nav>

            </div>
        </header>
    )
}
