var request = require("request"),
    StringDecoder = require('string_decoder').StringDecoder,
    DOMAIN = "http://localhost:3000",
    fs = require("fs"),
    prompt = require("./prompt");

var apiURL = {
    put: DOMAIN + "/component/",
    get: function(name, options) {
        var result = DOMAIN + "/component/" + name;

        if(options && options.version) {
            result += "?version=" + options.version;
        }

        return result;
    },
    getPackage: DOMAIN + "/package/",
    package: DOMAIN + "/package/"
};

var put = function(obj, cb) {

    prompt.packageInfo(obj.json);

    var decoder = obj.buffer.toString('base64');

    prompt.put(apiURL.put);

    var r = request.put({ url:apiURL.put, encoding: 'utf-8' }, function(err, resp, body){
           var p = JSON.parse(body);
           prompt.packageUploaded(p, "gooo");
        }),
        form = r.form();

    form.append("json", JSON.stringify(obj.json));
    form.append("package", decoder);
};

var get = function(name, options, cb) {
    options = options || {};

    prompt.get(apiURL.get("name"));
    var r = request({ url: apiURL.get(name, options), encoding: 'utf-8' }, function(err, resp, body) {
       cb(err, body);
    });
};

var package = function(body, options, cb) {

    var r = request.put({ url:apiURL.package, encoding: 'utf-8' }, function(err, resp, body) {
           var p = JSON.parse(body);
           console.log("done!");
        }),
        form = r.form();

    form.append("package", body);
};

var getPackage = function() {
    var r = request.get({ url:apiURL.getPackage, encoding: 'utf-8' }, function(err, resp, body) {
       var p = JSON.parse(body);
    });
};

var repo = {
    put: put,
    get: get,
    getPackage: getPackage,
    package: package
};

module.exports = repo;