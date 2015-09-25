var myModule  = angular.module('myModule', []);
myModule.controller('cookieCtrl', function($scope, $timeout, cookieService){
	$scope.cookies = [];
	$scope.test = 0;
	$scope.fucking = {};
	$scope.currentPage = 1;
	//$scope.fucking.fuck;
	$scope.cookiesPerPage = 100;
	//$scope.cookies = cookieService.cache;
	$scope.niceUsingServices = cookieService;
	$scope.niceUsingServices.init();
	$scope.showingCookies = [];
	$scope.paging = function(cookies, oldPage, left){
		$scope.showingCookies = [];
		for(var i = 0; i < $scope.cookiesPerPage; i++ ){
			if(!left){
				$scope.showingCookies.push($scope.cookies[(oldPage+1)*$scope.cookiesPerPage + i]);
			}else{
				$scope.showingCookies.push($scope.cookies[(oldPage-1)*$scope.cookiesPerPage + i]);
			}
		};


	}
	$scope.left = function(){
		if($scope.currentPage!=1){
			$scope.paging($scope.cookies, $scope.currentPage, true);
		}
		$scope.currentPage--;
	}
	$scope.right = function(){
		
			$scope.paging($scope.cookies, $scope.currentPage, false);
			$scope.currentPage++;
		
	}
	$scope.start = function(){
		for(var i = 0; i < $scope.cookiesPerPage; i++ ){
			$scope.showingCookies.push($scope.cookies[i]);
		}
	}

	/*$scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.filteredTodos = $scope.todos.slice(begin, end);
    */
	$scope.$watch('niceUsingServices.cache', function(){
		//console.log('mes');
		$timeout(function(){
			$scope.cookies = $scope.niceUsingServices.cache;

		},300);
		console.log('watching is working');
		$scope.test +=1;
		
		
	}, true);
		$timeout(function(){$scope.start();},500);

})