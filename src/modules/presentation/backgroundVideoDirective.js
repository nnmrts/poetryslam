(function() {
	'use strict';
	angular.module('ps.presentation').directive('backgroundVideo', function($document, $timeout) {
		return {
			restrict: 'E',
			scope: {
				url: '='
			},
			template: '<div></div>',
			link: function(scope, element) {
				var currentUrl;
				var currentVideoElement;
				var timeoutPromise;

				scope.$watch('url', function(url) {
					if (timeoutPromise) {
						$timeout.cancel(timeoutPromise);
					}
					$document[0].body.classList.add("anim-video-delay-long");
					timeoutPromise = $timeout(function() {
						$document[0].body.classList.remove("anim-video-delay-long");
						timeoutPromise = null;
					}, 6000);

					console.log('recieved url: ' + url);
					if (url && url !== currentUrl) {
						// we have to do this to avoid flickering
						var newVideoElement = document.createElement('video');
						newVideoElement.classList.add('fullscreen-video');
						if (window.location.search && window.location.search.indexOf('embedded=1') >= 0) {
							newVideoElement.muted = true;
						}
						newVideoElement.addEventListener('canplay', function() {
							newVideoElement.play();
							element[0].appendChild(newVideoElement);
							currentUrl = url;

							try {
								$(currentVideoElement).remove();
							}
							catch (e) {

							}

							currentVideoElement = newVideoElement;
						});

						newVideoElement.src = url;
						newVideoElement.load();
					}
				});
			}
		}
	});
})();
