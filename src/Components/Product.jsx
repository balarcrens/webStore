import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!localStorage.getItem("auth-token")) {
                window.location.href = '/login'
            }
            try {
                const res = await fetch("http://192.168.0.22:7000/api/product/fetchallproducts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token")
                    },
                    body: JSON.stringify(),
                });
                const data = await res.json();
                // console.log(data);
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Unexpected response:", data);
                    setProducts([]); // fallback
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [])

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

            <div className="container py-5" style={{ backgroundColor: "#EEF2F7" }}>
                <h2 className="mb-4 text-center my-5">Featured Products</h2>
                <div className="row g-5 text-center">
                    {
                        products.map(product => (
                            <div className="col-md-4" key={product._id}>
                                <Link to={`/product/${product._id}`} className="btn w-100">
                                    <div className="card product-card">
                                        <img src={product.image} className="card-img-top" alt={product.name} height="303px" width="202px" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">₹{product.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
