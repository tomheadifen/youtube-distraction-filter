chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message == "getElementIds") {
			sendResponse(['watch7-sidebar-contents', 'watch-discussion']);
		}
	}
);