var Package = require("../model/package");

module.exports = {
    create: function(path, cb) {
        var p = new Package( path );

        var errors = p.validate( );

        p.load( function() {
            cb( errors, p.generate( ) );
        } );
    }
};