const subscriptionModel = require("../../models/subscription");
const { json } = require("express");
require("dotenv").config();
const stripe = require("stripe")("sk_test_51Nl5XoExU3kznyi3EOVlYlppCVmnZhblFhIyPXkgid8KBCtRQ0qRr2M33YRRd4l4RopQJwbQMWtfPDpQK8xgxlcH00C80vOtc3");

// View All Subscriptions

const viewSubscriptions = async (req, res) => {
  try {
      const subscriptions = await subscriptionModel.find();
      return res.status(200).json({subscriptions : subscriptions});
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
};

const makePayment = async (req, res) => {
  const {subscribed} = req.body;
  console.log(subscribed);
    const lineItems = [
    {
      price_data: {
        currency: "USD",
        product_data: {
          name: subscribed.title,
          description: subscribed.description,
        },
        unit_amount: subscribed.price,
      },
      quantity: 1,
    }
  ];
  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items: lineItems ,
    mode: "payment" ,
    success_url: "http://127.0.0.1:5173/PaymentSucces",
    cancel_url: "http://127.0.0.1:5173/PaymentUnsuccessful",
  });

  return res.json({id:session.id});
};

module.exports = { viewSubscriptions , makePayment}