// backend/server.js
// This is the main "control center" for your entire backend.

// --- 1. IMPORTS (Loading our tools) ---

// This line MUST be first. It loads all secret keys from your .env file
require("dotenv").config();

// Import Express: The main framework that builds the server
const express = require("express");
// Import Mongoose: The tool that lets us talk to our MongoDB database
const mongoose = require("mongoose");
// Import CORS: The middleware that allows our React app (on port 5173) to talk to this server (on port 5000)
const cors = require("cors");

const path=require("path"); //import path 
const fs=require("fs");//import file system tool
const helmet=require("helmet"); //import helmet for security headers


const {rateLimit,ipKeyGenerator }=require("express-rate-limit"); //import rate limiter to prevent brute force attacks

//inport the cookie parser
const cookieParser=require("cookie-parser");


// --- 2. IMPORT OUR ROUTE FILES ---
// We import the "mini-apps" we wrote for Auth, Jobs, and AI
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const aiRoutes = require("./routes/aiRoutes");
// Import our "security guard" middleware to check JWTs
const verifyToken = require("./middleware/authMiddleware");
//import the new user routes
const userRoutes=require("./routes/userRoutes");

const applicationRoutes=require("./routes/applicationRoutes");//import the application routes
const adminRoutes = require("./routes/adminRoutes");

const notificationRoutes = require("./routes/notificationRoutes");

const alertRoutes = require("./routes/alertRoutes");

const { refreshSkillCache } = require("./utils/skillMap");
//const interviewRoutes=require("./routes/interviewRoutes");


//import mongo sanitize to prevent nosql injection attacks
// const mongoSanitize=require("express-mongo-sanitize");


//add request logging middleware 
const morgan=require("morgan");
const logger=require("./utils/logger");
const { cookie } = require("express-validator");

logger.info("Server initializing...");

// --- 3. INITIALIZE THE APP ---
// Create the main Express application "app"
const app = express();



// --- 4. MIDDLEWARE SETUP ---
// 'app.use()' means "run this on EVERY request that comes in"
// Use CORS to allow requests from any origin (e.g., your React app)
app.use(
  cors({
    origin: [
      // "https://axon-hire.vercel.app"
      "https://axon-hire-complete-mvp.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
      
    ],
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, //allow cookies to be sent cross-origin
  })
);

// Use Express's built-in JSON parser. This lets our server read the JSON data you send from Postman/React.
app.use(express.json());

//use everything after express json middleare all other middleware comes in 


//monodb sanitize to prevent nosql injection attacks 
//it stripes $ and. from req.body , req.query and req.params

// app.use(mongoSanitize()); //uncomment this line to enable mongo sanitize but it is causing some issue with the login and register so i just commented it out for now but you can enable it if you want to prevent nosql injection attacks but you have to fix the issue with the login and register first

//use the cookie parser 
app.use(cookieParser());



//use before the you use middleware list
app.use(helmet()); //set security headers

//morgan with our winston stream
app.use(morgan('combined',{stream:logger.stream}));


//this is old route for the upload just kept for the refernce 
// //this server all files from the uploads filder as static files
// //it means if we have a file at uploads/my-resume.pdf
// //we can access it in the browsesr at"http://locahost:500/uploads/mu-resume.pdf
// //print path we are trying to serve
// const uploadsPath = path.join(__dirname, "uploads");
// console.log("SERVER STARTUP: Serving files from ->", uploadsPath);


// //server folder explicitly
// app.use("/uploads",express.static(uploadsPath));


//general api limiter (optional, can be applied globally)
const limiter=rateLimit({
  windowMs:15*60*1000, //15 mins
  max:100, //limit each ip to 100 requests per windowMs
keyGenerator:(req)=>req.user?.id || ipKeyGenerator(req), //use user id if logged in, otherwise use IP
  message:{
    message:"Too many requests from this IP, please try again later."
  },
});

