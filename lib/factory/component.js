var fileSystem = require("../utils/fileSystem"),
    fs = require("fs"),
    handlebars = require("handlebars"),
    path = require("path");

var defaultComponent = {
    name: ""
};

var DEFAULT_TEMPLATE = "template.tmpl",
    DEFAULT_CSS = "style.css",
    DEFAULT_JS = "index.js";

var templateDefault = path.normalize(__dirname + "/../templates/template.txt");
var styleDefault = path.normalize(__dirname + "/../templates/css.txt");
var jsDefault = path.normalize(__dirname + "/../templates/js.txt");

var templateContent = fs.readFileSync(templateDefault, 'utf8');
var styleContent = fs.readFileSync(styleDefault, 'utf8');
var jsContent = fs.readFileSync(jsDefault, 'utf8');

var templateCompiled = handlebars.compile(templateContent);
var styleCompiled = handlebars.compile(styleContent);
var jsCompiled = handlebars.compile(jsContent);

module.exports = {
    create: function( metadata ) {
        var comp = {};

        var p = fileSystem.component(metadata);

        defaultComponent.name = metadata.name;
        comp.name = metadata.name;
        comp.id = 'cosy-id="{{id}}"';
        comp.class = 'class="' + comp.name.toLowerCase() + '"';
        defaultComponent.version = metadata.version;

        console.log(metadata);
        if(metadata.hasTemplate === "y") {
            defaultComponent.templates = DEFAULT_TEMPLATE;

            fs.writeFileSync(path.normalize(p + "/" + DEFAULT_TEMPLATE), templateCompiled(comp));
        }

        if(metadata.hasJs === "y") {
            defaultComponent.scripts = DEFAULT_JS;
            fs.writeFileSync(path.normalize(p + "/" + DEFAULT_JS), jsCompiled(comp));
        }

        if(metadata.hasCss === "y") {
            defaultComponent.styles = DEFAULT_CSS;
            fs.writeFileSync(path.normalize(p + "/" + DEFAULT_CSS), styleCompiled(comp));
        }

        fs.writeFileSync(path.normalize(p + "/component.json"), JSON.stringify(defaultComponent, null, '\t'));
    }
};