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
	// Comments
	chrome.storage.sync.set({
		'comments': {
			'remove': true,
			'youtubeId': 'comments'
		}
	});

	// Related Videos
	chrome.storage.sync.set({
		'related': {
			'remove': true,
			'youtubeId': 'items'
		}
	});
});