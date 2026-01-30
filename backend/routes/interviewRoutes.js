const express =require('express');
const mongoose=require("mongoose");
const  Interview=require( "../models/Interview");
const Job=require("../models/Job");
const verifyToken = require('../middleware/authMiddleware');
const router=express.Router();
const{generateJSON}=require("../utils/aiServices");

router.post("/start",verifyToken,async(req,res)=>{
    try{
        //get jobid from the frontednd
        const{jobId}=req.body;
        //get userid security form the token 
        //verifytoken middleware added this to req.user
        const userId=req.user.id;
        //check if the job actually exists in the db
        const job=await Job.findById(jobId);

        //if no job found then stop here and tell frontend
        if(!job){
            return res.status(404).json({message:"Job not found"});
        }

console.log(`Generating questions for:${job.title}`);
//promt
//we want exactly 3 question in a stirck json format
const systemPromt=`
You are a strick Tenical Interviewer.
Task:Generate exactly 3 technical interview question based on the job title.

OUTPUT FORMAT:
Return a SINGLE JSON OBJECT with a key "questions" containing an array of 3 strings.
{"questions":["Question1?","Question2?",Question3?"]}

`;

const userPromt=`Job Title:${job.title} Focus on core skills for this role.`;

//ca;;ypu ai service
const aiResult=await generateJSON(systemPromt,userPromt);
//defualt question in case ai fails (its a backup plan)
let finalQuestions=[
    "Tell me about a challenging project you worked on",
    "What are you strenght regarding this role?",
    "Why do you want to join our company?"
];

//if ai worked, useits questions
if(aiResult,success && aiResult.data.questions && Array.isArray(aiResult.data.questions)){
    finalQuestions=aiResult.data.questions.slice(0,3); 

}

//save to database
//we map the string to the object struture we defined in Interview.js
const newInterview=new Interview({
    userId:userId,
    jobId:jobId,
    questions:finalQuestions.map(q=>({
        question:q,
        userAnswer:"" //empty initially
    
    })),
    score:0
});

await newInterview.save();
console.log("Interview Created:",newInterview._id);

///send back to frontend
res.status(201).json({
    message:"Interview started",
    interviewId:newInterview._id,
    questions:newInterview.questions

});
    }catch(err){
        console.error("Interview Start Error:",err);
        res.status(500).json({message:"Server Error"});
    }
});


module.exports=router;
