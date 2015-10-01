var log = function(obj) {
	if(chrome && chrome.runtime) {
		chrome.runtime.sendMessage({type: "bglog", obj: obj});
		//console.log(obj);
	}
}





window.onerror = function(err, url, number){
	log(err);
	log(url);
	log(number);
}




var myModule  = angular.module('myModule', []);
myModule.controller('cookieCtrl', function($scope, $timeout, cookieService){
	$scope.test = "test";
	$scope.cookies = []
	log(chrome);
	$scope.service = cookieService;
	$scope.buffer;
	$scope.init = function(){
		$scope.service.init();
		$timeout(function(){
			log($scope.service.cache);
			for(var i = 0; i<$scope.service.cache.length; i++){
				$scope.cookies.push($scope.service.cache[i])
				$scope.cookies[i].selected = false;
				$scope.cookies[i].number  = i;
			}
			log($scope.cookies);

		}, 300)
		$scope.select = function(cookieNumber){
			$scope.buffer = $scope.cookies[cookieNumber];
			log($scope.buffer);
			$scope.cookies.forEach(function(item){
				item.selected = false;
			});
			$scope.cookies[cookieNumber].selected = true;

		}
	}
	$scope.init();
	$scope.testing = function(obj, obj2){
		log(obj);
		log(obj2);
	}
		/*$timeout(function(){
		$scope.select(0);
	},1000);*/
	






});
