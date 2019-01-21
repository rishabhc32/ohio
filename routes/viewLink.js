const router = require('express').Router();
const debug = require('debug')('route/viewLink');
const checkLink = require('../helpers/checkLink');

const viewLinkController = require('../controllers/linkController');

router.get('/', async(req, res) => {
    try {
        let requestedLink = req.query.link;
        if(requestedLink === undefined)
            throw "Bad Query, query parameter link not defined";
            
        debug(`Requested Link: ${requestedLink}`);

        requestedLink = checkLink(requestedLink);

        let originalLink = await viewLinkController(requestedLink);

        if(originalLink === undefined)
            res.sendStatus(500);
        
        res.send(originalLink);
    }
    catch(Err) {
        debug(Err);
        res.sendStatus(400);
    }
});

module.exports = router;
