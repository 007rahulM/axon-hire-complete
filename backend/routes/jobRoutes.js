// // backend/routes/jobRoutes.js
// const express = require("express");
// const{body,validationResult}=require("express-validator");
// const router = express.Router();
// const Job = require("../models/Job");
// const Application = require("../models/Application"); // Import Application to handle cascade delete
// const verifyToken = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");

// // 👇 NEW IMPORTS FOR JOB ALERTS
// const JobAlert = require("../models/JobAlert");
// const nodemailer = require("nodemailer");
// const { hasAutoParseableInput } = require("openai/lib/ResponsesParser.js");

// //validation 
// router.post("/",[verifyToken,adminMiddleware],[
//   body('title').notEmpty().withMessage('Title is required'),
//   body('company').notEmpty().withMessage('Company is required'),
//   body('location').notEmpty().withMessage('Location is required'),
//   body('salary').notEmpty().withMessage('Salary is required or say something  like reveled in interview process'),
//   body('description').notEmpty().withMessage('Description is required'),
//   body('requirements').isArray().withMessage('Requirements must be an array')
// ],async(req,res)=>{
//   //check validation erros
//   const errors=validationResult(req);
//   if(!errors.isEmpty()){
//     return res.status(400).json({errors:errors.array()});
//   }
  
  
//   /*
// @route GET /api/jobs
// @desc Get all ACTIVE jobs (Public)
// */
// router.get("/", async (req, res) => {
//   try {
//     //  Only fetch jobs where isOpen is true
// //extract query parameters with defaults
// const page=parseInt(req.query.page)||1;
// const limit=parseInt(req.query.limit)||10;
// const title=req.query.title ||"";
// const location=req.query.location || "";
// const type=req.query.type || ""; // Full-time, Part-time, etc (if you have this field)
// const minSalary=req.query.minSalary?parseInt(req.query.minSalary):null;
// const maxSalary=req.query.maxSalary?parseInt(req.query.maxSalary):null;


// //build filter object
// const filter={isOpen:true};
// if(title){
//   filter.title={$regex:title,$options:'i'}; //case-insensitive search

// }
// if(location){
//   filter.location={$regex:location,$options:'i'};

// }
// if(type){
//   filter.type=type;
// }
// if(minSalary!=null ||maxSalary!=null){
// filter.salary={};
// if(minSalary!==null)filter.salary.$gte=minSalary;
// if(maxSalary!==null)filter.salary.$lte=maxSalary;
// }

// //calculate skip
// const skip=(page-1)*limit;

// //get total count for pagination metadata
// const total=await Job.countDocuments(filter);
// const jobs=(await Job.find(filter)).sort({createdAt:-1}).skip(skip).limit(limit);

// // res.json({
// //   pagination:{
// //     page,limit,total,totalPages:Math.ceil(total/limit),hasMore:skip+jobs.length<total,
// //   },
// // });

// res.status(200).json(jobs);
  
//   }catch(err){
//     console.error("Error fetching jobs:",err.message);
//     res.status(500).json({message:"Server error"});
//   }
// });


// //old one 
// //     const jobs = await Job.find({ isOpen: true }).sort({ createdAt: -1 });
// //     res.status(200).json(jobs);
// //   } catch (err) {
// //     console.error("Error fetching jobs:", err.message);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// /*
// @route GET /api/jobs/my-jobs
// @desc Get jobs posted by the logged-in recruiter
// @access Private (Recruiter)
// */
// router.get("/my-jobs", verifyToken, async (req, res) => {
//   try {
// const page=parseInt(req.query.page)||1;
// const limit=parseInt(req.query.limit)||10;
// const skip=(page-1)*limit;

// const filter={postedBy:req.user.id};
// const total=await Job.countDocuments(filter);
// // Find jobs where postedBy matches the logged-in user
// const jobs=await Job.find(filter).sort({createdAt:-1}).skip(skip).limit(limit
// )

