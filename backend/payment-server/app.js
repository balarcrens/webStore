const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const cors = require('cors');
// const { default: orders } = require('razorpay/dist/types/orders');

const app = express();
const port = process.env.PORT || 7777;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Replace with your Razorpay credentials
const razorpay = new Razorpay({
    key_id: 'rzp_test_YDl1mSfAIgmAz6',
    key_secret: 'LJbfYTbCLYj0WO5PtguBV9Wu',
});

// Function to read data from JSON file
const readData = () => {
    if (fs.existsSync('orders.json')) {
        const data = fs.readFileSync('orders.json');
        return JSON.parse(data);
    }
    return [];
};

// Function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync('orders.json')) {
    writeData([]);
}

// Route to handle order creation
app.post('/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;

        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            receipt,
            notes,
        };

        const order = await razorpay.orders.create(options);

        // Read current orders, add new order, and write back to the file
        const orders = readData();
        orders.push({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: 'created',
        });
        writeData(orders);

        res.json(order); // Send order details to frontend, including order ID
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
});

// Route to serve the success page
app.get('/payment-success', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});

// Route to handle payment verification
app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = razorpay.key_secret;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    try {
        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
        if (isValidSignature) {
            // Update the order with payment details
            const orders = readData();
            const order = orders.find(o => o.order_id === razorpay_order_id);
            if (order) {
                order.status = 'paid';
                order.payment_id = razorpay_payment_id;
                writeData(orders);
            }
            res.status(200).json({ status: 'ok' });
            // console.log("Payment verification successful");
        } else {
            res.status(400).json({ status: 'verification_failed' });
            // console.log("Payment verification failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
});

app.get('/get-orders', (req, res) => {
    try {
        const orders = readData(); // Read orders from the file
        res.status(200).json(orders); // Send orders as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching orders');
    }
});

app.post('/cancel', (req, res) => {
    try {
        const { order_id } = req.body;
        const orders = readData();
        const index = orders.findIndex(o => o.order_id === order_id);

        if (index === -1) {
            return res.json({ success: false, message: "Order not found" });
        }

        const order = orders[index];

        if (order.status !== 'created' && order.status !== 'paid') {
            return res.json({ success: false, message: "Order cannot be cancelled" });
        }

        order.status = 'cancelled';
        orders[index] = order;
        writeData(orders);

        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.post('/refund', async (req, res) => {
    try {
        const { order_id, payment_id } = req.body;
        const orders = readData();
        const index = orders.findIndex(o => o.order_id === order_id);

        if (index === -1) {
            return res.json({ success: false, message: "Order not found" });
        }

        const order = orders[index];

        if (order.status !== 'paid') {
            return res.json({ success: false, message: "Refund not applicable" });
        }

        // Call Razorpay refund API
        const refund = await razorpay.payments.refund(payment_id, {
            amount: order.amount // Refund full amount (optional)
        });

        // Update order status
        order.status = 'refunded';
        order.refund_id = refund.id;
        orders[index] = order;
        writeData(orders);

        res.json({ success: true, message: "Refund processed successfully", refund });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


app.listen(port);
