(function() {
	if(preferences.showDevToolsPanel)
		chrome.devtools.panels.create('CookieMonger', 'cookie.png', 'panel.html');
})();