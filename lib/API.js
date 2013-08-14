/**
 * Module dependencies.
 */

var program = require( 'commander' );

var cli = require("./cli");

program
    .version( '0.0.1' )

program
    .command( 'install [name]' )
    .action(cli.install);
//.option( '-b, --bbq', 'Add bbq sauce' )
// .option( '-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble' )

program
    .command( 'publish [path]' )
    .action(cli.publish);

program.parse( process.argv );

//if ( program.peppers ) console.log( '  - peppers' );