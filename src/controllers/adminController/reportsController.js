const userModel = require("../../models/user");
const revenueModel = require("../../models/revenue");
const expenseModel = require("../../models/expense");
const businessModel = require("../../models/business");
const subscriptionRecordModel = require("../../models/subscriptionRecord");
const paymentModel = require("../../models/payment");

// TotalRevenueBlocks === Number of Users

const totalUsers = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        return res.status(200).json(totalUsers);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total users', error: err.message });
    }
};

const totalMarketingAgents = async (req, res) => {
    try {
        const totalMarketingAgents = await userModel.countDocuments({ role: 'Marketing Agent' });
        return res.status(200).json(totalMarketingAgents);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total marketing agents', error: err.message });
    }
};

const totalBusinessOwners = async (req, res) => {
    try {
        const totalMarketingAgents = await userModel.countDocuments({ role: 'Business Owner' });
        return res.status(200).json(totalMarketingAgents);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total marketing agents', error: err.message });
    }
};

const totalCustomers = async (req, res) => {
    try {
        const totalCustomers = await userModel.countDocuments({ role: 'Customer' });
        return res.status(200).json(totalCustomers);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total marketing agents', error: err.message });
    }
};

// User Registered Graphs

// const getMonthlyUserCountsForLastYear = async (req, res, next) => {

//   const currentDate = new Date();
//   const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);

//   const userCounts = await userModel.aggregate([
//     {
//       $match: {
//         createdAt: {
//           $gte: lastYearStartDate,
//           $lte: currentDate,
//         },
//       },
//     },
//     {
//       $project: {
//         month: { $month: '$createdAt' },
//         year: { $year: '$createdAt' },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           month: '$month',
//           year: '$year',
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $sort: { '_id.year': 1, '_id.month': 1 },
//     },
//   ]);
//   let monthly = convertMonthlyCountsToArrays(userCounts);
//   console.log(monthly);
//   return res.send({monthly}) ;
// };

// //To Get Array of Above Users Count
// function convertMonthlyCountsToArrays(counts) {
//   const monthYearArray = [];
//   const countArray = [];

//   counts.forEach(item => {
//     const { month, year } = item._id;
//     monthYearArray.push(`${getMonthName(month)} ${year}`);
//     countArray.push(item.count);
//   });

//   return { monthYearArray, countArray };
  
// }

// function getMonthName(month) {
// const monthNames = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ];
// return monthNames[month - 1];
// }



// Grouped Stats === Total Businesses, Subscribed Businesses, Unsubscribed Businesses

const totalBusinesses = async (req, res) => {
    try {
        const totalBusinesses = await businessModel.countDocuments();
        return res.status(200).json(totalBusinesses);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total businesses', error: err.message });
    }
};


const subscribedBusinesses = async (req, res) => {
    try {
        const subscribedBusinesses = await businessModel.countDocuments({ subscribed: 'Subscribed' });
        return res.status(200).json(subscribedBusinesses);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting subscribed businesses', error: err.message });
    }
};

const unsubscribedBusinesses = async (req, res) => {
    try {
        const unsubscribedBusinesses = await businessModel.countDocuments({ subscribed: 'Unsubscribed' });
        return res.status(200).json(unsubscribedBusinesses);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting unsubscribed businesses', error: err.message });
    }
};

// Grouped Stats === Businesses, Subscription , Payment , Revenue


const totalSubscriptions = async (req, res) => {
    try {
        const totalSubscriptions = await subscriptionRecordModel.countDocuments();
        return res.status(200).json(totalSubscriptions);
    } catch (err) {
        return res.status(500).json({ message: 'Error getting total businesses', error: err.message });
    }
};

const totalRevenue = async (req, res) => {
    try {
      const allRevenues = await revenueModel.find();
  
      if (allRevenues.length === 0) {
        return res.status(200).json({ totalRevenue : 0 });
      }
  
      const totalRevenue = allRevenues.reduce((accumulator, revenue) => {
        return accumulator + revenue.amount;
      }, 0);
  
      return res.status(200).json(totalRevenue);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const totalExpense = async (req, res) => {
    try {
      const allExpenses = await expenseModel.find();
  
      if (allExpenses.length === 0) {
        return res.status(200).json({ totalExpense: 0 });
      }
  
      const totalExpense = allExpenses.reduce((accumulator, expense) => {
        return accumulator + expense.amount;
      }, 0);
  
      return res.status(200).json(totalExpense);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const totalProfit = async (req, res) => {
    try {
      const allRevenues = await revenueModel.find();
      const allExpenses = await expenseModel.find();
  
      const totalRevenue = allRevenues.reduce((accumulator, revenue) => {
        return accumulator + revenue.amount;
      }, 0);
  
      const totalExpense = allExpenses.reduce((accumulator, expense) => {
        return accumulator + expense.amount;
      }, 0);
  
      const profit = totalRevenue - totalExpense;
  
      return res.status(200).json(profit);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const totalPayments = async (req, res) => {
    try {
      const paymentCount = await paymentModel.countDocuments();
      return res.status(200).json(paymentCount);
    } catch (err) {
      return res.status(500).json({ message: 'Error counting payments', error: err.message });
    }
  };

module.exports = { totalUsers , totalMarketingAgents , totalBusinessOwners , totalCustomers ,totalBusinesses , subscribedBusinesses, unsubscribedBusinesses, totalSubscriptions , totalRevenue , totalExpense, totalProfit, totalPayments};
