const paymentModel = require("../../models/payment");
require("dotenv").config();


const viewAllPayments = async (req, res) => {
    try {
      const payments = await paymentModel.find()
        .populate({
          path: 'business',
          populate: {
            path: 'businessOwner',
            model: 'user' 
          }
        });
      return res.status(200).json( {payments : payments} );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  };

  const deletePayment = async (req, res) => {
    const { paymentId } = req.query;
  
    try {
      const deletedPayment = await paymentModel.findByIdAndDelete(paymentId);
  
      if (!deletedPayment) {
        return res.status(404).json({ error: 'Payment not found.' });
      }
  
      return res.status(200).json({ message: 'Payment Deleted Successfully.' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  module.exports = { viewAllPayments , deletePayment};