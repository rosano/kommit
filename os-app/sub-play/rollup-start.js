import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const KOMPlay = new RollupStart({
	target: document.getElementById('Target'),
	props: Object.assign({
		KOMPlaySpacings: [],
		KOMPlayDispatchDone: (function _KOMPlayDispatchDone() {
			window.TestKOMPlayDispatchDone.innerHTML = parseInt(window.TestKOMPlayDispatchDone.innerHTML) + 1;
		}),
		KOMPlayDispatchUpdate: (function _KOMPlayDispatchUpdate(inputData) {
			window.TestKOMPlayDispatchUpdate.innerHTML = parseInt(window.TestKOMPlayDispatchUpdate.innerHTML) + 1;
			window.TestKOMPlayDispatchUpdateData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
		KOMPlayDispatchFetch: (function _KOMPlayDispatchFetch() {}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMPlaySpacings'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e.$KOMSpacingCard),
				});
			});
		}

		if (['KOMPlayDeck'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMPlay;
