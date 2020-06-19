const mod = {

	KOMBrowseListItemAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		return [
			inputData.KOMCardFrontText || OLSKLocalized('KOMBrowseListItemUntitledText')].join('\n');
	},

};

Object.assign(exports, mod);