//     // Optional: Calculate applicant count for each job
//     const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
//       const count = await Application.countDocuments({ jobId: job._id });
//       return { ...job.toObject(), applicantCount: count };
//     }));

//     res.status(200).json({
//       jobs:jobsWithCounts,
//       pagination:{
//         page,
//         limit,
//         total,
//         totalPages:Math.ceil(total/limit),
//         hasMore:skip+jobs.length<total,
//       },
//     });
    
    
//   } catch (err) {
//     console.error("Error fetching my jobs:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// // creat a job (Recuiter or admin only)//
// /*
// @route POST /api/jobs
// @desc Create a new job
// @access Private (Recruiter/Admin)
// */
// router.post("/", [verifyToken, adminMiddleware], [
//   body("title").notEmpty().withMessage("Title is required"),
//   body("company").notEmpty().withMessage("Company is required"),
//   body("location").notEmpty().withMessage("Location is required"),
//   body("salary").notEmpty().withMessage("Salary is required"),
//   body("description").notEmpty().withMessage("Description is required"),
//   body("requirements").isArray().withMessage("Requirements must be an array"),
//   body("deadline").notEmpty().withMessage("Deadline is required"),


// ],
  
//   async (req, res) => {
//     //check validation results
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     } 
//   try {
//     const { title, company, location, salary, description, requirements, deadline ,autoEvaluate, evaluationMode,type="Full-time",} = req.body;
    
//     if (!title || !company || !location || !salary || !description || !requirements) {
//       return res.status(400).json({ message: "Please provide all fields" });
//     }
    
//     const newJob = new Job({
//       title, company, location, salary, description,
//       requirements: requirements || [],
//       type,
//       atsEnabled: requirements?.length > 0,
//       deadline, // Saved to DB
//       postedBy: req.user.id,
//       autoEvaluate: autoEvaluate === true, // 👈 FORCE BOOLEAN CHECK
//       evaluationMode: evaluationMode || "local"
//     });
    
//     const savedJob = await newJob.save();
    
//     // ✅ STEP 1: Send the response IMMEDIATELY
//     // This stops the frontend from hanging and prevents timeouts.
//     res.status(201).json(savedJob);
    
//     // ✅ STEP 2: Background Task (Emails & Notifications)
//     // setImmediate moves this logic out of the main request-response cycle.
//     setImmediate(async () => {
//       try {
//         const matchingAlerts = await JobAlert.find({ keywords: { $in: [title] } });
        
//         if (matchingAlerts.length > 0) {
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: process.env.EMAIL_USER, // Use environment variable for email
//               pass: process.env.EMAIL_PASS, // Use environment variable for email password
//             }
//           });
          
//           // Send notifications to DB first (Fast)
//           const Notification = require("../models/Notification");
//           const notifs = matchingAlerts.map(alert => ({
//             user: alert.userId, // Ensure your Alert model has userId
//             title: "New Job Match!",
//             message: `${company} just posted a ${title} position.`,
//             relatedLink: "/jobs"
//           }));
//           await Notification.insertMany(notifs);
          
//           // Send Emails (Slow - now safe because it's in background)
//           matchingAlerts.forEach(alert => {
//             const mailOptions = {
//               from: '"Axon Hire" <codementoraiyt@gmail.com>',
//               to: alert.userEmail,
//               subject: `🔥 New Job Alert: ${title}`,
//               html: `<h3>New Job Found: ${title}</h3><p>Posted by ${company}</p>`
//             };
//             transporter.sendMail(mailOptions);
//           });
//         }
//       } catch (bgError) {
//         console.error("Background Alert Error:", bgError);
//       }
//     });
    
//   } catch (err) {
//     console.error("Error posting job:", err.message);
//     if (!res.headersSent) res.status(500).json({ message: "Server error" });
//   }
// });

// /*
// @route DELETE /api/jobs/:id
// @desc Delete a job AND all its applications
// @access Private (Recruiter - Only Owner)
// */
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId);
    
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }
    
//     // Check ownership
//     if (job.postedBy.toString() !== req.user.id) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
    
