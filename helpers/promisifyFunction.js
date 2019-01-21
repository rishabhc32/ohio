const {promisify} = require('util');

module.exports = function(Func, bindThis) {
    if(Func) {
        promisedFunc = promisify(Func);
        return bindThis 
            ? promisedFunc.bind(bindThis) 
            : bindThis;

    }
    
    throw "'Func' not specified";
}
