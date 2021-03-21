import OLSKString from 'OLSKString';

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	KOMBrowseAccessibilitySummary (inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.KOMCardFrontText || inputData.KOMCardRearText || OLSKLocalized('KOMBrowseListItemUntitledText'));
	},

	KOMBrowseSortFunction (a, b) {
		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['KOMCardModificationDate', 'KOMCardCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
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
