var fs = require( "fs" ),
    AdmZip = require('adm-zip');
    path = require( 'path' ),
    read = fs.readFileSync,
    Batch = require( "batch" ),
    basename = path.basename,
    events = require('events'),
    exists = fs.existsSync;

var Package = function( dir ) {
    this.dir = dir;
    this.json = this.getJSON( );
    this.zip = new AdmZip();
    if(!this.json.category) {
        this.json.category = "ui";
    }
    events.EventEmitter.call(this);
};

Package.prototype.__proto__ = events.EventEmitter.prototype;

Package.prototype.validate = function( ) {
    var errors = [];

    if(!this.json.name) {
        errors.push({ param: "name", msg:"no name for the component"});
    }
    if(!this.json.version) {
        errors.push({ param: "version", msg:"no version for the component"});
    }

    if(!this.json.templates && !this.json.styles && !this.json.scripts) {
        errors.push({ param: "scripts", msg:"should at least have a file for [scripts|templates|styles]"});
    }

    return errors;
};

var toArray = function(param) {
    if(param.indexOf("[") === 0 && param.indexOf("]") === param.length) {
        return param.slice( 1, param.length - 1 ).split( "," );
    }
    return param;
};

var loadSingleFile = function( done ) {
    var file = this.file,
        name = this.name;

    fs.readFile( file, 'utf8', function( err, str ) {

        if ( err ) return done( err );

        done( null, {
            file: file,
            name: name,
            content: str
        });
    } );
};

Package.prototype.load = function( cb ) {
    var filesToLoad = [],
        self = this,
        json = this.json,
        batch = new Batch;

    if(json.templates) {
        filesToLoad = filesToLoad.concat( toArray( json.templates ) );
    }

    if(json.scripts) {
        filesToLoad = filesToLoad.concat( toArray( json.scripts ) );
    }

    if(json.styles) {
        filesToLoad = filesToLoad.concat( toArray( json.styles ) );
    }

    filesToLoad.forEach( function(file) {
        var f = path.normalize(self.dir + "/" + file);

        batch.push( loadSingleFile.bind( { file : f, name: file } ) );
    });

    batch.end( function(err, res) {
        self._load = res;
        self.emit('loaded', res);

        cb(res)
    });
};

Package.prototype.generate = function( cb ) {
    var self = this;

    this._load.forEach( function(f) {
        self.zip.addFile(f.name, new Buffer(f.content));
    });

    return this.zip.toBuffer();
};

Package.prototype.getJSON = function( ) {
    var path = this.path( 'component.json' ),
        str = read( path, 'utf8' );

    try {
        var obj = JSON.parse( str );
    } catch ( err ) {
        err.message += ' in ' + path;
        throw err;
    }

    normalizeConfig( obj );

    return obj;
};

Package.prototype.path = function( file ) {
    return path.resolve( path.join( this.dir, file ) );
};

var normalizeConfig = function( conf ) {
    // support "./" in main
    if ( conf.main ) conf.main = conf.main.replace( /^\.\//, '' );
};

module.exports = Package;