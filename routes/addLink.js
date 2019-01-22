const express = require('express');
const debug = require('debug')('routes/addLink');
const request = require('request');

const router = express.Router();
const addLinkController = require('../controllers/addLinkController');

router.post('/', async (req, res) => {
    try {
        const {link} = req.body;
        debug(link);

        let Url = new URL(link);
        await checkLink(link);
        
        let value = await addLinkController(link);
        debug(value);

        if(value === undefined)
            res.sendStatus(500);
        
        res.send(value);
    }
    catch(Err) {
        debug(Err);
        res.sendStatus(400);
    }
});

module.exports = router;


function checkLink(link) {
    return new Promise((resolve, reject) => {
        request(link, function (error, response, body) {       
            if(error)
                return reject(error);
            if(response.statusCode !== 200)
               return reject(`Link not found status code: ${response.statusCode}`);

            resolve("Ok");
        });
    });
}
