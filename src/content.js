function myMain() {
	var existCondition = setInterval(function() {
	 if (document.getElementById('watch7-sidebar-contents')) {
	 	console.log('found!');
	 	document.getElementById('watch7-sidebar-contents').style.display = 'none';
	    clearInterval(existCondition);
	 }
	}, 100); // check every 100ms
}

myMain();