// //apply to all routes
// app.use(limiter);

//apply rater limiter for specific end points
app.use("/api/jobs",limiter);
app.use("/api/ai",limiter);
app.use("/api/applications",limiter);
app.use("/api/admin",limiter);
app.use("/api/notifications",limiter);
app.use("/api/alerts",limiter);
// app.use("/api/users",limiter); //its using both limter so getting less reapest like 50 


//stricter limiter for auth endpoints
const authLimiter=rateLimit({
  windowMs:15*60*1000,  //15 minutes
  max:5,//only 5 attempts per ip 
  message:{
    message:"Too many login attempts , please try again later"
  },
});

app.use("/api/auth", authLimiter);

app.use("/api/users",userRoutes)

// --- 5. API ROUTES (The "Address Book") ---
// Tell Express how to handle different URLs

// Any URL starting with "/api/auth" should be handled by 'authRoutes.js'
app.use("/api/auth", authRoutes);
// Any URL starting with "/api/jobs" should be handled by 'jobRoutes.js'
app.use("/api/jobs", jobRoutes);

// THE FIX IS HERE:
// Any URL starting with "/api/ai" should be handled by 'aiRoutes.js'
// Your old code ("api/ai") was missing the '/' and broke the path.
app.use("/api/ai", aiRoutes);

// --- 6. TEST ROUTES (For Debugging) ---
// A simple "health check" route. If you go to http://localhost:5000/ in your browser, you'll see this.
app.get("/", (req, res) => {
  res.send("job portal backend is running");
});
// A test route to check if our 'verifyToken' guard is working
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Access granted token verified", user: req.user });
});

//api to use application routes//
app.use("/api/applications",applicationRoutes); //pulg it in


app.use("/api/admin", adminRoutes);



app.use("/api/notifications", notificationRoutes);

app.use("/api/alerts", alertRoutes);

//app.use("/api/interview",interviewRoutes);









//eroor middleware i just dont wanted to create another all call here so i write right here 
//404 handler
app.use((req,res,next)=>{
  res.status(404).json({message:"Not Found"});

});

//global erro handler
app.use((err,req,res,next)=>{
  logger.error(`Unhandled error:${err.message}`,{stack:err.stack,url:req.url});
  res.status(500).json({message:"Internal Server Error"});
});
 




// --- 7. MONGODB CONNECTION ---
// Connect to the MongoDB database using the secret URL from our .env file
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(async () => {
//     console.log(" Connected to MongoDB successfully");
    
//     //  INITIALIZE THE BRAIN
//     // This loads all 500+ skills from the DB into server memory
//     await refreshSkillCache(); 
//   }) 
//   .catch((err) => console.log(" MongoDB connection error:", err.message));

// --- 8. START THE SERVER ---
// Get the port number from the .env file, or just use 5000 if it's not defined
// const PORT = process.env.PORT || 5000;
// Tell the app to start "listening" for requests on our port



// if (require.main === module) {
//   app.listen(PORT, () => console.log(`Server started on port "http://localhost:${PORT}"`));
//   logger.info(`🚀 Server started on port ${PORT} with logging`);
// }

// module.exports=app; //export app for testing

// ... (keep all imports and middleware setup)

let serverInstance = null;

// Shared initialization function
async function initialize() {
  //  Don't reconnect if already connected (e.g., during tests)
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log("Connected to MongoDB successfully");
    await refreshSkillCache();
  }
}

// Start the HTTP server (only if this file is run directly)
async function startServer() {
  await initialize();
  if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    serverInstance = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    logger.info(`🚀 Server started on port ${PORT} with logging`);
  }
  return app;
}

// Graceful shutdown
async function closeServer() {
  if (serverInstance) {
    await serverInstance.close();
  }
  await mongoose.disconnect();
}

module.exports = { app, startServer, closeServer, initialize };

// Only start if this file is run directly (not imported by tests)
if (require.main === module) {
  startServer();
}