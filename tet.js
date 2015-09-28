console._log = console.log;
console.log = function(){ 
    // you can do whatever you want with arguments, output to div, alert / etc.
    return console._log.apply(console,arguments); 
};
console.log('test');
chrome.devtools.inspectedWindow.eval('console.log(angular)');