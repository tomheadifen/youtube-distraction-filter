/*
 * Remove a list of fields from webpage
 * @param Array The array of fields you want to remove
 */
class FieldsRemover {
	constructor(allFields) {
		this.allFields = allFields;
		this.removeFields();
	}

	removeFields() {
		let self = this;
		let timer = 0;
		let timerLimit = 100; // Stop searching for Ids after 10 sec
		// console.log(this.allFields.length);
		let existCondition = setInterval(function() {
			// Stop checking once all the fields are removed
			if (!self.allFields.length || timer == timerLimit) {
				clearInterval(existCondition);
			};
			// Loop through the fields and remove them once they are found
			for (let i = self.allFields.length; i >= 0; i--) {
				self.removeByIndex(i);
			};
			timer++
		}, 100); // check every 100ms to see if the field is there
	}

	removeByIndex(index) {
		let id = this.allFields[index]
		if (document.getElementById(id)) {
		 	document.getElementById(id).style.display = 'none';
			this.allFields.splice(index, 1);
		}
	}
}

// When loaded fetch the elements we want to remove
chrome.runtime.sendMessage({message: "getElementIds"}, function(response) {
	new FieldsRemover(response);
});