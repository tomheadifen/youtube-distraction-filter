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
		var self = this;
		// console.log(this.allFields.length);
		var existCondition = setInterval(function() {
			// Stop checking once all the fields are removed
			if (!self.allFields.length) {
				clearInterval(existCondition);
			};
			// Loop through the fields and remove them once they are found
			for (var i = self.allFields.length; i >= 0; i--) {
				self.removeByIndex(i);
			};
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

new FieldsRemover(['watch7-sidebar-contents', 'watch-discussion']);