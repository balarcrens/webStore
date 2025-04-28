import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            {
                isLoading && <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Please wait, fetching your notes...</p>
                    </div>
                </div>
            }
            <div>
                <div className="container text-center py-5" style={{ backgroundColor: "#EEF2F7" }}>
                    <h1 className="display-5"><b>Find the Best Deals Here!</b></h1>
                    <p className="lead">Shop electronics, fashion, books and more.</p>
                    <Link to="/product" className="btn btn-primary btn-lg mt-3">Start Shopping</Link>
                </div>

                <Product />
            </div>
        </>
    )
}
