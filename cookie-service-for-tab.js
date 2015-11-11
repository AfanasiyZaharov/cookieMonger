//TODO remove all shit  
//TODO change that to exports
myModule.factory('cookieService', function() {
	//extension can't get Cookies from Chrome into Devtools-page,
	//so we need to get it from the backround-page
	var backgroundPageConnection;
	var tabId;

	//update all Cookies for each request
	
	var that = {};
	that.cache = [];

	//this function request a Cookies from the background-page 
	that.init = function(){
		that.cache = [];
		backgroundPageConnection = chrome.runtime.connect({
			name : "devtools-page"
		});

		tabId = chrome.devtools.inspectedWindow.tabId;

		backgroundPageConnection.onMessage.addListener(function(message){
			that.cache = message.cookies;
		});
		
		
		backgroundPageConnection.postMessage({
			type : "getall",
			tabId : tabId
		});
		
	
	}
	

	that.createCookie = function(dest){
		/*delete dest.session;
		delete dest.hostOnly;
		delete dest.selected;
		delete dest.number;
		delete dest.$$hashKey;
		*/
		//dest.url = setURL(dest);

		backgroundPageConnection.postMessage({
			type : "update",
			tabId : tabId,
			dest: dest
		});	

	
	}

	//This function get options from source Cookie, 
	//include this options in destination Cookie and set it 
	that.updateCookie = function(src, dest){
		log(src);
		log(dest);
		for(var key in src){
			if(dest[key] === undefined){
				dest[key] = src[key];
			}
		}
		delete dest.session;
		delete dest.hostOnly;
		delete dest.selected;
		delete dest.number;
		delete dest.$$hashKey;

		dest.url = setURL(dest);

		backgroundPageConnection.postMessage({
			type : "update",
			tabId : tabId,
			dest: dest
		});		
		

	}
	//just request background-page, such delete cookie
	that.deleteCookie = function(cookie){
		
		var forDelete = cookie;
		
		backgroundPageConnection.postMessage({
			type : "delete",
			tabId : tabId,
			cookie: forDelete
		});
		
	}

	
	//this function set URL to cookies, using that options
	var setURL = function(cookie){
		var dest = cookie;
	
		dest.url = dest.domain;
		if(!dest.secure){
			dest.url = 'http://' + dest.url + dest.path;
		}else{
			dest.url = 'https://' + dest.url + dest.path;
		};
		return dest.url;
		//toDo check the way to create url from domain and path. and check cookie documentation
	}

	return that;
});
