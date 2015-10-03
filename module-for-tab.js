var log = function(obj) {
	if(chrome && chrome.runtime) {
		chrome.runtime.sendMessage({type: "bglog", obj: obj});
	
	}
}

window.onerror = function(err, url, number){
	log(err);
	log(url);
	log(number);
}


var myModule  = angular.module('myModule', []);
myModule.controller('cookieCtrl', function($scope, $timeout, cookieService){
	$scope.cookies = []
	
	$scope.service = cookieService;
	$scope.buffer;
	$scope.init = function(){
		$scope.service.init();
		$timeout(function(){
			
			for(var i = 0; i<$scope.service.cache.length; i++){
				$scope.cookies.push($scope.service.cache[i])
				$scope.cookies[i].selected = false;
				$scope.cookies[i].number  = i;
			}
		

		}, 300)
	}
	$scope.update = function(){
		log(' update working now');
		
		
			$timeout(function(){
				$scope.cookies = [];
				log($scope.service.cache);
				for(var i = 0; i<$scope.service.cache.length; i++){
				$scope.cookies.push($scope.service.cache[i])
				$scope.cookies[i].selected = false;
				$scope.cookies[i].number  = i;
			}
			
			log($scope.cookies);
			
		}, 15);
		//$scope.apply();
	}
	$scope.select = function(cookieNumber){
		$scope.buffer = $scope.cookies[cookieNumber];
		log($scope.buffer);
		$scope.cookies.forEach(function(item){
			item.selected = false;
		});
		$scope.cookies[cookieNumber].selected = true;

	}
	$scope.cancel = function(){
		$scope.cookies.forEach(function(item){
			item.selected = false;
		});
		$scope.update();
	}


	$scope.init();
	
	$scope.$watch('service.cache', function(newValue, oldValue){
		log('watcher');
		log('newValue');
		log(newValue);
		log('oldValue');
		log(oldValue);
		$scope.update();
	})
	






});
