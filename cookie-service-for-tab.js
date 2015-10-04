//TODO remove all shit  

myModule.factory('cookieService', function() {
	var backgroundPageConnection = chrome.runtime.connect({
		name : "devtools-page"
	});
	var tabId = chrome.devtools.inspectedWindow.tabId;

	backgroundPageConnection.onMessage.addListener(function(message) {
		that.cache = message.cks;
	});
	var that = {};
	that.testing = "factory  injected";
	that.cache = [];
	that.tests = function(){
		log('methods');
	}
	var getCookiesinCache = function(cookies){
		for(var i = 0; i < cookies.length; i++){
			that.cache.push(cookies[i]);
		}
	}

	that.init = function(){
		that.cache = [];
		backgroundPageConnection.postMessage({
			type : "getall",
			tabId : tabId
		});
		log('init working');
		log(that.cache);
	}

	that.createCookie = function(cookieParams, cb){
		chrome.cookies.set(cookieParams, cb);
		that.init();
	
	}

	that.updateCookie = function(oldCookie, newCookie){
		log(oldCookie);
		log(newCookie);
		for(var key in oldCookie){
			if(newCookie[key] === undefined){
				newCookie[key] = oldCookie[key];
			}
		}
		delete newCookie.session;
		delete newCookie.hostOnly;
		delete newCookie.selected;
		delete newCookie.number;
		delete newCookie.$$hashKey;

		newCookie = validURL(newCookie);

		backgroundPageConnection.postMessage({
			type : "update",
			tabId : tabId,
			newCookie: newCookie
		});		
		
	//toDO src, source, destination or dest use in names;
	}

	that.deleteCookie = function(cookie){
		
		var forDelete = cookie;
		
		backgroundPageConnection.postMessage({
			type : "delete",
			tabId : tabId,
			cookie: forDelete
		});
		
	}

	/*var Filter = function(dataForFilter, cookie){
	
		
		if((Object.keys(dataForFilter).length == 3)&&(dataForFilter.domain != "")){
			if((cookie.name === dataForFilter.name)&&((cookie.domain + cookie.path) === (dataForFilter.domain + dataForFilter.path))){
			
				return true;
			}
		}
		if(Object.keys(dataForFilter).length == 2){
			if((dataForFilter.domain != undefined)&&((cookie.domain + cookie.path) === (dataForFilter.domain + dataForFilter.path))){
				//console.log('123123123');
				return true;
			}
			if((dataForFilter.name != undefined)&&(cookie.name === dataForFilter.name)){
				return true;
			}
		}
		return false;
	}
	*/
	var validURL = function(cookie){
		var newCookie = cookie;
	
		newCookie.url = newCookie.domain;
		if(!newCookie.secure){
			newCookie.url = 'http://' + newCookie.url + newCookie.path;
		}else{
			newCookie.url = 'https://' + newCookie.url + newCookie.path;
		};
		return newCookie.url;
		//toDo check the way to create url from domain and path. and check cookie documentation
	}
	return that;
});
