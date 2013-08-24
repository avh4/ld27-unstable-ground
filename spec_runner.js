var requirejs = require('requirejs');

// // list all the tests to be run
var specs = [
    'test/player_spec.js'
//   , 'cs!specs/view.spec'
]

// set up require.js to play nicely with the test environment
requirejs.config({
    baseUrl: 'public/src',
    nodeRequire: require
});

// make define available globally like it is in the browser
global.define = require('requirejs');
jasmine = require('jasmine-node');

// map jasmine methods to global namespace
for (key in jasmine) {
  	if (jasmine[key] instanceof Function) {
		global[key] = jasmine[key];
	}
}

// require specs and run them with Jasmine as soon as they're loaded
requirejs(specs, function () {

	// tell Jasmine to use the boring console reporter:
    jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());

	// execute all specs
    jasmine.getEnv().execute();
});