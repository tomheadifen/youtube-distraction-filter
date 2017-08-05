/**
 * Change the rules when the program is first installed to only run when watching on youtube and to create the objects to filter
**/

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
	// Replace all rules ...
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		// With a new rule ...
		chrome.declarativeContent.onPageChanged.addRules([
			{
				// That fires when a page's URL contains a 'youtube' ...
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: 'https://www.youtube.com/' }
					})
				],
				// And shows the extension's page action.
				actions: [ new chrome.declarativeContent.ShowPageAction() ]
			}
		]);
	});
	// Store default objects
	chrome.storage.sync.set({
		'comments': {
			'remove': true,
			'youtubeId': 'watch-discussion'
		}
	});

	chrome.storage.sync.set({
		'related': {
			'remove': true,
			'youtubeId': 'watch7-sidebar-contents'
		}
	});
});