var fileSystem = require("../utils/fileSystem"),
    fs = require("fs"),
    handlebars = require("handlebars"),
    path = require("path");

var defaultComponent = {
    name: ""
};

module.exports = {
    create: function( metadata ) {
        metadata.components = {};
        fs.writeFileSync( fileSystem.cosyPath(), JSON.stringify(metadata, null, '\t'));
    }
};