//     // 1. Delete the Job
//     await Job.findByIdAndDelete(jobId);
    
//     // 2. 🔥 CASCADE DELETE: Delete all applications for this job
//     await Application.deleteMany({ jobId: jobId });
    
//     res.json({ message: "Job and associated applications removed" });
//   } catch (err) {
//     console.error("Delete job error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /*
// @route PATCH /api/jobs/:id/toggle
// @desc Toggle job status (Open/Closed) - SAFE VERSION
// @access Private (Recruiter Owner)
// */
// router.patch("/:id/toggle", verifyToken, async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const userId = req.user.id;
    
//     // 1. Find the job first to check ownership
//     const job = await Job.findById(jobId);
    
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }
    
//     // 2. Safe Ownership Check
//     const postedById = job.postedBy._id ? job.postedBy._id.toString() : job.postedBy.toString();
    
//     if (postedById !== userId) {
//       return res.status(401).json({ message: "Not authorized to modify this job" });
//     }
    
//     // 3. Determine New Status
//     const currentStatus = job.isOpen === undefined ? true : job.isOpen;
//     const newStatus = !currentStatus;
    
//     // 4. Force Update
//     const updatedJob = await Job.findByIdAndUpdate(
//       jobId,
//       { $set: { isOpen: newStatus } }, 
//       { new: true } 
//     );
    
//     console.log(`Job ${jobId} toggled to ${newStatus}`);
    
//     res.json({ message: "Job status updated", job: updatedJob });
    
//   } catch (err) {
//     console.error("CRITICAL TOGGLE ERROR:", err); 
//     res.status(500).json({ message: "Server error during toggle" });
//   }
// });

// // @route   POST /api/jobs/cron/cleanup
// router.post("/cron/cleanup", async (req, res) => {
//   try {
//     // 1. Check for the Secret Key in the headers
//     const cronSecret = req.headers["x-cron-auth"];
    
//     // You should put this secret in your .env file
//     if (cronSecret !== process.env.CRON_SECRET) {
//       return res.status(401).json({ message: "Unauthorized: Invalid Secret Key" });
//     }
    
//     const now = new Date();
//     const result = await Job.updateMany(
  //       { deadline: { $lt: now }, isOpen: true },
  //       { $set: { isOpen: false } }
  //     );
  
  //     res.json({ success: true, closedCount: result.modifiedCount });
  //   } catch (err) {
    //     res.status(500).json({ success: false, error: err.message });
//   }
// });

// });
// module.exports = router;


//new one //

const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const JobAlert = require("../models/JobAlert");
const nodemailer = require("nodemailer");
const logger=require('../utils/logger');
const redis=require("../utils/cache");

