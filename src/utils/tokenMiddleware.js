var jwt = require('jsonwebtoken')

const generateToken = (user) => {
  user = user.toObject();
  delete user.password
  console.log(user)
  return jwt.sign( user , process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

let checkToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied.'
    });
  }
};

module.exports = {
  generateToken: generateToken,
  checkToken: checkToken
}
