var AdmZip = require("adm-zip"),
    fs = require("fs"),
    path = require("path"),
    fileSystem = require("./utils/fileSystem");

var cwd = process.cwd( );

module.exports = {
    install: function( err, body ) {
        var json = JSON.parse(body),
            packageLocation = path.normalize( fileSystem.package(json.meta) + "/package.zip" ),
            cosyLocation = fileSystem.cosy(json.meta);

        var bu = new Buffer(json.data, 'base64');

        var err = fs.writeFileSync( packageLocation, bu );
        var zip = new AdmZip(packageLocation);

        zip.extractAllTo(cosyLocation, /*overwrite*/true);
    },
    update: function(body) {

        var path = fileSystem.cosyPath(),
            compInfo = JSON.parse(body),
            meta = compInfo.meta;

        if (!fs.existsSync(path)) {
            console.log("Cannot save component, no cosy.json file found");
        } else {
            var cosy = fs.readFileSync(path, 'utf8');
            var cosyPackage = JSON.parse(cosy);

            cosyPackage.components[meta.name] = "~" + meta.version;

            fs.writeFileSync(path, JSON.stringify(cosyPackage, null, '\t'));
        }
    },
    components: function() {
        var path = fileSystem.cosyPath();

        var raw = fs.readFileSync(path, 'utf8');

        var cosy = JSON.parse(raw);

        return cosy.components;
    },
    cosyFile: function() {
        var result = fs.readFileSync(path.normalize( cwd + "/component.json" ), 'utf8');

        return result;
    }
};