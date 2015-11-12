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
	$scope.createShow = false;
	
	$scope.bufferid;
	$scope.destCookie = {};
	$scope.destCookie.name = "";
	$scope.destCookie.value = "";
	$scope.cookies = []
	$scope.cookieService = cookieService;
	$scope.buffer = {};
	$scope.setShow = function(){
		$scope.createShow = !$scope.createShow;
		log('all');
	}
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
		
		}, 50);
		$scope.apply();
	}
	$scope.cookieUpdate = function(){
		log($scope.cookies[$scope.buffer.number]);
		cookieService.updateCookie($scope.buffer, $scope.cookies[$scope.buffer.number]);
		$scope.cancel();
	},
	$scope.cookieDelete = function(){
		cookieService.deleteCookie($scope.buffer);
		$scope.cancel();
	}
	$scope.select = function(cookieNumber){
		$scope.buffer = {};
		var forClone = $scope.cookies[cookieNumber];
		log(forClone);
		//$scope.buffer = $scope.cookies[cookieNumber];
		for (var key in forClone) {
			$scope.buffer[key] = forClone[key];
		}
		//log($scope.buffer);
		$scope.cookies.forEach(function(item){
			item.selected = false;
		});
		$scope.cookies[cookieNumber].selected = true;

	}
	$scope.cookieCreate = function(){
		log($scope.destCookie);
		cookieService.createCookie($scope.destCookie);
		$scope.cancel();
	}
	$scope.cancel = function(){
		$scope.cookies.forEach(function(item){
			item.selected = false;
		});
		//log($scope.cookies[$scope.buffer.number]);
		//log($scope.buffer);
		$scope.cookies[$scope.buffer.number] = $scope.buffer;
		$scope.cookies[$scope.buffer.number].selected = false;
		$scope.update();
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
	});
});
