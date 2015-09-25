myModule.factory('cookieService', function() {
	var that = {};
	that.cache = [];
	var getCookiesinCache = function(cookies){
		for(var i = 0; i < cookies.length; i++){
			that.cache.push(cookies[i]);
		}
	}

	that.init = function(scopeArray, cb){
		that.cache = [];
		chrome.cookies.getAll({}, getCookiesinCache);
		//that.init();
		//scopeArray = that.cache;
		//cb();
		console.log('init working');
	}

	that.createCookie = function(cookieParams, cb){
		chrome.cookies.set(cookieParams, cb);
		that.init();
		console.log('w');
	}

	that.Update = function(oldCookie, newCookie, cb){
		for(var key in oldCookie){
			if(newCookie[key] === undefined){
				newCookie[key] = oldCookie[key];
			}
		}
		delete newCookie.session;
		delete newCookie.hostOnly;
		newCookie = validURL(newCookie);
		chrome.cookies.set(newCookie);
		//cb();
		that.init();


	}
	that.readCookie = function(filter, cb){
		var arrForRead = [];
		if(filter === undefined){
			arrForDelete = that.cache;
		}else{
			for(var i = 0; i < that.cache.length; i++){
				if(Filter(filter, that.cache[i])){
					arrForRead.push(that.cache[i]);
				}
			}
		}
			//cb();

		return arrForRead;
	}

	that.deleteCookie = function(filter, cb){
		var arrForDelete = [];
		//console.log(filter);

		if(filter === undefined){
			arrForDelete = that.cache;
		}else{
			for(var i = 0; i < that.cache.length; i++){
				if(Filter(filter, that.cache[i])){
					arrForDelete.push(that.cache[i]);
				}
			}
		}
		//debugger;
		//var abc = arrForDelete.length;
		for(var i = 0; i < arrForDelete.length; i++){
			var forDelete;
			var a = validURL(arrForDelete[i]);
			forDelete = {url: a.url, name: arrForDelete[i].name};
			
			//console.log(forDelete);
			chrome.cookies.remove(forDelete, function(){
				console.log('1 ' );
			});
		}
		//cb();
		arrForDelete = [];
		that.init();

	}

	var Filter = function(dataForFilter, cookie){
		//console.log(dataForFilter);
		
		if((Object.keys(dataForFilter).length == 3)&&(dataForFilter.domain != "")){
			if((cookie.name === dataForFilter.name)&&((cookie.domain + cookie.path) === (dataForFilter.domain + dataForFilter.path))){
				//console.log(cookie.domain);
				//console.log(dataForFilter.domain);
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
	var validURL = function(cookie){
		var newCookie = cookie;
		/*if(newCookie.domain.match(/^\./) === null){
			newCookie.domain = '.'+ newCookie.domain;
		}

		if(newCookie.domain.match('www')===null){
			newCookie.url = 'www' + newCookie.domain;
		}else{
			newCookie.url = newCookie.domain;
		};*/
		newCookie.url = newCookie.domain;
		if(!newCookie.secure){
			newCookie.url = 'http://' + newCookie.url + newCookie.path;
		}else{
			newCookie.url = 'https://' + newCookie.url + newCookie.path;
		};
		return newCookie;
	}
	return that;
});