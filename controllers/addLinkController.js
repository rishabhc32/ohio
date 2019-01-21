const Redis = require('../model/Redis');
const debug = require('debug')('controller/addLink');

module.exports = async function(link) {
    let val = await Redis.set(link);

    if(val instanceof Error)
        return undefined;

    return val;
}

