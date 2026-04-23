//this is the worker that picks jobs from the queue and runs ai analysis
//it runs in the background and process jobs one by one

const {Worker}=require("bullmq");
//import worker class from bullmq

const Application=require("../models/Application");
//need to update the application with ai results

const { performAnalysis } = require("../routes/aiRoutes.js");
//reuse the exisiting ai analysis function

const logger=require("../utils/logger");
const { application } = require("express");
//for loggin job progres/erros

const connection={
    host:process.env.REDIS_HOST || "localhost",
    port:parseInt(process.env.REDIS_PORT || "6379"),
    password:process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_HOST !== "localhost" ? {} : undefined
    //same redis config as queue
};

//create worker that prcoess ai-analysis jobs
const aiWorker=new Worker(
    "ai-analysis", //must match queue name
    async(job)=>{
        //this function runs for each job in the queue
const { applicationId, resumeUrl, jobId, evaluationMode } = job.data;
        //extract job data (what we passed when adding the job)

        logger.info(`Processing AI analysis for application ${applicationId}`);
        //log that we're starting (for monitoring)

        const result=await performAnalysis(resumeUrl,jobId,evaluationMode);
        //run the actual ai analysis (same code as before)

        await Application.findByIdAndUpdate(applicationId,{
            aiAnalysis:[result.analysis],
        });
        //save the result to the database

        logger.info(`AI analysis complete for application ${applicationId}`);
        //log completion
    },
    {
        connection, //redis connection 
        concurrency:2, //proces max 2 jobs at once (avoid overwhelming AI APIs)
        limiter:{
            max:10, //max 10 jobs per 60 seconds(rate limiting)
            duration:60000, //60 sec window
        }, //prevents hitting ai api rate limit
    }
);

//handle failed jobs
aiWorker.on("failed",(job,err)=>{
    logger.error(`AI job ${job.id} failed: ${err.message}`);
    //log failure for debugging
});

module.exports=aiWorker;
//export for starting in server.js
