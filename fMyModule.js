var log = function(obj) {
	if(chrome && chrome.runtime) {
		chrome.runtime.sendMessage({type: "bglog", obj: obj});
		//console.log(obj);
	}
}
var onMessageListener = function(message, sender, sendResponse) {
	switch(message.type) {
        case "cookies":
        log("response got");
            log(message.obj);
        break;
    }
    return true;
}
var backgroundPageConnection = chrome.runtime.connect({
	name : "devtools-page"
});
backgroundPageConnection.postMessage({});
backgroundPageConnection.onMessage.addListener(function(message) {
	log("got the message");
});

//chrome.runtime.onMessage.addListener(onMessageListener);

window.onerror = function(err, url, number){
	log(err);
	log(url);
	log(number);
}
var testObject = {
	testField: "FieldIsWorking",
	testMethod: function(){
		log("method is working");
		console.log("method is working");
	}
};
//testObject.testMethod();
//var abc  = chrome.devtools.inspectedWindow.tabId;
/*log(testObject);
console.log(testObject);*/
//alert(angular.version.codeName);
//log(angular.version);

/*try{
	log(Resources.url);
}catch(e){
	log(e.message);
}*/
//log(Resource.url);

//chrome.devtools.inspectedWindow.eval('log();console.log("test")');
//chrome.devtools.inspectedWindow.eval.apply(this, ['try {console.log(test)}catch(e){console.log("test")}']);
//chrome.devtools.inspectedWindow.reload();
var myModule  = angular.module('myModule', []);
myModule.controller('cookieCtrl', function($scope, $timeout, cookieService){
	$scope.test = 123;
	$scope.doubletest = "abc";
	$scope.a = cookieService.testing;
	//log(cookieService.testing);
	log(chrome);
	$scope.service = cookieService;
	chrome.runtime.sendMessage({type: "getCookies"});
	//log($scope.service);
	//console.log($scope.service);
	//$scope.service.init();
	//$scope.service.tests();
	//$timeout(function(){$scope.cookie = $scope.service.cache; log($scope.cookie)},400);

	//chrome.devtools.inspectedWindow.eval('console.log("fmm is working")');

});
//log(myModule);