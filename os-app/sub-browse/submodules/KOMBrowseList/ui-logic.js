const mod = {

	KOMBrowseListItemAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		return [
			inputData.KOMCardQuestion || OLSKLocalized('KOMBrowseListItemUntitledText')].join('\n');
	},

	KOMBrowseListItemTitle (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.KOMCardQuestion || inputData.KOMCardID;
	},

};

Object.assign(exports, mod);
