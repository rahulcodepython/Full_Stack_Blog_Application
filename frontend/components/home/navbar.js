import React, { useState, useEffect } from 'react'
import Link from 'next/link'


export default function navbar() {

    const [classNameNavbar, setClassNameNavbar] = useState('')
    const [classNameToggle, setClassNameTclassNameToggle] = useState('list')
    const [classNameDropdown, setClassNameDropdown] = useState('')
    const [shadow, setShadow] = useState("none")
    const [bg, setBg] = useState("none")

    useEffect(() => {
        return () => {
            window.addEventListener('scroll', () => {
                if (window.scrollY === 0) {
                    setShadow("none");
                    setBg("none");
                }
                else {
                    setShadow("sm");
                    setBg("white");
                }
            });
        }
    }, [])

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

    return (
        <header id="header" className={`header fixed-top shadow-${shadow} p-3 mb-5 bg-${bg} rounded`}>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

                <a href="index.html" className="logo d-flex align-items-center">
                    <img src="/assets/img/logo.png" alt="" />
                    <span>FlexStart</span>
                </a>

                <nav id="navbar" className={`navbar ${classNameNavbar}`}>
                    <ul>
                        <li><a className="nav-link scrollto active" href="/#hero">Home</a></li>
                        <li><a className="nav-link scrollto" href="/#about">About</a></li>
                        <li><a className="nav-link scrollto" href="/#services">Services</a></li>
                        <li><a className="nav-link scrollto" href="/#portfolio">Portfolio</a></li>
                        <li><a className="nav-link scrollto" href="/#pricing">Pricing</a></li>
                        <li><Link href="/blogs">Blogs</Link></li>
                        <li><a className="nav-link scrollto" href="/#contact">Contact</a></li>
                        <li className="dropdown"><a href="#" onClick={toggleDropDown}><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                            <ul className={classNameDropdown}>
                                <li><a href="#">Drop Down 1</a></li>
                                <li><a href="#">Drop Down 2</a></li>
                                <li><a href="#">Drop Down 3</a></li>
                                <li><a href="#">Drop Down 4</a></li>
                            </ul>
                        </li>
                    </ul>
                    <i className={`bi bi-${classNameToggle} mobile-nav-toggle`} onClick={toggleMobile}></i>
                </nav>

            </div>
        </header>
    )
}
