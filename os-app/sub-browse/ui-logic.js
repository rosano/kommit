import OLSKString from 'OLSKString';

const mod = {

	KOMBrowseSort(a, b) {
		if (a.KOMCardModificationDate && b.KOMCardModificationDate) {
			return b.KOMCardModificationDate - a.KOMCardModificationDate;
		}

		return b.KOMCardCreationDate - a.KOMCardCreationDate;
	},

	KOMBrowseFilterFunction(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		return function (e) {
			return [e.KOMCardFrontText, e.KOMCardRearText, e.KOMCardNotes].filter(function (e) {
				return !!e;
			}).concat(e.KOMCardTags || []).filter(function (e) {
				return OLSKString.OLSKStringMatch(inputData, e);
			}).length;
		};
	},

	KOMBrowseExactMatchFirst(param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return param2.slice().sort(function (a, b) {
			const isExact = function (e) {
				return [e.KOMCardFrontText, e.KOMCardRearText].filter(function (e) {
					if (!e) {
						return;
					}
					
					return OLSKString.OLSKStringMatch(e, param1);
				}).length;
			};

			return isExact(a) > isExact(b) ? -1 : 1;
		});
	},

};

export default mod;