// // ─────────────────────────────────────────────────────────────────
// // GET /api/jobs – Public, with pagination & filters
// // ─────────────────────────────────────────────────────────────────
// router.get("/", async (req, res) => {
  //   try {
    //     const page = parseInt(req.query.page) || 1;
    //     const limit = parseInt(req.query.limit) || 12;
    //     const title = req.query.title || "";
    //     const location = req.query.location || "";
    //     const remote = req.query.remote === "true"; // ?remote=true
    //     const type = req.query.type || ""; // e.g. "Full-time"
    //     const minSalary = req.query.minSalary ? parseInt(req.query.minSalary) : null;
    //     const maxSalary = req.query.maxSalary ? parseInt(req.query.maxSalary) : null;
    
    //     const filter = { isOpen: true };
    
    //     if (title) filter.title = { $regex: title, $options: "i" };
    //     if (location) filter.location = { $regex: location, $options: "i" };
    //     if (type) filter.type = type;
    //     if (remote) filter.location = { $regex: "remote", $options: "i" }; // location contains "remote"
    //     if (minSalary !== null || maxSalary !== null) {
      //       filter.salary = {};
      //       if (minSalary !== null) filter.salary.$gte = minSalary;
      //       if (maxSalary !== null) filter.salary.$lte = maxSalary;
      //     }
      
      //     const skip = (page - 1) * limit;
      //     const total = await Job.countDocuments(filter);
      //     const jobs = await Job.find(filter)
      //       .sort({ createdAt: -1 })
      //       .skip(skip)
      //       .limit(limit);
      
      //     res.json({
        //       jobs,
        //       pagination: {
          //         page,
          //         limit,
          //         total,
          //         totalPages: Math.ceil(total / limit),
          //         hasMore: skip + jobs.length < total,
          //       },
          //     });
          //   } catch (err) {
            //     console.error("Error fetching jobs:", err.message);
            //     res.status(500).json({ message: "Server error" });
            //   }
            // });
            


            //helper to clear job list cahces (wildcard delete)
            const clearJobListCache=async()=>{
                const keys=await redis.keys("jobs:page:*"); //find all keys starting with jobs:
                if(keys.length >0){
                    await redis.del(...keys)  //delete all 
                }
            }



            
            // // GET /api/jobs – Public, with pagination & filters and with caching 
            
            router.get("/",async(req,res)=>{
              try{
                const page=parseInt(req.query.page)||1;
                const limit=parseInt(req.query.limit)||12;
    const title=req.query.title || "";
    const location=req.query.location || "";
    const remote=req.query.remote === "true";
    const type=req.query.type ||"";
    const minSalary=req.query.minSalary?parseInt(req.query.minSalary):null;
    const maxSalary=req.query.maxSalary?parseInt(req.query.maxSalary):null;

    //build unique cache key from query params (differen filters =different cache)

    const cachekey=`jobs:page:${page}:limit:${limit}:title:${title}:location:${location}:remote:${remote}:type:${type}:minSalary:${minSalary}:maxSalary:${maxSalary}`;

    //step 1 check cache first (fast)
    const cached=await redis.get(cachekey);
    if(cached){
      return res.json(cached); //@upstash/redis auto-parse JSON -instant return

    }

    //step 2 cahce miss - query DB (slow, but only once per unique key)
    const filter={isOpen:true};
    if(title)filter.title={$regex:title, $options: "i"};
    if(location)filter.location={$regex:location, $options: "i"};
   if(type) filter.type = type; 
    if(remote) filter.location={$regex:"remote", $options:"i"};
    if(minSalary !==null || maxSalary!==null){
      filter.salary={};
      if(minSalary!==null)filter.salary.$gte=minSalary;
      if(maxSalary!==null)filter.salary.$lte=maxSalary;
    }

const skip=(page-1)*limit;
const total=await Job.countDocuments(filter);
const jobs=await Job.find(filter)
.sort({createdAt:-1})
.skip(skip)
.limit(limit)
.populate("postedBy","name profilePicture") //Add this for full job details
.lean(); //.lean() for faster queries (plain objects, no Monogees overhead)


const result={
  jobs,
  pagination:{
  page,
  limit,
  total,
  totalPages:Math.ceil(total/limit),
  hasMore:skip + jobs.length <total,
},
  };

  //step 3 store i cahce for 30 second (TTL)
  await redis.setex(cachekey,90,result); //now the job is refresher 1min 30 sec  if we want w can make it 30 sec later 

  res.json(result);
}catch(err){
  logger.error("Jobs fetch failed:",err.message);
  res.status(500).json({message:"Failed to fetch jobs"});
}
});


