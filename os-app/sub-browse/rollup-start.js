import RollupStart from './main.svelte';

import KOM_Data from '../_shared/KOM_Data/main.js';
import KOMCardStorage from '../_shared/KOMCard/storage.js';
import RemoteStorage from 'remotestoragejs';
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	_ValueStorageClient: undefined,

	// SETUP

	SetupEverything() {
		mod.SetupStorageClient();
	},

	SetupStorageClient() {
		const storageModule = KOM_Data.KOM_DataModule([
			KOMCardStorage.KOMCardStorageBuild,
		]);
		
		mod._ValueStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.FakeStorageClient = true;
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();

const KOMBrowse = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseStorageClient: mod._ValueStorageClient,
		KOMBrowseDispatchCreate: (function (inputData) {
			window.TestKOMBrowseDispatchCreate.innerHTML = parseInt(window.TestKOMBrowseDispatchCreate.innerHTML) + 1;
			window.TestKOMBrowseDispatchCreateData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
		KOMBrowseDispatchDiscard: (function (inputData) {
			window.TestKOMBrowseDispatchDiscard.innerHTML = parseInt(window.TestKOMBrowseDispatchDiscard.innerHTML) + 1;
			window.TestKOMBrowseDispatchDiscardData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
		KOMBrowseListDispatchClose: (function () {
			window.TestKOMBrowseListDispatchClose.innerHTML = parseInt(window.TestKOMBrowseListDispatchClose.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchRead: (function () {}),
		KOMBrowseInfoSpeechAvailable: false,
		KOMBrowseDeckCards: [],
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

export default KOMBrowse;
