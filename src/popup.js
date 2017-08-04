class Popup {
	startListeners() {
		const self = this;
		// Checkboxes in popup. Chrome will not allow onClick() in DOM.
		document.addEventListener('DOMContentLoaded', function() {
			document.getElementById('comments').addEventListener('click', function() {
				// The element in the youtube dom
				self.storeElement('comments', 'watch7-sidebar-contents');
			});
			document.getElementById('related').addEventListener('click', function() {
				self.storeElement('related', 'watch-discussion');
			});
			document.getElementById('deleteAll').addEventListener('click', function() {
				chrome.storage.sync.clear();
			});
		});
	}

	/**
	 * Check the element we have and store it
	 * @param  {[string]} filterId       [The element Id in the popup]
	 * @param  {[string]} youtubeElementId [The element Id in youtube]
	 * @return {[void]}
	 */
	storeElement(filterId, youtubeElementId) {
		// The filter that is selected in the pop up menu
		let isChecked = document.getElementById(filterId).checked;

		chrome.storage.sync.set({
			[youtubeElementId]: isChecked
		});
	}
}

new Popup().startListeners();