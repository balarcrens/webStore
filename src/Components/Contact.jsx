import React from 'react'

export default function Contact() {
    return (
        <>
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Contact Us</h2>
                    <p className="text-muted">We’d love to hear from you. Please reach out with any questions or feedback.</p>
                </div>

                <div className="row g-5">
                    {/* Contact Info */}
                    <div className="col-md-5">
                        <div className="bg-light p-4 rounded shadow-sm h-100 d-flex" style={{ flexDirection: "column", justifyContent:"center" }}>
                            <h5 className="mb-4">Reach Us</h5>
                            <p><i className="bi bi-geo-alt-fill text-primary me-2"></i> 123 Webstore Street, Surat, India</p>
                            <p><i className="bi bi-telephone-fill text-primary me-2"></i> +91 98765 43210</p>
                            <p><i className="bi bi-envelope-fill text-primary me-2"></i> support@webstore.com</p>
                            <p><i className="bi bi-clock-fill text-primary me-2"></i> Mon - Sat: 10AM - 7PM</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="col-md-7">
                        <div className="p-4 rounded shadow-sm bg-white">
                            <h5 className="mb-4">Send a Message</h5>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="John Doe" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="5" placeholder="Your message..." required></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary px-4">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
