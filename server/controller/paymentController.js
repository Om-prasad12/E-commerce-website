const ProductModel = require('../models/prodModel');
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { orderData } = req.body;

  try {
    // Fetch products from DB with real name & price
    const productsWithPrice = await Promise.all(
      orderData.products.map(async (item) => {
        const productData = await ProductModel.findById(item.product);
        return {
          productId: item.product,
          vendorId: item.vendorId,
          name: productData.title,
          price: productData.price,
          quantity: item.quantity
        };
      })
    );

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: productsWithPrice.map(item => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(Number(item.price) * 100), // to paise
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.BASE_URL}payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}checkout`,
      metadata: {
        orderData: JSON.stringify(orderData),
        userId: req.user?._id?.toString() || ""
      }
    });

    res.json({ sessionId: session.id });

  } catch (err) {
    console.error("Stripe checkout session error:", err);
    res.status(500).json({ error: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    if (session.payment_status === 'paid') {
      // ✅ Update your DB order here
      return res.json({ success: true, session });
    }
    res.json({ success: false });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createCheckoutSession,
  verifyPayment
};
