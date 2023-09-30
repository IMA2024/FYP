const businessModel = require("../../models/business");
require("dotenv").config();


const viewAllSubscribedBusinesses = async (req, res) => {
  try {
    const businesses = await businessModel.find({ subscribed: 'Subscribed' }).populate('businessOwner');
    return res.status(200).json({ businesses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};


const deleteBusiness = async (req, res) => {
  const { businessId } = req.query;

  try {
    const deletedBusiness = await businessModel.findByIdAndDelete(businessId);
    if (!deletedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }
    return res.status(200).json({ message: 'Business Deleted Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { viewAllSubscribedBusinesses, deleteBusiness };