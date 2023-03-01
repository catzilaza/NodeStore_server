const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      res.status(401).json({ status: "error", message: "No Token" });
      return;
    }

    const decoded = jwt.verify(token, "shhhhhhared-secret");
    console.log("Auth middleware decoded : ", decoded);

    req.body = decoded;

    next();

    //res.status(200).json({ status: "ok", message: "Auth middleware Success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Auth middleware Error" });
  }
}
module.exports.Auth = Auth;
