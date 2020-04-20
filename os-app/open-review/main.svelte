<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
import KOMDeckAction from '../_shared/KOMDeck/action.js';
import KOM_Data from '../_shared/KOM_Data/main.js';
import KOMDeckStorage from '../_shared/KOMDeck/storage.js';
import KOMCardStorage from '../_shared/KOMCard/storage.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;

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
	
	_ValueCardFormItem: undefined,
	
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

	KOMReviewDetailDispatchRename (inputData) {
		mod._ValueDeckSelected.KOMDeckName = inputData;
		
		mod.ControlDeckSave(mod._ValueDeckSelected);
	},

	KOMReviewDetailDispatchDiscard (inputData) {
		mod.ControlDeckSelect(null);
		
		mod.ControlDeckDiscard(inputData);
	},

	KOMReviewDetailDispatchCreateCard () {
		mod._ValueCardFormItem = {};
	},

	KOMReviewCardFormDispatchCancel () {
		mod._ValueCardFormItem = undefined;
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageWidgetHidden = !mod._ValueStorageWidgetHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: [
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateDeck',
					async LCHRecipeCallback () {
						return mod.OLSKChangeDelegateCreateDeck(await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, {
							KOMDeckName: 'FakeOLSKChangeDelegateCreateDeck',
						}));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateDeck',
					async LCHRecipeCallback () {
						return mod.OLSKChangeDelegateUpdateDeck(Object.assign(mod._ValueDecksAll.filter(function (e) {
							return e.KOMDeckName === 'FakeOLSKChangeDelegateCreateDeck';
						}).pop(), {
							KOMDeckName: 'FakeOLSKChangeDelegateUpdateDeck',
						}));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteDeck',
					async LCHRecipeCallback () {
						return mod.OLSKChangeDelegateDeleteDeck(mod._ValueDecksAll.filter(function (e) {
							return e.KOMDeckName === 'FakeOLSKChangeDelegateCreateDeck';
						}).pop());
					},
				},
			],
		});
	},

	OLSKChangeDelegateCreateDeck (inputData) {
		mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
			return e.KOMDeckID !== inputData.KOMDeckID; // @Hotfix Dropbox sending DelegateAdd
		}).concat(inputData));
	},

	OLSKChangeDelegateUpdateDeck (inputData) {
		if (mod._ValueDeckSelected && (mod._ValueDeckSelected.KOMDeckID === inputData.KOMDeckID)) {
			mod.ControlDeckSelect(Object.assign(mod._ValueDeckSelected, inputData));
		}

		mod.ValueDecksAll(mod._ValueDecksAll.map(function (e) {
			return Object.assign(e, e.KOMDeckID === inputData.KOMDeckID ? inputData : {});
		}));
	},

	OLSKChangeDelegateDeleteDeck (inputData) {
		if (mod._ValueDeckSelected && (mod._ValueDeckSelected.KOMDeckID === inputData.KOMDeckID)) {
			mod.ControlDeckSelect(null);
		}

		mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
			return e.KOMDeckID !== inputData.KOMDeckID;
		}));
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

		await mod.SetupValueDecksAll();

		mod._ValueIsLoading = false;
	},

	SetupStorageClient() {
		const storageModule = KOM_Data.KOM_DataModule([
			Object.assign(KOMDeckStorage.KOMDeckStorageBuild, {
				KOM_DataChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateDeck,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateDeck,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteDeck,
				},
			}),
			KOMCardStorage.KOMCardStorageBuild,
			]);
		
		mod._ValueStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.caching.enable(`/${ storageModule.name }/`);
	},

	SetupStorageWidget () {
		(new window.OLSKStorageWidget(mod._ValueStorageClient)).attach('KOMReviewStorageWidget').backend(document.querySelector('.OLSKAppToolbarStorageButton'));
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueStorageClient, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueStorageClient.on('not-connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('not-connected', arguments);
			}
		});

		mod._ValueStorageClient.on('disconnected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('disconnected', arguments);
			}
		});

		mod._ValueStorageClient.on('connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('connected', arguments);
			}
		});

		mod._ValueStorageClient.on('sync-done', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueStorageClient.on('network-offline', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueStorageClient.on('network-online', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueStorageClient.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			mod._ValueStorageClient.on('ready', () => {
				if (!OLSK_TESTING_BEHAVIOUR()) {
					console.debug('ready', arguments);
				}

				res();
			});
		})
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
import KOMReviewCardForm from './submodules/KOMReviewCardForm/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
</script>

<div class="KOMReview OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<OLSKViewportContent>
	{#if !mod._ValueDeckSelected }
		<KOMReviewMaster KOMReviewMasterListItems={ mod._ValueDecksAll } KOMReviewMasterDispatchCreate={ mod.KOMReviewMasterDispatchCreate } KOMReviewMasterDispatchSelect={ mod.KOMReviewMasterDispatchSelect } />
	{/if}

	{#if mod._ValueDeckSelected && !mod._ValueCardFormItem }
		<KOMReviewDetail KOMReviewDetailItem={ mod._ValueDeckSelected } KOMReviewDetailDispatchBack={ mod.KOMReviewDetailDispatchBack } KOMReviewDetailDispatchRename={ mod.KOMReviewDetailDispatchRename } KOMReviewDetailDispatchDiscard={ mod.KOMReviewDetailDispatchDiscard } KOMReviewDetailDispatchCreateCard={ mod.KOMReviewDetailDispatchCreateCard } />
	{/if}

	{#if mod._ValueDeckSelected && mod._ValueCardFormItem }
		<KOMReviewCardForm KOMReviewCardFormItem={ mod._ValueCardFormItem } KOMReviewCardFormDispatchCancel={ mod.KOMReviewCardFormDispatchCancel } KOMReviewCardFormDispatchSave={ mod.KOMReviewCardFormDispatchSave } />
	{/if}
</OLSKViewportContent>

<footer class="KOMReviewViewportFooter OLSKMobileViewFooter">
	<div id="KOMReviewStorageWidget" class:KOMReviewStorageWidgetHidden={ mod._ValueStorageWidgetHidden }></div>

	<OLSKAppToolbar
		OLSKAppToolbarDonateURL={ window.OLSKPublicConstants('KOM_SHARED_DONATE_URL') }
		OLSKAppToolbarLauncherVisible={ true }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
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
