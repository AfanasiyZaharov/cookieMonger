//TODO change a way to deal with service
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
	$scope.bufferid;
	$scope.domain;
	$scope.name;
	$scope.value;
	$scope.cookies = []
	$scope.cookieService = cookieService;
	$scope.buffer;
	$scope.init = function(){
		cookieService.init();
		$timeout(function(){
			
			for(var i = 0; i<cookieService.cache.length; i++){
				$scope.cookies.push(cookieService.cache[i])
				$scope.cookies[i].selected = false;
				$scope.cookies[i].number  = i;
			}
		

		}, 500);
	}
	$scope.update = function(){
		log(' update working now');
		
		
			$timeout(function(){
				$scope.cookies = [];
				log(cookieService.cache);
				for(var i = 0; i<cookieService.cache.length; i++){
				$scope.cookies.push(cookieService.cache[i])
				$scope.cookies[i].selected = false;
				$scope.cookies[i].number  = i;
			}
			
			log($scope.cookies);
			
		}, 15);
		$scope.apply();
	}
	$scope.cookieUpdate = function(){
		log($scope.domain);
		cookieService.updateCookie($scope.buffer, {domain: $scope.domain, value: $scope.value, name: $scope.name});
		$scope.cancel();
	},
	$scope.cookieDelete = function(cookie){
		cookieService.deleteCookie(cookie);
		$scope.cancel();
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
		//$scope.update();
	}


	$scope.init();
	
	$scope.$watch(function(){
		return cookieService.cache;
	}, function(newValue, oldValue){
		log('watcher');
		log('newValue');
		log(newValue);
		log('oldValue');
		log(oldValue);
		$scope.update();
	})
	$timeout(function(){
		//log(cookieService.cache);
		//log(cookieService.cache);
		log($scope.cookies);
	},1500)






});
