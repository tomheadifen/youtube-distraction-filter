// Get fields we want to remove from storage and check if we should remove them.
class FieldManager {
	constructor() {
		this.allFields = [];
	}

	init() {
		this.setFields();
	}

	setFields() {
		const self = this;
		// Passing in null gets all the fields in storage
		chrome.storage.sync.get(null, function(fields) {
			for (let key in fields) {
				if(!fields.hasOwnProperty(key)) continue;
				self.allFields.push(new Field({
					'name': fields[key].youtubeId,
					'remove': fields[key].remove
				}));
			}
			self.removeElements();
		});
	}

	/**
	 * Check if we should remove the elements in HTML and then remove them
	 */
	removeElements() {
		const self = this;
		let existCondition,
		timer = 0,
		allRemoved,
		timerLimit = 100; // Stop searching for Ids after 10 sec

		existCondition = setInterval(function() {
			allRemoved = self.allFields.every(element => element.remove === false);
			// If we don't need to remove value
			if (allRemoved || timer == timerLimit) {
				clearInterval(existCondition);
			}

			self.allFields.forEach(function(field) {
				if (field.remove === true) {
					field.removeElement();
				}
			});
		}, 100);
	}
}


/*
 * Remove a list of fields from webpage
 * @param Array The array of fields you want to remove
 */
class Field {
	constructor({name, remove}) {
		this.name = name;
		this.remove = remove;
	}

	removeElement() {
		// remove the elemeent is it exists
		if (document.getElementById(this.name)) {
			document.getElementById(this.name).style.display = 'none';
			this.remove = false;
		}
	}
}


class Loader {
	init() {
		this.fieldManager = new FieldManager;
		
		// This will run on page load / first navigation
		this.afterNavigate();

		this.startListeners();
	}


	// Check that we are on a page with a video
	afterNavigate() {
		if (window.location.pathname === '/watch') {
			this.fieldManager.init();
		}
	}

	/**
	 * The listeners for the youtube dom
	 * @return {[void]}
	 */
	startListeners() {
		var self = this;
		(document.body || document.documentElement).addEventListener('transitionend',
		  function(event) {
			// check the loading bar youtube uses when changing page
			if (event.propertyName === 'width' && event.target.id === 'progress') {
				self.afterNavigate();
			}
		}, true);
	}
}

new Loader().init();