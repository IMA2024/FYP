const userModel = require("../../models/user");

const businessOwnersList = async (req, res) => {

    try {
        const businessOwners = await userModel.find({ role: 'Business Owner' });
    
       return res.json( businessOwners );
      } 
      catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something Went Wrong' });
      }
    };

    module.exports = {businessOwnersList}
