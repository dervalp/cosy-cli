var pathLib = require("path"),
    repo = require("./repo"),
    promptText = require("./prompt"),
    client = require("./client"),
    prompt = require('prompt'),
    cosyFileFactory = require("./factory/cosy"),
    packageFactory = require("./factory/package"),
    componentFactory = require("./factory/component");

var cwd = process.cwd( );

var onErr = function (err) {
    console.log(err);
    return 1;
};

var installPackage = function( ) {
    var comps = client.components();

    if(!comps) { return false; }

    for(var i in comps) {
        install( i, { version: comps[i] } );
    }
};

var install = function(name, options) {
     promptText.installing(name);

    repo.get(name, options, function(err, body) {
        client.install(err, body);
        if(options.save) {
            client.update(body);
        }
    });
};

var publish = function( path ) {
    promptText.publishing( path );

    var packagePath = ( path ) ? pathLib.normalize(cwd + "/" + path) : cwd;

    packageFactory.create( packagePath, function( errors, content ) {
        if(errors) { console.log(errors); }
        repo.put( content );
    });
};

var publishPackage = function( ) {
    var cosyRaw = client.cosyFile(),
        package = JSON.parse(cosyRaw);

    repo.package(package);
};

module.exports = {
    install: function( name, options ) {

        if(name) {
           install(name, options);
        } else {
            installPackage();
        }
    },
    publish: function( path, options ) {
        if(!path && options.package) {
            publishPackage( );
        } else {
            publish( path );
        }
    },
    create: function( ) {
        prompt.get(promptText.componentInputs, function (err, result) {
            if (err) { return onErr(err); }

            componentFactory.create(result);
        });
    },
    init: function( ) {
        prompt.get(promptText.packageInputs, function (err, result) {
            if (err) { return onErr(err); }

            cosyFileFactory.create(result);
        });
    }
}