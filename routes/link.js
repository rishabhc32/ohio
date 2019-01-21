const router = require('express').Router();
const debug = require('debug')('route/link');
const checkLink = require('../helpers/checkLink');
const request = require('request');

const linkController = require('../controllers/linkController');

router.get('/', async(req, res) => {
    try {
        let link = req.baseUrl;
        debug(`Requested Link: ${link}`);

        link = checkLink(link);
            
        let originalLink = await linkController(link);

        if(originalLink === undefined)
            res.sendStatus(500);

        request.get(originalLink).pipe(res);
    }
    catch(Err) {
        debug(Err);
        res.sendStatus(400);
    }
});

module.exports = router;
