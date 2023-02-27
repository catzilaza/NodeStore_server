
const jwt = require("jsonwebtoken");

const AuthenUser = async  function(req, res, next) {

    try {
      const token =   req.headers.authorization.split(' ')[1];
      var decoded = jwt.verify(token, 'shhhhhhared-secret');
      res.json({status: 'Authen Page', message_Token: token, message_decoded_Token: decoded});
    } catch (error) {
      res.json({status: 'ERROR Authen Page', message_ERROR: error});
    }
  
  };
module.exports.AuthenUser = AuthenUser;