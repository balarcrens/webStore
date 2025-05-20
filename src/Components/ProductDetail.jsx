import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from './Alert';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/slices/cartslice';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!localStorage.getItem("auth-token")) {
                window.location.href = '/signup'
            }
            const res = await fetch(`https://webstore-backend-1boc.onrender.com/api/product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
                body: JSON.stringify(),
            });
            const data = await res.json();
            setProduct(data.product);
        };
        fetchProduct();  
    }, [id]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        try {
            const res = await fetch("https://webstore-payment.onrender.com/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: product.price * quantity, // in INR
                    currency: "INR",
                    receipt: `receipt_${product._id}`,
                    notes: {
                        productName: product.name,
                        productId: product._id,
                    },
                }),
            });

            const order = await res.json();

            const options = {
                key: "rzp_test_YDl1mSfAIgmAz6", // Replace with your Razorpay key
                amount: order.amount * quantity,
                currency: order.currency,
                name: "Web Store",
                description: product.name,
                order_id: order.id,
                handler: async function (response) {
                    // Verify payment
                    const verifyRes = await fetch("https://webstore-payment.onrender.com/verify-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.status === "ok") {
                        toast.success("Order Successfully Placed", {
                            duration: 1500
                        });
                    } else {
                        toast.error("Payment Verfication Failed", {
                            duration: 1500
                        });
                    }
                },
                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Payment Error:", err);
            alert("Something went wrong!");
        }
    };

    if (!product) return <p className="text-center py-5">Loading product...</p>;

    const inc = () => {
        setQuantity(quantity + 1);
    }
    const desc = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="container py-5 my-5" style={{ backgroundColor: "#EEF2F7" }}>
            <div className="row my-5">
                <div className="col-md-6 d-flex" style={{ justifyContent: "center" }}>
                    <img src={`https://webstore-vp2d.onrender.com/${product.image}`} alt={product.name} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="mb-3">{product.name}</h1>
                    <h4 className="text-muted mb-3">₹{product.price}</h4>
                    <p> Maximum order is must be less than <b>500000Rs</b>. </p>
                    <p className="mb-4">{product.description}</p>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Quantity:</label>
                        <div className='d-flex flex-wrap'>
                            <button className='btn btn-primary m-0 px-3' onClick={desc}>-</button>
                            <input type="number" className="form-control text-center" style={{ width: "15%", minWidth: "47px" }} min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} disabled />
                            <button className='btn btn-primary m-0' onClick={inc}>+</button>
                        </div>
                    </div>
                    <div className="">
                        Payable Amount : {product.price * quantity} <br />
                    </div>
                    <div className="d-flex gap-3">
                        <button onClick={e => { dispatch(addItem({ product: product })) }} className="btn btn-primary mt-3">Add to Cart</button>
                        <button onClick={handlePayment} className="btn btn-primary mt-3">Buy Now</button>
                    </div>
                </div>
            </div>
            <Alert />
        </div>
    );
}
