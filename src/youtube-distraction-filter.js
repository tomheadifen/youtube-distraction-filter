// Get fields we want to remove from storage and check if we should remove them.
class FieldManager {
	constructor() {
		this.allFields = [];
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
		timerLimit = 100; // Stop searching for Ids after 10/100 attempts sec

		existCondition = setInterval(function() {
			// Did we remove the elements
			allRemoved = self.allFields.every(element => element.remove === false);

			// If we don't need to remove value
			if (allRemoved || timer == timerLimit) {
				// Bail out of interval
				clearInterval(existCondition);
			}

			self.allFields.forEach(function(field) {
				if (field.remove === true) {
					field.removeElement();
				}
			});

		// Interval every 100ms
		}, 100);
	}
}


/*
 * Remove a list of fields from webpage
 * @param Array The array of fields you want to remove
 * @return Void
 */
class Field {
	constructor({name, remove}) {
		this.name = name;
		this.remove = remove;
	}

	removeElement() {
		// remove the element if it exists
		if (document.getElementById(this.name)) {
			console.log(document.getElementById(this.name));
			document.getElementById(this.name).style.display = 'none';
			this.remove = false;
		}
	}
}

/*
 * Manages when we should remove fields
 */
class Loader {
	constructor() {
		// This will run on page load / first navigation
		this.afterNavigate();

		this.startListeners();
	}


	// Check that we are on a page with a video
	afterNavigate() {
		if (window.location.pathname === '/watch') {
			this.fieldManager = new FieldManager();
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

// AWAY WE GO
new Loader();