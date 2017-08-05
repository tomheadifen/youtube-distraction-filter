class Popup {
	setCheckboxStates() {
		chrome.storage.sync.get(null, function(storage) {
			document.getElementById('comments').checked = storage.comments.remove;
			document.getElementById('related').checked = storage.related.remove;
		});
	}

	startListeners() {
		const self = this;
		// Checkboxes in popup. Chrome will not allow onClick() in DOM.
		document.addEventListener('DOMContentLoaded', function() {
			document.getElementById('comments').addEventListener('click', function() {
				// The element in the youtube dom
				self.storeElement('comments', 'watch-discussion');
			});
			document.getElementById('related').addEventListener('click', function() {
				self.storeElement('related', 'watch7-sidebar-contents');
			});
			document.getElementById('deleteAll').addEventListener('click', function() {
				chrome.storage.sync.clear();
			});
			document.getElementById('getStored').addEventListener('click', function() {
				chrome.storage.sync.get(null, function(storage) {
					console.log(storage);
				});
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
			[filterId]: {
				'remove': isChecked,
				'youtubeId': youtubeElementId
			}
		});
	}
}

const popup = new Popup();
popup.setCheckboxStates();
popup.startListeners();