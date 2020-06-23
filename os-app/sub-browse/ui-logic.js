const mod = {

	KOMBrowseSort (a, b) {
		if (a.KOMCardModificationDate && b.KOMCardModificationDate) {
			return b.KOMCardModificationDate - a.KOMCardModificationDate;
		}

		return b.KOMCardCreationDate - a.KOMCardCreationDate;
	},

	KOMBrowseFilterFunction (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return function (e) {
			return [e.KOMCardFrontText, e.KOMCardRearText].filter(function (e) {
				if (!e) {
					return false;
				}

				return e.toLowerCase().match(inputData.toLowerCase());
			}).length;
		};
	},

	KOMBrowseMatchFunction (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return function (array) {
			if (!Array.isArray(array)) {
				throw new Error('KOMErrorInputNotValid');
			}

			const matches = array.filter(mod.KOMBrowseFilterFunction(inputData));

			return matches.filter(function (e) {
				return [e.KOMCardFrontText, e.KOMCardRearText].filter(function (e) {
					return e.toLowerCase() === inputData.toLowerCase();
				}).length
			}).map(function (e) {
				return matches.splice(matches.indexOf(e), 1).pop();
			}).concat(matches);
		};
	},

};

Object.assign(exports, mod);
