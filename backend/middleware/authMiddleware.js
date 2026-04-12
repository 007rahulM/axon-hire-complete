//midleware is used for the jwt verfication
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(" Incoming headers:", req.headers);   //dont show the heder and other stuuf in the log because it will show the token and other stuff in the log and i dont want that so i just comment it out

  console.log("Incoming cookies:", req.cookies); //add coolies to check in debugging

  //extra token from the authorization header
  // const authHeader = req.headers["authorization"]; // no use now it also implent down as fallback
  // console.log("Authorization header:", req.headers["authorization"]);

//token is now reading from cookies so read from cookies first
// falbback to hear for api clients

const  token=req.cookies?.token || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);


  //token usually comes as bearer <token>
  // const token = authHeader && authHeader.split(" ")[1];
  //if no token,deny access
  if (!token) {
    return res.status(401).json({ message: "Access denied No token provided" });
  }

  try {
    //verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //attach decoded user info to request object
    req.user = decoded;

    //continue to next middleware or route
    next();
  } catch (err) {
    console.error("token verification falied:", err.message);
    res.status(403).json({ message: "Invalid or epired token" });
  }
};

module.exports = verifyToken;