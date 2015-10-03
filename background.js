
var onMessageListener = function(message, sender, sendResponse) {
    switch(message.type) {
        case "bglog":
            console.log(message.obj);
        break;
             
    }
  
    return true;
}
chrome.runtime.onMessage.addListener(onMessageListener);

chrome.runtime.onConnect.addListener(function(port) {
  console.log(port.name);
  if (port.name != "devtools-page") {
    return;
    console.log("false");
  }
 
  var devToolsListener = function(message, sender, sendResponse) {
    var action = message.type;
    if (action == "getall") {
      getAll(port, message);
    }
    if(action === "update"){
      update(port, message);
    }
    if(action === "delete"){
      deleteCookie(port, message);
    } 
  };
  // add the listener
  port.onMessage.addListener(devToolsListener);

  port.onDisconnect.addListener(function() {
    port.onMessage.removeListener(devToolsListener);
  });
});
function getAll(port, message) {
  chrome.tabs.get(message.tabId, function(tab) {
    var url = tab.url;
    //console.log("Looking for cookies on: " + url);
    chrome.cookies.getAll({
      url : url
    }, function(cks) {
      //console.log("I have " + cks.length + " cookies");
      port.postMessage({
        action : "getall",
        url : url,
        cks : cks
      });
    });
  });
}
function update(port, message){
  chrome.cookies.set(message.newCookie);
 chrome.tabs.get(message.tabId, function(tab) {
    var url = tab.url;
    //console.log("Looking for cookies on: " + url);
    chrome.cookies.getAll({
      url : url
    }, function(cks) {
      //console.log("I have " + cks.length + " cookies");
      port.postMessage({
        action : "update",
        url : url,
        cks : cks
      });
    });
  });

}
function deleteCookie(port, message){
  //var forDelete = {};
    //console.log(message.cookie);
    chrome.tabs.get(message.tabId, function(tab) {
    var url = tab.url;
    chrome.cookies.remove({url: url, name: message.cookie.name});
    //console.log("Looking for cookies on: " + url);
    chrome.cookies.getAll({
      url : url
    }, function(cks) {
      //console.log("I have " + cks.length + " cookies");
      port.postMessage({
        action : "update",
        url : url,
        cks : cks
      });
    });
  });
}
