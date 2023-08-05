const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];

      let user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      if (user.role === 'Super Admin'){
        req.admin_id = user.id
        next();
      }
      else {
        res.status(401).json({ message: 'Unauthorized User' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized User. Token not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized User' });
  }
};

const marketingAgentAuth = (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(' ')[1];
        let user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        if(user.role === 'Marketing Agent'){
            req.marketingAgent_id = user.id;
            next();
          }
        else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      } else {
        res.status(401).json({ message: 'Unauthorized User' });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Unauthorized User' });
    }
  };
  const businessOwnerAuth = (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(' ')[1];
        let user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        if(user.role === 'Business Owner'){
            req.businessOwner_id = user.id;
            next();
          } 
        else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      } else {
        res.status(401).json({ message: 'Unauthorized User' });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Unauthorized User' });
    }
  };
  const customerAuth = (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(' ')[1];
        let user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        if(user.role === 'Customer'){
            req.customer_id = user.id;
            next();
          } 
        else {
          res.status(401).json({ message: 'Unauthorized User' });
        }
      } else {
        res.status(401).json({ message: 'Unauthorized User' });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Unauthorized User' });
    }
  };
module.exports = { adminAuth , marketingAgentAuth , businessOwnerAuth, customerAuth };
