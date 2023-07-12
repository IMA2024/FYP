const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      let user = jwt.verify(token, process.env.SECRET_KEY);
      console.log(user);
      if (user.role === 'admin'){
        req.admin_id = user.id;
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

const marketingAgentAuth = (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(' ')[1];
        let user = jwt.verify(token, process.env.SECRET_KEY);
        console.log(user);
        if(user.role === 'marketingAgent'){
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
        let user = jwt.verify(token, process.env.SECRET_KEY);
        console.log(user);
        if(user.role === 'businessOwner'){
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
module.exports = { adminAuth , marketingAgentAuth , businessOwnerAuth };
