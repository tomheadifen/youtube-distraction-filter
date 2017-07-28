document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.getSelected(null,function(tab) {
		// Only apply filters when we are watching a video
		// if (tab.url.includes('www.youtube.com/watch?v=')) {
		if (tab.url.includes('www.youtube.com')) {
	    	hideFeatures();
		}
	});
})

function hideFeatures() {
	excuteInDom(hideComments);
	excuteInDom(hideSideBar);
}

function hideComments() {
	document.getElementById('watch-discussion').style.display = 'none';
	return(document.getElementById('watch-discussion'));
}

function hideSideBar() {
	document.getElementById('watch7-sidebar-contents').style.display = 'none';
}

function excuteInDom(target) {
	chrome.tabs.executeScript({
		code: '(' + target + ')();'
	}, (result) => {
		console.log(result)
	});
}