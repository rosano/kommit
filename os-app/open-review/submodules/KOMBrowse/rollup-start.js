import RollupStart from './main.svelte';

import KOM_Data from '../../../_shared/KOM_Data/main.js';
import KOMCardStorage from '../../../_shared/KOMCard/storage.js';
import KOMDeckModel from '../../../_shared/KOMDeck/model.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;

const KOMBrowse = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseStorageClient: new RemoteStorage({ modules: [ KOM_Data.KOM_DataModule([
			KOMCardStorage.KOMCardStorageBuild,
		]) ] }),
		KOMBrowseItems: [],
		KOMBrowseListDispatchClose: (function _KOMBrowseListDispatchClose (inputData) {
			window.TestKOMBrowseListDispatchClose.innerHTML = parseInt(window.TestKOMBrowseListDispatchClose.innerHTML) + 1;
		}),
		KOMBrowseListDispatchClick: (function _KOMBrowseListDispatchClick (inputData) {
			window.TestKOMBrowseListDispatchClick.innerHTML = parseInt(window.TestKOMBrowseListDispatchClick.innerHTML) + 1;
		}),
		KOMBrowseListDispatchArrow: (function _KOMBrowseListDispatchArrow (inputData) {
			window.TestKOMBrowseListDispatchArrow.innerHTML = parseInt(window.TestKOMBrowseListDispatchArrow.innerHTML) + 1;
		}),
		KOMBrowseListDispatchFilter: (function _KOMBrowseListDispatchFilter (inputData) {
			window.TestKOMBrowseListDispatchFilter.innerHTML = parseInt(window.TestKOMBrowseListDispatchFilter.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchBack: (function _KOMBrowseInfoDispatchBack (inputData) {
			window.TestKOMBrowseInfoDispatchBack.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchBack.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchUpdate: (function _KOMBrowseInfoDispatchUpdate () {
			window.TestKOMBrowseInfoDispatchUpdate.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchUpdate.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMBrowseDeckSelected', 'KOMBrowseItems', 'KOMBrowseItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['KOMBrowseDeckSelected'].includes(e[0])) {
			e[1] = KOMDeckModel.KOMDeckModelPostJSONParse(e[1]);
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
