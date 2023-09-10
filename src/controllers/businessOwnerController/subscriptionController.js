const subscriptionModel = require("../../models/subscription");
const subscriptionRecordModel = require("../../models/subscriptionRecord");
const paymentModel = require("../../models/payment"); // Import your paymentModel here
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
  const { businessId , subscribed } = req.body;

  try {
    const lineItems = [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: subscribed.title,
            description: subscribed.description,
          },
          unit_amount: subscribed.price * 100,
        },
        quantity: 1,
      }
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://127.0.0.1:5173/BusinessPanelDashboard",
      cancel_url: "http://127.0.0.1:5173/BuySubscription",
    });

    // create a payment record in your database using your paymentModel
    const paymentRecord = {
      business: businessId,
      transactionId: session.id,
      amount: subscribed.price,
      date: subscribed.createdAt,
      title: subscribed.title
    };

    // Insert paymentRecord into your paymentModel in the database
    const createdPayment = await paymentModel.create(paymentRecord);
    console.log(createdPayment);
    
    // Create a subscription record
    const subscriptionRecord = {
      business: businessId,
      subscriptionId: session.id,
      amount: subscribed.price,
      date: subscribed.createdAt,
      title: subscribed.title,
      type: subscribed.type,
    };

    const createdSubscriptionRecord = await subscriptionRecordModel.create(subscriptionRecord);
    console.log(createdSubscriptionRecord);
    
    return res.json({ id: session.id });
  } catch (error) {
    console.error("Error making payment:", error);
    return res.status(500).json({ message: "Error making payment" });
  }
};

// View All Subscription Record

const viewSubscriptionRecord = async (req, res) => {
  try {
      const subscriptions = await subscriptionRecordModel.find().populate('business');
      res.status(200).json({subscriptions : subscriptions});
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Delete Subscription

const deleteSubscriptionRecord = async (req, res) => {
    const {subscriptionId} = req.query;

    try {
        const subscription = await subscriptionRecordModel.findByIdAndDelete(subscriptionId);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.status(200).json({ message: 'Subscription Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { viewSubscriptions, makePayment , viewSubscriptionRecord , deleteSubscriptionRecord};
