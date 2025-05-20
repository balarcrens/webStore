import React from 'react'
import { useSelector } from 'react-redux';

export default function Cart() {
    const cartProduct = useSelector((state) => state.cart);

    const total = cartProduct.reduce((i, item) => i + item.product.price, 0)

    return (
        <>
            <div className="container py-5" style={{ minHeight: '80vh' }}>
                <h2 className="text-center mb-4 text-primary">Your Shopping Cart</h2>

                {cartProduct.length === 0 ? (
                    <p className="text-center text-muted">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center align-middle">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Product</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProduct.map(i => (
                                        <tr key={i}>
                                            <td>
                                                <img src={`http://localhost:3000/${i.product.image}`} alt={i.product.name} style={{ borderRadius: "10px", height: "150px" }} />
                                            </td>
                                            <td>{i.product.name}</td>
                                            <td>₹{i.product.price}</td>
                                        </tr>
                                    ))}
                                    <tr className="table-secondary fw-bold">
                                        <td colSpan="2" className="text-end">Total:</td>
                                        <td colSpan="2">₹{total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="text-end mt-4">
                            <button className="btn btn-success px-4">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}
