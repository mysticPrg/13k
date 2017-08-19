window.addEventListener('load', function() {

	define('Main', ['Graphic', 'Input'], function(Graphic, Input) {
		function start() {
			Graphic.hello();
			Input.hello();
		}

		start();
	});

});