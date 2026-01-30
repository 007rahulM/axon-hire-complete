const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,

    },
    questions:[
        {
            question:{type:String,required:true},
            useranswer:{type:String,default:""},
        }
    ],
    score:{
        type:Number,
        default:0
    },
    feedback:{
        type:"String",
        default:""

    }

})
module.exports=mongoose.model("Interview",interviewSchema);
