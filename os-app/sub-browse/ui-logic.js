import OLSKString from 'OLSKString';

const mod = {

	KOMBrowseAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.KOMCardFrontText || inputData.KOMCardRearText || OLSKLocalized('KOMBrowseListItemUntitledText'));
	},

	KOMBrowseSortFunction (a, b) {
		if (a.KOMCardModificationDate && b.KOMCardModificationDate) {
			return b.KOMCardModificationDate - a.KOMCardModificationDate;
		}

		return b.KOMCardCreationDate - a.KOMCardCreationDate;
	},

	KOMBrowseMatchIsResult (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return [param1.KOMCardFrontText, param1.KOMCardRearText, param1.KOMCardNotes].concat(param1.KOMCardTags).filter(function (e) {
			if (!e) {
				return false;
			}

			return OLSKString.OLSKStringMatch(param2, e);
		}).length;
	},

	KOMBrowseMatchIsExact (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return [param1.KOMCardFrontText, param1.KOMCardRearText].filter(function (e) {
			if (!e) {
				return false;
			}

			return OLSKString.OLSKStringMatch(param2, e, 'startsWith');
		}).length;
	},

};

export default mod;
