(function() {
	function define(moduleName, depStrList, callback) {
		define.modules = define.modules || {};

		var modules = define.modules;

		if ( modules[moduleName] ) {
			throw new Error('Duplicated module name: ' + moduleName);
		}

		var depList = [];

		var i,
			done = true,
			depModule;

		for ( i=0 ; i<depStrList.length ; i++ ) {
			depModule = modules[depStrList[i]];
			if ( !depModule ) {
				done = false;
				break;
			} else {
				depList.push(depModule);
			}
		}

		if ( done ) {
			setTimeout(function() {
				modules[moduleName] = callback.apply(window, depList);
			}, 0);
		} else {
			setTimeout(function() {
				define(moduleName, depStrList, callback);
			}, 10);
		}
	}

