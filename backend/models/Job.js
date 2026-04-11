const mongoose = require("mongoose");
const Schema=mongoose.Schema;
// create a new blueprint (Schema) for jobs
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type:{
    type:String,
enum:["Full-time","Part-time","Contract","Internship","Remote","Freelance"],
default:"Full-time",
  },
  salary: {
    type: String,
    required: true,
  },
  description:{
  type:String,
  required:true,

  },
  requirements:{
    type:[String], //array of skills 
    default:[]
  },
   // Controls whether ATS scoring is allowed for this job
    atsEnabled: {
      type: Boolean,
      default: true
    },

    // 👇 NEW FIELD: Controls visibility
  isOpen: { 
    type: Boolean, 
    default: true 
  },
  // 👇 ADD THIS FIELD HERE
  deadline: { 
    type: Date 
  },
 
  //--------new field link the job to the recruiter who posted it
  postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true 
    },
    // 🚀 NEW V3 OPTIONS: Recruiter Choice Architecture
  autoEvaluate: { 
    type: Boolean, 
    default: false // Resumes arrive raw unless this is toggled ON
  },
  evaluationMode: {
    type: String,
    enum: ["local", "ai"],
    default: "local" // Recruiter chooses between Local Math or Deep AI
  },
 applicants: [{
      candidateId: { type: Schema.Types.ObjectId, ref: 'User' },
      appliedAt: { type: Date, default: Date.now }
  }]
  },
  // we can even link it to the admin who posted it
  // postedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }
 { timestamps: true }); // Automatically adds createdAt and updatedAt


 //indexes for serach to imporve performace more
 jobSchema.index({title:1});
 jobSchema.index({location:1});
 jobSchema.index({type:1});
 jobSchema.index({createdAt:-1});
 jobSchema.index({postedBy:1}); // for "my-jobs" route — find all jobs by a recruiter
 jobSchema.index({isOpen:1, createdAt:-1}); // for browsing open jobs sorted by newest


//export this router so server.js can use it
module.exports = mongoose.model("Job", jobSchema);