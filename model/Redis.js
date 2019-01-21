const redis = require('redis');
const promisify = require('../helpers/promisifyFunction');
const debug = require('debug')('model/redis');

const redisClient = redis.createClient({
    enable_offline_queue: false,
    retry_strategy: (options) => {
        if(options.attempt < 10) 
            return 5000;
        
        return undefined;
    }
});

const redisSet = promisify(redisClient.set, redisClient); 
const redisIncr = promisify(redisClient.incr, redisClient);
const redisGet = promisify(redisClient.get, redisClient);
const redisCheck = promisify(redisClient.ping, redisClient);
const redisExists = promisify(redisClient.exists, redisClient);

const INCR_KEY = process.env.INCR_KEY || "INCR_KEY";

async function moduleSet(link) {
    try {
        let isConnected = await redisCheck();

        if(!isConnected)
            throw "Database Not Connected";
         
        let currKey = await redisIncr(INCR_KEY);
        redisSet(currKey, link);

        debug('Database write successful');
        return await redisGet(INCR_KEY);            
    }
    catch(Err) {
        debug("moduleSet Error");
        return Err;
    }
} 

async function moduleGet(num) {
    try {
        if(num == false)
            throw "moduleGet is undefined";

        let link = await redisGet(num);

        debug(`REDIS GET: ${link}`);
        return link;
    }
    catch(Err) {
        debug("moduleGet Error");
        return Err;
    }
}

async function modulesCheck(link) {
    try {
        let ans = await redisExists(link);
        debug(`moduleCheck ans: ${ans}`);

        return ans;
    }
    catch(Err) {
        debug("moduleCheck Error");
        return Err;
    }
}

function moduleQuit() {
    redisClient.quit();
}

module.exports = {
    redisClient: redisClient,
    set: moduleSet,
    get: moduleGet,
    check: modulesCheck,
    redisQuit: moduleQuit,
};

redisClient.on("error", (err) => {
    debug(err);
});

redisClient.on("reconnecting", (opt) => {
    const {delay, attempt} = opt;
    debug(`Reconnecting... Attempt #${attempt} Delay ${delay}ms`);
});

redisClient.on("ready", () => {
    debug("Redis Connection Established");
});

redisClient.on("end", () => {
    debug("Redis Connection Closed");
});

