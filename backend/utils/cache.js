const {Redis}=require("@upstash/redis");
//create one shared redis client
//uses env vars from .en file

let redis;

//graceful fallback : if env vars missing eg., in dev no -op so app doesn't crash
if(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN){
    redis=new Redis({
        url:process.env.UPSTASH_REDIS_REST_URL,
        token:process.env.UPSTASH_REDIS_REST_TOKEN,
    });
}else{
        console.warn("Redis not configured -caching disabled (graceful degreadation");
        redis={
            get:async()=>null, //always miss- falls back to db 
            setex:async()=>{}, //no -op 
            del:async()=>{}, //no -op
            keys:async()=>[], //no -op
        };
    }



    module.exports=redis;