
const jwt = require("jsonwebtoken");

const AuthenUser = async  function(req, res, next) {

    try {
      const token =   req.headers.authorization.split(' ')[1];

      if(!token) {
        res.status(401).json({status:"error", messaage: "No token"});
        return;
      }
      const decoded = jwt.verify(token, 'shhhhhhared-secret');
      //res.json({status: 'ok', message_Token: token, message_decoded_Token: decoded});
      req.user = decoded.user
      next();
    } catch (error) {
      res.json({status: 'error', message_ERROR: error});
    }
  
  };
module.exports.AuthenUser = AuthenUser;