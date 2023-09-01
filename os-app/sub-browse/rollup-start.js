import RollupStart from './main.svelte';

import KOMCard from '../_shared/KOMCard/main.js';
import RemoteStorage from 'remotestoragejs';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import zerodatawrap from 'zerodatawrap';

(async function() {
	const KOMBrowse = new RollupStart({
		target: document.body,
		props: Object.assign({
			KOMBrowseStorageClient: await zerodatawrap.ZDRWrap({
				ZDRParamLibrary: RemoteStorage,
				ZDRParamScopes: [{
					ZDRScopeKey: 'App',
					ZDRScopeDirectory: 'kommit',
					ZDRScopeSchemas: [
						KOMCard,
						],
				}],
			}),
			KOMBrowseDispatchCreate: (function (inputData) {
				window.TestKOMBrowseDispatchCreate.innerHTML = parseInt(window.TestKOMBrowseDispatchCreate.innerHTML) + 1;
				window.TestKOMBrowseDispatchCreateData.innerHTML = JSON.stringify(Object.keys(inputData));
			}),
			KOMBrowseDispatchDiscard: (function (inputData) {
				window.TestKOMBrowseDispatchDiscard.innerHTML = parseInt(window.TestKOMBrowseDispatchDiscard.innerHTML) + 1;
				window.TestKOMBrowseDispatchDiscardData.innerHTML = JSON.stringify(Object.keys(inputData));
			}),
			KOMBrowseDispatchClose: (function () {
				window.TestKOMBrowseDispatchClose.innerHTML = parseInt(window.TestKOMBrowseDispatchClose.innerHTML) + 1;
			}),
			KOMBrowseInfoDispatchRead: (function () {}),
			KOMBrowseInfoSpeechAvailable: false,
			KOMBrowseDeckCards: [],
			KOMBrowse_DEBUG: true,
		}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
			if (['KOMBrowseDeckSelected', 'KOMBrowseItemSelected'].includes(e[0])) {
				e[1] = JSON.parse(e[1]);
			}

			if (['KOMBrowseDeckSelected'].includes(e[0])) {
				e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
			}

			if (['KOMBrowseItemSelected'].includes(e[0]) && coll.length > 1) {
				e[1] = coll[index - 1][1].filter(function (item) {
					return item.KOMCardID === e[1].KOMCardID;
				}).pop();
			}

			return e;
		}))),
	});
})();
