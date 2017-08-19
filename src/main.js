window.addEventListener('load', function() {

	define('main', ['graphic', 'input'], function(graphic, input) {
		function start() {
			graphic.hello();
			input.hello();
		}

		start();
	});

});