console.log("onconsole");
function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("DTpanel.html");
  focusOrCreateTab(manager_url);
  //console.log(chrome.cookies);
});
var cookiesArr = [];
var getCookiesinCookiesArr = function(cookies){
  for(var i = 0; i<cookies.length; i++){
    cookiesArr.push(cookies[i]);
  }
}
var onMessageListener = function(message, sender, sendResponse) {
    switch(message.type) {
        case "bglog":
            console.log(message.obj);
        break;
        case "getCookies":
        chrome.cookies.getAll({}, getCookiesinCookiesArr);
        //console.log("call got");
        setTimeout(function(){
          chrome.runtime.sendMessage({type: "cookies", obj: cookiesArr});
          //console.log("require is ready");
          
          },500);

        break;
        case "cookies":
          //console.log("response got");
          //console.log(message.obj);
        break;
             
    }
    //window.Obj = message.obj;
    return true;
}
chrome.runtime.onMessage.addListener(onMessageListener);
chrome.runtime.onConnect.addListener(function(port){
  console.log(port.name);
  port.postMessage({});
})

