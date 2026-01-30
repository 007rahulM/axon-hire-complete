//we yse ouy exisiting axios setup
import Interview from "../../../backend/models/Interview";
import Job from "../../../backend/models/Job";
import axios from "./axiosInstance";
 
//function to start an interview
export const startInterview=async(jobId)=>{
    try{
        //make a post request to our new backend route
        const response=await axios.post("/interview/starts",{jobId});
        //if successful, return the data question +interview
        return response.data;

    }catch(err){
        //if it fails, log it and throw erro so the ui knows 
        console.error("Error starting interview:",err);
        throw err;
    }

};

//function to submit an answer
export const submitAnswer=async(interviewId,questionIndex,answer)=>{
    try{
        const response=await axios.put("/intrview/answer",{
            interviewId,
            questionIndex,
            answer
        });
        return response.data;

    }catch(err){
        console.error("Error submittin answer:",err);
        throw err;
    }
};