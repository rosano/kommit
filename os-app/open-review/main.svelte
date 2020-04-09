<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
import * as KOMDeckAction from '../_shared/KOMDeck/action.js';
import * as KOMStorageClient from '../_shared/KOMStorageClient/main.js';
import { KOMStorageModule } from '../_shared/KOMStorageModule/main.js';
import { KOMDeckStorage } from '../_shared/KOMDeck/storage.js';
const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueDecksAll: [],
	ValueDecksAll (inputData) {
		mod._ValueDecksAll = inputData;
	},
	
	_ValueDeckSelected: undefined,
	ValueDeckSelected (inputData) {
		mod._ValueDeckSelected = inputData
	},
	
	_ValueStorageWidgetHidden: true,

	_ValueFooterStorageStatus: '',

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// MESSAGE

	KOMReviewMasterDispatchCreate (inputData) {
		mod.ControlDeckCreate(inputData);
	},

	KOMReviewMasterDispatchSelect (inputData) {
		mod.ControlDeckSelect(inputData);
	},

	KOMReviewDetailDispatchBack () {
		mod.ControlDeckSelect(null);
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageWidgetHidden = !mod._ValueStorageWidgetHidden;
	},

	// CONTROL

	async ControlDeckSave(inputData) {
		await KOMDeckAction.KOMDeckActionUpdate(mod._ValueStorageClient, inputData);
	},

	async ControlDeckCreate(inputData) {
		const item = await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, {
			KOMDeckName: inputData,
			KOMDeckModificationDate: new Date(),
		});

		mod.ValueDecksAll(mod._ValueDecksAll.concat(item));
	},
	
	ControlDeckSelect(inputData) {
		mod.ValueDeckSelected(inputData);
	},
	
	async ControlDeckDiscard (inputData) {
		mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
			return e !== inputData;
		}))

		await KOMDeckAction.KOMDeckActionDelete(mod._ValueStorageClient, inputData.KOMDeckID);
	},

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageWidget();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupDataCache();

		await mod.SetupValueDecksAll();

		mod._ValueIsLoading = false;
	},

	SetupStorageClient() {
		mod._ValueStorageClient = KOMStorageClient.KOMStorageClient({
			modules: [
				KOMStorageModule([
					KOMDeckStorage,
					].map(function (e) {
						return {
							KOMCollectionStorageGenerator: e,
							KOMCollectionChangeDelegate: e === KOMDeckStorage ? {
								OLSKChangeDelegateCreate (inputData) {
									// console.log('OLSKChangeDelegateCreate', inputData);

									mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
										return e.KOMDeckID !== inputData.KOMDeckID; // @Hotfix Dropbox sending DelegateAdd
									}).concat(inputData));
								},
								OLSKChangeDelegateUpdate (inputData) {
									// console.log('OLSKChangeDelegateUpdate', inputData);

									if (mod._ValueDeckSelected && (mod._ValueDeckSelected.KOMDeckID === inputData.KOMDeckID)) {
										mod.ControlDeckSelect(Object.assign(mod._ValueDeckSelected, inputData));
									}

									mod.ValueDecksAll(mod._ValueDecksAll.map(function (e) {
										return Object.assign(e, e.KOMDeckID === inputData.KOMDeckID ? inputData : {});
									}), false);
								},
								OLSKChangeDelegateDelete (inputData) {
									// console.log('OLSKChangeDelegateDelete', inputData);

									if (mod._ValueDeckSelected && (mod._ValueDeckSelected.KOMDeckID === inputData.KOMDeckID)) {
										mod.ControlDeckSelect(null);
									}

									mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
										return e.KOMDeckID !== inputData.KOMDeckID;
									}), false);
								},
							} : null,
						}
					})),
			],
		});
	},

	SetupStorageWidget () {
		(new window.OLSKStorageWidget(mod._ValueStorageClient.remoteStorage)).attach('KOMReviewStorageWidget').backend(document.querySelector('.OLSKAppToolbarStorageButton'));
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueStorageClient.remoteStorage, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueStorageClient.remoteStorage.on('not-connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('not-connected', arguments);
			}
		});

		mod._ValueStorageClient.remoteStorage.on('disconnected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('disconnected', arguments);
			}
		});

		mod._ValueStorageClient.remoteStorage.on('connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('connected', arguments);
			}
		});

		mod._ValueStorageClient.remoteStorage.on('sync-done', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueStorageClient.remoteStorage.on('network-offline', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueStorageClient.remoteStorage.on('network-online', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueStorageClient.remoteStorage.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			mod._ValueStorageClient.remoteStorage.on('ready', () => {
				if (!OLSK_TESTING_BEHAVIOUR()) {
					console.debug('ready', arguments);
				}

				res();
			});
		})
	},

	async SetupDataCache() {
		await mod._ValueStorageClient.remoteStorage.kommit.kom_decks.KOMStorageCache();
	},

	async SetupValueDecksAll() {
		mod.ValueDecksAll((await KOMDeckAction.KOMDeckActionList(mod._ValueStorageClient)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}));
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKViewportContent from 'OLSKViewportContent';
import KOMReviewMaster from './submodules/KOMReviewMaster/main.svelte';
import KOMReviewDetail from './submodules/KOMReviewDetail/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
</script>

<div class="KOMReview OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<OLSKViewportContent>
	{#if !mod._ValueDeckSelected }
		<KOMReviewMaster KOMReviewMasterListItems={ mod._ValueDecksAll } KOMReviewMasterDispatchCreate={ mod.KOMReviewMasterDispatchCreate } KOMReviewMasterDispatchSelect={ mod.KOMReviewMasterDispatchSelect } />
	{/if}

	{#if mod._ValueDeckSelected }
		<KOMReviewDetail KOMReviewDetailItem={ mod._ValueDeckSelected } KOMReviewDetailDispatchBack={ mod.KOMReviewDetailDispatchBack } KOMReviewDetailDispatchDiscard={ mod.KOMReviewDetailDispatchDiscard } KOMReviewDetailDispatchUpdate={ mod.KOMReviewDetailDispatchUpdate } />
	{/if}
</OLSKViewportContent>

<footer class="KOMReviewViewportFooter OLSKMobileViewFooter">
	<div id="KOMReviewStorageWidget" class:KOMReviewStorageWidgetHidden={ mod._ValueStorageWidgetHidden }></div>

	<OLSKAppToolbar
		OLSKAppToolbarDonateURL={ window.OLSKPublicConstants('KOM_SHARED_DONATE_URL') }
		OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		_OLSKAppToolbarDispatchExport={ mod._OLSKAppToolbarDispatchExport }
		_OLSKAppToolbarDispatchImport={ mod._OLSKAppToolbarDispatchImport }
		/>
</footer>

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('KOMServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
