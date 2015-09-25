
		var newCookie = cookie;
		if(newCookie.domain.match('www')===null){
			newCookie.domain= 'www' + newCookie.domain;
		};
		if(!newCookie.domain.secure){
			newCookie.domain = 'http://' + newCookie.domain + newCookie.path;
		}else{
			newCookie.domain = 'https://' + newCookie.domain + newCookie.path;
		};