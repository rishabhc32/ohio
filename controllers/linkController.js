const redis = require('../model/Redis');

module.exports = async function(link) {
    let checkResult = await redis.check(link);

    if(checkResult == false)
        throw "Link not found";
    
    let originalLink = await redis.get(link);
    if(originalLink instanceof Error || originalLink == false)
        return undefined;
    
    return originalLink;
}
