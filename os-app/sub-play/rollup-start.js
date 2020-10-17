t
import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const KOMPlay = new RollupStart({
	target: document.getElementById('Target'),
	props: Object.assign({
		KOMPlaySpacings: [],
		KOMPlayDispatchDone: (function () {
			window.TestKOMPlayDispatchDone.innerHTML = parseInt(window.TestKOMPlayDispatchDone.innerHTML) + 1;
		}),
		KOMPlayDispatchUpdate: (function (inputData) {
			window.TestKOMPlayDispatchUpdate.innerHTML = parseInt(window.TestKOMPlayDispatchUpdate.innerHTML) + 1;
			window.TestKOMPlayDispatchUpdateData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
		KOMPlayDispatchFetch: (function () {}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMPlayDeck', 'KOMPlaySpacings', 'KOMPlaySimplifiedResponseButtons'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['KOMPlaySpacings'].includes(e[0])) {
			e[1] = e[1].map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e.$KOMSpacingCard),
				});
			});
		}

		return e;
	}))),
});

export default KOMPlay;
