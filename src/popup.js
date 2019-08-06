/**
 * File is required by the chrome extension framework
**/
class Popup {
	constructor() {
		this.setCheckboxStates();
		this.startListeners();
	}

	/**
	 * Check chrome storage to set the check boxes states
	 * @return {[void]}
	 */
	setCheckboxStates() {
		chrome.storage.sync.get(null, function(storage) {
			document.getElementById('comments').checked = storage.comments.remove;
			document.getElementById('related').checked = storage.related.remove;
		});
	}

	/**
	* Check the checkboxes that the users have selected.
	* Store them in the chrome storage
	* @return {[void]}
	**/
	startListeners() {
		const self = this;
		// Checkboxes in popup. Chrome will not allow onClick() in DOM.
		document.addEventListener('DOMContentLoaded', function() {
			document.getElementById('comments').addEventListener('click', function() {
				// The element in the extension
				self.storeElement('comments', 'comments');
			});

			document.getElementById('related').addEventListener('click', function() {
				self.storeElement('related', 'items');
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