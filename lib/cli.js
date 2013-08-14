var pathLib = require("path"),
    repo = require("./repo"),
    packageFactory = require("./factory/Package");

var cwd = process.cwd( );

module.exports = {
    install: function( name, options ) {
        console.log(name);
        var p = packageFactory.create(packageFactory);

    },
    publish: function( path, options ) {

        var packagePath = ( path ) ? pathLib.normalize(cwd + "/" + path) : cwd;
        packageFactory.create( packagePath, function( errors, content ) {
            if(errors) { console.log(errors); }
            repo.put( content );
        });
    }
}