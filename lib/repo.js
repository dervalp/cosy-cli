var request = require("request");
var DOMAIN = "http://localhost:3000/";

var apiURL = {
    put: DOMAIN + "/component/"
};

var put = function(buffer, cb) {
    request.put(apiURL.put, function(err, res){
        console.log(err);
        cb();
    });
};

var repo = {
    put: put
};

module.exports = repo;