// ─────────────────────────────────────────────────────────────────
// GET /api/jobs/my-jobs – Recruiter's own jobs
// ─────────────────────────────────────────────────────────────────
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { postedBy: req.user.id };
    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Optionally attach applicant counts
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ jobId: job._id });
        return { ...job.toObject(), applicantCount: count };
      })
    );

    res.json({
      jobs: jobsWithCounts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + jobs.length < total,
      },
    });
  } catch (err) {
    console.error("Error fetching my jobs:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────
// POST /api/jobs – Create a job (Recruiter/Admin)
// ─────────────────────────────────────────────────────────────────
router.post(
  "/",
  [verifyToken, adminMiddleware],
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("requirements").isArray().withMessage("Requirements must be an array"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        title,
        company,
        location,
        salary,
        description,
        requirements,
        deadline,
        autoEvaluate,
        evaluationMode,
        type = "Full-time",
      } = req.body;

      const newJob = new Job({
        title,
        company,
        location,
        salary,
        description,
        requirements: requirements || [],
        type,
        atsEnabled: requirements?.length > 0,
        deadline,
        postedBy: req.user.id,
        autoEvaluate: autoEvaluate === true,
        evaluationMode: evaluationMode || "local",
      });

      const savedJob = await newJob.save();

      // make the redis clear and get new updated job list to store so delete it 
      await clearJobListCache();

//logger info on saved
logger.info(`Job posted by user ${req.user.id}:${title}`);

      // Send response immediately
      res.status(201).json(savedJob);

      // Background tasks: job alerts
      setImmediate(async () => {
        try {
          const matchingAlerts = await JobAlert.find({ keywords: { $in: [title] } });
          if (matchingAlerts.length) {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            });
            const Notification = require("../models/Notification");
            const notifs = matchingAlerts.map((alert) => ({
              user: alert.userId,
              title: "New Job Match!",
              message: `${company} just posted a ${title} position.`,
              relatedLink: "/jobs",
            }));
            await Notification.insertMany(notifs);

            matchingAlerts.forEach((alert) => {
              transporter.sendMail({
                from: `"Axon Hire" <${process.env.EMAIL_FROM}>`,
                to: alert.userEmail,
                subject: `🔥 New Job Alert: ${title}`,
                html: `<h3>New Job Found: ${title}</h3><p>Posted by ${company}</p>`,
              });
            });
          }
        } catch (bgError) {
          console.error("Background Alert Error:", bgError);
        }
      });
    } catch (err) {
      console.error("Error posting job:", err.message);
      if (!res.headersSent) res.status(500).json({ message: "Server error" });
    }
  }
);

// ─────────────────────────────────────────────────────────────────
// DELETE /api/jobs/:id – Delete job and its applications
// ─────────────────────────────────────────────────────────────────
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Job.findByIdAndDelete(jobId);
    await Application.deleteMany({ jobId });


    //after deletin the jobs also clearn the redis joblist then readd the fressh data all in it 
    await clearJobListCache();

    res.json({ message: "Job and associated applications removed" });
  } catch (err) {
    console.error("Delete job error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────
// PATCH /api/jobs/:id/toggle – Toggle job open/closed
// ─────────────────────────────────────────────────────────────────
router.patch("/:id/toggle", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const postedById = job.postedBy._id ? job.postedBy._id.toString() : job.postedBy.toString();
    if (postedById !== userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const currentStatus = job.isOpen === undefined ? true : job.isOpen;
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { isOpen: !currentStatus },
      { new: true }
    );



    // when we update a  jobs or patch anything also we need to make the redis clearn and add fresh data or list of jobs in it 
    await clearJobListCache();

    res.json({ message: "Job status updated", job: updatedJob });
  } catch (err) {
    console.error("Toggle error:", err);
    res.status(500).json({ message: "Server error during toggle" });
  }
});

// ─────────────────────────────────────────────────────────────────
// POST /api/jobs/cron/cleanup – Close expired jobs (cron)
// ─────────────────────────────────────────────────────────────────
router.post("/cron/cleanup", async (req, res) => {
  const cronSecret = req.headers["x-cron-auth"];
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const now = new Date();
    const result = await Job.updateMany(
      { deadline: { $lt: now }, isOpen: true },
      { $set: { isOpen: false } }
    );
    res.json({ success: true, closedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


//temp test route
// Temp test route — DELETE THIS AFTER
router.get("/redis-test", async (req, res) => {
  try {
    await redis.set("test-key", { message: "hello from redis" });
    const value = await redis.get("test-key");
    res.json({ value }); // Should return { "value": { "message": "hello from redis" } }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;