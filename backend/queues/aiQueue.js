//why this creates a named quque in redis for ai analysis jobs
// all workers will read from this same queue
const { Queue } = require("bullmq");
//why importa the queue class form bullmq libraray

const connection={
    host:process.env.REDIS_HOST || "localhost",
    port:parseInt(process.env.REDIS_PORT || "6379"),
    password:process.env.REDIS_PASSWORD,tls: process.env.REDIS_HOST !== "localhost" ? {} : undefined

    //why redise connection config uses upstash in production, locahost for developement
};

//why create a queue name ai-analysis in Redis
const aiQueue = new Queue("ai-analysis", { connection });
//ai-analyss is the queue name all jobs for ai will go here

module.exports=aiQueue;

//export so other files can add jobs to this queue

