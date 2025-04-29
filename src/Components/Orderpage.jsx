/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Orderpage() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // let orderlist;

    // Fetch orders when the component loads
    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            window.location.href = '/singup'
        }
        const fetchOrders = async () => {
            try {
                const res = await fetch("https://webstore-payment.onrender.com/get-orders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token"), // Add token if needed
                    },
                });
                const data = await res.json();
                setOrders(data);
                setIsLoading(false);
            } catch (error) {
                toast.error("Error fetching orders");
                console.error("Error fetching orders:", error);
            }
        };
        const fetchProducts = async () => {
            const res = await fetch("https://webstore-backend-1boc.onrender.com/api/product/fetchallproducts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
                body: JSON.stringify(),
            });
            const data = await res.json();

            if (Array.isArray(data)) {
                setProducts(data);

            } else {
                console.error("Unexpected response:", data);
                setProducts([]);
            }
        };

        fetchOrders();
        fetchProducts();
    }, []);

    const handleCancel = async (orderId) => {
        try {
            const res = await fetch("https://webstore-payment.onrender.com/cancel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({
                    order_id: orderId,
                }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Order cancelled successfully");
                window.location.reload();
            } else {
                toast.error(data.message || "Failed to cancel order");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            toast.error("Something went wrong!");
        }
    };

    const handleRefund = async (orderId, paymentId) => {
        try {
            const res = await fetch("https://webstore-payment.onrender.com/refund", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ order_id: orderId, payment_id: paymentId }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Refund requested successfully");
                window.location.reload();
            } else {
                toast.error(data.message || "Failed to request refund");
            }
        } catch (error) {
            console.error("Error requesting refund:", error);
            toast.error("Something went wrong!");
        }
    };


    return (
        <div style={{ background: 'linear-gradient(to right, #f0f2f5, #e0e7ff)', minHeight: '67.1vh', paddingTop: '50px' }}>
            <div className="container">
                <div className="bg-white p-5 rounded-4 shadow-lg">
                    <h2 className="text-center mb-4 text-primary fw-bold">Your Orders</h2>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                            <div className="text-center">
                                <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
                                <p className="mt-3 text-muted">Fetching your orders...</p>
                            </div>
                        </div>
                    ) : orders.length === 0 ? (
                        <p className="text-center text-muted">No orders found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover text-center border shadow-sm rounded-3 overflow-hidden">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.order_id}>
                                            {/* <td> <img src={} alt="product" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px" }} /> </td> */}
                                            <td>{order.order_id}</td>
                                            <td>₹{order.amount / 100}</td>
                                            <td>
                                                {order.status === "paid" && <span className="badge bg-success">Paid</span>}
                                                {order.status === "created" && <span className="badge bg-warning text-dark">Pending</span>}
                                                {order.status === "refund_requested" && <span className="badge bg-warning text-dark">Refund Requested</span>}
                                                {order.status === "refunded" && <span className="badge bg-info text-dark">Refunded</span>}
                                                {order.status === "cancelled" && <span className="badge bg-danger text-light">Cancelled</span>}
                                            </td>
                                            <td>
                                                {(order.status === "paid") && (
                                                    <>
                                                        <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleCancel(order.order_id)}> Cancel </button>
                                                        <button className="btn btn-outline-warning btn-sm" onClick={() => handleRefund(order.order_id, order.payment_id)}> Refund </button>
                                                    </>
                                                )}
                                                {(order.status === "created") && (
                                                    <>
                                                        <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleCancel(order.order_id)}> Cancel </button>
                                                    </>
                                                )}
                                                {(order.status === "refund_requested" || order.status === "refunded" || order.status === "cancelled") && (
                                                    <i className="text-muted">No actions available</i>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
