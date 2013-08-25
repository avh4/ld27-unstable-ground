var requirejs = require('requirejs');
var nodeReporters = require('jasmine-node/lib/jasmine-node/reporter').jasmineNode;

// list all the tests to be run
var specs = [
    'test/player_spec.js'
    , 'test/Building1_spec.js'
    , 'test/Building2_spec.js'
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
 	jasmine.getEnv().addReporter(new nodeReporters.TerminalReporter({color: true}));
    jasmine.getEnv().execute();
});