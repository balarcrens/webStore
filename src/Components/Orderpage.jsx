import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Orderpage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders when the component loads
    useEffect(() => {
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
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching orders");
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center">Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="table table-bordered table-striped table-hover text-center">
                    <thead>
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
                                <td>{order.order_id}</td>
                                <td>₹{order.amount / 100}</td>
                                <td>{order.status}</td>
                                <td>
                                    {order.status === "paid" && (
                                        <>
                                            <button className="btn btn-danger" onClick={() => handleCancel(order.order_id)}>
                                                Cancel Order
                                            </button>
                                            <button className="btn btn-warning m-1" onClick={() => handleRefund(order.order_id, order.payment_id)}>
                                                Request Refund
                                            </button>
                                        </>
                                    )}
                                    {order.status === "refund_requested" && (
                                        <span className="text-warning">Refund Requested</span>
                                    )}
                                    {order.status === "refunded" && (
                                        <span className="text-success">Refunded</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

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
            window.location.reload(); // Reload to fetch updated order list
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