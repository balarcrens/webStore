import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)', minHeight: '67vh' }}>
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://ebz-static.s3.ap-south-1.amazonaws.com/easebuzz-static/upi-credit-cards-v1.png"
              alt="About WebStore"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-4 fw-bold text-primary">Welcome to WebStore</h1>
            <p className="fs-5 text-muted">
              WebStore is your one-stop destination for modern and secure online shopping.
              From smart checkout to seamless refunds, we provide a reliable and user-friendly experience for all.
            </p>
            <p className="fs-5 text-muted">
              Whether you're buying your first item or placing your hundredth order,
              we ensure that every click is smooth, every payment is secure, and every transaction matters.
            </p>
            <Link to="/contact" className="btn btn-primary px-4 mt-3">
              <i className="bi bi-chat-dots-fill me-2"></i>Contact Us
            </Link>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <h5 className="fw-bold mb-2">🛒 Easy Shopping</h5>
              <p className="text-muted">Our intuitive platform helps you shop effortlessly.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <h5 className="fw-bold mb-2">🔒 Secure Payments</h5>
              <p className="text-muted">All transactions are encrypted and protected.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <h5 className="fw-bold mb-2">💬 Friendly Support</h5>
              <p className="text-muted">Need help? We’re just a message away, 24/7.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
