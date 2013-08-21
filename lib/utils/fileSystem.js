var fs = require("fs"),
    path = require("path");

var COSY_MODULES = process.cwd( ) + "/cosy_modules/";
var COSY_FILE = "cosy.json";
var COSY_PATH = path.normalize( process.cwd( ) + "/" + COSY_FILE );

var getUserHome = function () {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};

var getCosyTemp = function () {
    return path.normalize(getUserHome() + "/.cosy/");
};

module.exports = {
    temp: function () {
        var cosyTemp = getCosyTemp();

        if (!fs.existsSync(cosyTemp)) {
            fs.mkdirSync(cosyTemp);
        }

        return cosyTemp;
    },
    component: function(meta) {
        var t = this.cosyModules(),
            packagePath = path.normalize( t + "/" + meta.name );

        if (!fs.existsSync(packagePath)) {
            fs.mkdirSync(packagePath);
        }

        return packagePath;
    },
    package: function(meta) {
        var t = this.temp(),
            packagePath = path.normalize( t + "/" + meta.name ),
            versionPath = path.normalize( packagePath + "/" + meta.version );

        if (!fs.existsSync(packagePath)) {
            fs.mkdirSync(packagePath);
        }

        if (!fs.existsSync(versionPath)) {
            fs.mkdirSync(versionPath);
        }

        return path.normalize(versionPath);
    },
    cosyModules: function() {

        if (!fs.existsSync(COSY_MODULES)) {
            fs.mkdirSync(COSY_MODULES);
        }

        return COSY_MODULES;
    },
    cosy: function(meta) {
        var cosyPath = this.cosyModules();
        return path.normalize( cosyPath + meta.name );
    },
    cosyPath: function() {
        return COSY_PATH;
    }
};