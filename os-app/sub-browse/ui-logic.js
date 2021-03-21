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

	KOMBrowseIsMatch (param1, param2) {
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

	KOMBrowseExactSortFunction (needle, a, b) {
		if (typeof needle !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return ['KOMCardFrontText', 'KOMCardRearText'].reduce(function (coll, item) {
			return coll.concat(uDescending(OLSKString.OLSKStringMatch(needle, a[item] || '', 'startsWith'), OLSKString.OLSKStringMatch(needle, b[item] || '', 'startsWith')));
		}, []).filter(function (e) {
			return e !== 0;
		}).shift();
	},

};

export default mod;
