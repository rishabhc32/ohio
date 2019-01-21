module.exports = function(incomingLink) {
    const parsedLink = parseInt(incomingLink.replace(/\//g, ''));

    if(isNaN(parsedLink))
        throw `Link not correctly specified ${incomingLink}`;

    return parsedLink;
}