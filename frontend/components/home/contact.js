import React from 'react'

export default function contact() {
    return (
        <section id="contact" className="contact">
            <div className="container" dataaos="fade-up">
                <header className="section-header">
                    <h2>Contact</h2>
                    <p>Contact Us</p>
                </header>

                <div className="row gy-4">

                    <div className="col-lg-6">
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <div className="info-box">
                                    <i className="bi bi-geo-alt"></i>
                                    <h3>Address</h3>
                                    <p>A108 Adam Street,<br />New York, NY 535022</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-box">
                                    <i className="bi bi-telephone"></i>
                                    <h3>Call Us</h3>
                                    <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-box">
                                    <i className="bi bi-envelope"></i>
                                    <h3>Email Us</h3>
                                    <p>info@example.com<br />contact@example.com</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-box">
                                    <i className="bi bi-clock"></i>
                                    <h3>Open Hours</h3>
                                    <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <form action="" method="post" className="php-email-form">
                            <div className="row gy-4">

                                <div className="col-md-6">
                                    <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                                </div>

                                <div className="col-md-6 ">
                                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                </div>

                                <div className="col-md-12">
                                    <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                                </div>

                                <div className="col-md-12">
                                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                                </div>

                                <div className="col-md-12 text-center">
                                    <button type="submit">Send Message</button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
}
