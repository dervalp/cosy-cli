var colors = require('colors');

var cosy = "cosy ".italic.cyan;

module.exports = {
    componentInputs: {
        properties: {
            name: {
                pattern: /^[a-zA-Z\s\-]+$/,
                message: "Name must be only letters, spaces, or dashes",
                required: true
            },
            version: {
                message: "version",
                default: '0.0.0'
            },
            hasTemplate: {
                message: "Will you need a tempalte ? (y/n) "
            },
            hasJs: { 
                message: "Will you need javascript ? (y/n) "
            },
            hasCss: {
                message: "Wil you need style for you component ? (y/n)"
            }
        }
    },
    packageInputs: {
        properties: {
            name: {
                pattern: /^[a-zA-Z\s\-]+$/,
                message: "Name must be only letters, spaces, or dashes",
                required: true
            },
            version: {
                message: "version",
                default: '0.0.0'
            }
        }
    },
    installing: function(name) {
        console.log(cosy + 'Start installing, fetching data for '.green + name);
    },
    publishing :  function( path ) {
        console.log(cosy + 'Start publishing, fetching data from '.green + path);
    },
    uploading: function( url ) {
      console.log(cosy + 'Start Uploading to :'.green + url);
    },
    packageInfo: function( package ) {
        if(!package.help) {
            console.log(cosy + "WARN".underline.red + " component.json does not have an help (.txt|.md) file !");
        }

        console.log(cosy + "Package name : " + ' ' + package.name.green);

        for(var i in package) {
            if(i !== "name") {
                console.log(cosy + ('        '+ i + " :") + ' ' + package[i].green);
            }
        }
    },
    packageUploaded: function( package, url ) {
      console.log( cosy + "Package " + package.name.green + " has been uploaded." );
      console.log( cosy + "Information about the package is available at : " + url.green );
    },
    put: function(url) {
        console.log( cosy + "http".green + " " + "PUT".magenta + " " + url );
    },
    get: function(url) {
        console.log( cosy + "http".green + " " + "GET".magenta + " " + url );
    }
}