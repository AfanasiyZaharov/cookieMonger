var cookieService, mockForChrome, mockForCB, res, initFunction;
beforeEach(module('myModule'));
beforeEach(function() {
	mockForCB = function(args){
		initFunction = jasmine.createSpy();
		initFunction(args);
		res = {
			postMessage: jasmine.createSpy(), 
			onMessage:{
				addListener: jasmine.createSpy()
			}
		};
		//console.log(this.res);
		//alert(this.res);
		return res;
	}
	//alert(mockForChrome);
	mockForChrome = {
		runtime: {
			connect: jasmine.createSpy()
		},
		devtools:{
			inspectedWindow:{
				tabId: 1
			}
		}

	}

	chrome = mockForChrome;
	chrome.runtime.connect = mockForCB;
	//alert(chrome);
	
    inject(function($injector) {
    
      cookieService = $injector.get('cookieService');
     
    });
   
    //spyOn(chrome.runtime, 'connect');
    //spyOn(chrome, 'devtools');
});
describe('when cookieService.init then', function(){

	beforeEach(function(){
		cookieService.init();
	});
	it('should connect to the background',function(){
	

		
		expect(initFunction).toHaveBeenCalledWith({
			name : "devtools-page"
		});
	});

	it('should get cookies for this website',function(){
		
	
		expect(res.postMessage).toHaveBeenCalledWith(jasmine.objectContaining({
			type : "getall"
		}));
		


	});
});
describe('when cookieService create then',function(){
	it('should send message with "update" type',function(){
		cookieService.init();
		cookieService.createCookie({name: 'testCookie', domain: 'www.example.com', value: '140'});
		expect(res.postMessage).toHaveBeenCalledWith(jasmine.objectContaining({
			type : "update"
		}));
	})
});

