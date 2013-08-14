var P = require( "../../lib/model/package" ),
    path = require("path"),
    fs = require("fs"),
    testData = path.normalize( process.cwd( ) + "/data/testComp/" ),
    should = require( "should" );

describe( "Given a package", function( ) {
    it( "should be defined", function( ) {
        P.should.exists;
    } );
    describe( "and an instantiation", function( ) {
        var instance = new P(testData);

        it( "should be defined", function( ) {
            instance.should.exists;
        } );
        it( "should have validate method", function( ) {
            instance.validate.should.exists;
        } );
        it( "should have getJSON method", function( ) {
            instance.getJSON.should.exists;
        } );
        it( "should have getJSON method", function( ) {
            instance.path.should.exists;
        } );
        it( "should have generate method", function( ) {
            instance.generate.should.exists;
        } );
        it( "validate method should work", function( ) {
            var errors = instance.validate();
            errors.length.should.equal(0);
        } );
        it( "validate method should work", function(done) {
            instance.load( function(res) {
                res.length.should.equal(3)
                done();
            } );
        } );
        it( "validate method should work", function(done) {
            instance.load( function(res) {
                var value = instance.generate();
                value.should.exists;
                done();
            });
        } );
    } );
} );