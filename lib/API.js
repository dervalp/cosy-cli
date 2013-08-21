/**
 * Module dependencies.
 */

var program = require( 'commander' );

function Command(name) {
  this.commands = [];
  this.options = [];
  this.args = [];
  this.name = name;
}

var cli = require("./cli");

program
    .version( '0.0.1' )

program
    .command( 'install [name]' )
    .option( '-s, --save', 'saving components into cosy.json' )
    .action( cli.install );

program
    .command( 'publish [path]' )
    .option( '-p, --package', 'publish my package' )
    .action( cli.publish );

program
    .command( 'create' )
    .action( cli.create );

program
    .command( 'init' )
    .action( cli.init );

program.parse( process.argv );