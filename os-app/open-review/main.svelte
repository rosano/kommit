<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
import KOM_Data from '../_shared/KOM_Data/main.js';
import KOMDeckStorage from '../_shared/KOMDeck/storage.js';
import KOMCardStorage from '../_shared/KOMCard/storage.js';
import KOMSpacingStorage from '../_shared/KOMSpacing/storage.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;
import KOMDeckAction from '../_shared/KOMDeck/action.js';
import KOMCardAction from '../_shared/KOMCard/action.js';
import KOMSpacingMetal from '../_shared/KOMSpacing/metal.js';
import KOMReviewLogic from './ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';

const mod = {

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

	KOMReviewDetailDispatchDiscard (inputData) {
		mod.ControlDeckSelect(null);
		
		mod.ControlDeckDiscard(inputData);
	},

	KOMReviewDetailDispatchUpdate (inputData) {
		mod.ControlDeckSave(mod._ValueDeckSelected);
	},

	KOMReviewDetailDispatchBrowse () {
		mod._ValueBrowseVisible = true;
	},

	KOMReviewDetailDispatchPlay (inputData) {
		mod._ValuePlaySpacings = KOMReviewLogic.KOMReviewFilter(KOMReviewLogic.KOMReviewSpacingsToday(mod._ValueDeckSelected.$KOMDeckSpacings), inputData);
		mod._ValuePlayVisible = true;
	},

	async KOMBrowseDispatchCreate (inputData) {
		mod._ValueDeckSelected.$KOMDeckSpacings.push(...Object.values(await KOMSpacingMetal.KOMSpacingMetalList(mod._ValueStorageClient, inputData, mod._ValueDeckSelected)).map(function (e) {
			return Object.assign(e, {
				$KOMSpacingCard: inputData,
			});
		}));
	},

	KOMBrowseListDispatchClose () {
		mod._ValueBrowseVisible = false;
	},

	KOMPlayDispatchDone () {
		mod._ValuePlayVisible = false;

		setTimeout(mod.SetupStorageWidget, 100);
	},

	KOMPlayDispatchRespond (inputData) {
		mod.ControlSpacingSave(inputData);
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageWidgetHidden = !mod._ValueStorageWidgetHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: [
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateDeck () {
						return mod.OLSKChangeDelegateCreateDeck(await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, mod.DataDeckTemplate('FakeOLSKChangeDelegateCreateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateDeck () {
						return mod.OLSKChangeDelegateUpdateDeck(Object.assign(mod._ValueDecksAll.filter(function (e) {
							return e.KOMDeckName === 'FakeOLSKChangeDelegateCreateDeck';
						}).pop(), {
							KOMDeckName: 'FakeOLSKChangeDelegateUpdateDeck',
						}));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateDeleteDeck () {
						return mod.OLSKChangeDelegateDeleteDeck(mod._ValueDecksAll.filter(function (e) {
							return e.KOMDeckName.match('FakeOLSKChangeDelegate');
						}).pop());
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateCard () {
						const deck = mod._ValueDecksAll[0];
						return mod.OLSKChangeDelegateCreateCard(await KOMCardAction.KOMCardActionCreate(mod._ValueStorageClient, mod.DataCardTemplate(deck), deck), deck);
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateSpacing',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateSpacing () {
						const deck = mod._ValueDecksAll[0];
						const card = deck.$KOMDeckCards[0];
						return mod.OLSKChangeDelegateCreateSpacing(await KOMSpacingMetal.KOMSpacingMetalWrite(mod._ValueStorageClient, mod.DataSpacingTemplate(card), card, deck), card, deck);
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

	async OLSKChangeDelegateCreateCard (param1, param2) {
		param2.$KOMDeckCards.push(param1);
		param2.$KOMDeckSpacings.push(...Object.values(await KOMSpacingMetal.KOMSpacingMetalList(mod._ValueStorageClient, param1, param2)).map(function (e) {
			return Object.assign(e, {
				$KOMSpacingCard: param1,
			})
		}));

		mod.ReactCounts(param2);
	},

	OLSKChangeDelegateCreateSpacing (param1, param2, param3) {
		Object.assign(param3.$KOMDeckSpacings.filter(function (e) {
			return e.KOMSpacingID === param1.KOMSpacingID;
		}).pop(), param1);

		mod.ReactCounts(param3);
	},

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

	_ValueBrowseVisible: false,

	_ValuePlayVisible: false,
	_ValuePlaySpacings: [],
	
	_ValueStorageWidgetHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueCountThrottleMap: {},
	
	// DATA

	DataDeckTemplate (inputData) {
		return {
			KOMDeckName: inputData,
			$KOMDeckCards: [],
			$KOMDeckSpacings: [],
		};
	},

	DataCardTemplate (inputData) {
		return {
			KOMCardQuestion: '',
			KOMCardAnswer: '',
			KOMCardHint: '',
			$KOMCardDeck: inputData,
		};
	},

	DataSpacingTemplate (inputData) {
		return {
			KOMSpacingID: `${ inputData.KOMCardID }-forward`,
			KOMSpacingIsLearning: true,
			KOMSpacingDueDate: new Date(),
			$KOMSpacingCard: inputData,
		};
	},

	// CONTROL

	async ControlDeckCreate(inputData) {
		const item = await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, mod.DataDeckTemplate(inputData));

		mod.ValueDecksAll(mod._ValueDecksAll.concat(item));
	},
	
	async ControlDeckSave(inputData) {
		await KOMDeckAction.KOMDeckActionUpdate(mod._ValueStorageClient, inputData);
	},

	async ControlDeckDiscard (inputData) {
		mod.ValueDecksAll(mod._ValueDecksAll.filter(function (e) {
			return e !== inputData;
		}))

		await KOMDeckAction.KOMDeckActionDelete(mod._ValueStorageClient, inputData);
	},

	ControlDeckSelect(inputData) {
		mod.ValueDeckSelected(inputData);
	},

	ControlSpacingSave(inputData) {
		KOMSpacingMetal.KOMSpacingMetalWrite(mod._ValueStorageClient, inputData, inputData.$KOMSpacingCard, mod._ValueDeckSelected);
	},

	// REACT

	ReactCounts (inputData) {
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			window.TestCardCount.innerHTML = inputData.$KOMDeckCards.length;
			window.TestSpacingCount.innerHTML = inputData.$KOMDeckSpacings.length;
			window.TestCallReactCounts.innerHTML = parseInt(window.TestCallReactCounts.innerHTML) + 1;
		}

		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueCountThrottleMap, 'inputData.KOMDeckID', {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback () {
				mod._ValueDecksAll = mod._ValueDecksAll; // #purge-svelte-force-update
			},
		});
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
			KOMSpacingStorage.KOMSpacingStorageBuild,
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
		mod.ValueDecksAll(await Promise.all((await KOMDeckAction.KOMDeckActionList(mod._ValueStorageClient)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}).map(async function (deck) {
			const cards = await KOMCardAction.KOMCardActionList(mod._ValueStorageClient, deck);
			return Object.assign(deck, {
				$KOMDeckCards: cards,
				$KOMDeckSpacings: [].concat(...(await Promise.all(cards.map(async function (card) {
					return Object.values(await KOMSpacingMetal.KOMSpacingMetalList(mod._ValueStorageClient, card, deck)).map(function (e) {
						return Object.assign(e, {
							$KOMSpacingCard: card,
						})
					})
				})))),
			})
		})));
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
import KOMBrowse from '../sub-browse/main.svelte';
import KOMPlay from '../sub-play/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
</script>

<div class="KOMReview OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<OLSKViewportContent>
	{#if !mod._ValueDeckSelected }
		<KOMReviewMaster
			KOMReviewMasterItems={ mod._ValueDecksAll }
			KOMReviewMasterDispatchCreate={ mod.KOMReviewMasterDispatchCreate }
			KOMReviewMasterDispatchSelect={ mod.KOMReviewMasterDispatchSelect }
			/>
	{/if}

	{#if mod._ValueDeckSelected && !mod._ValueBrowseVisible && !mod._ValuePlayVisible }
		<KOMReviewDetail
			KOMReviewDetailDeck={ mod._ValueDeckSelected }
			KOMReviewDetailDispatchBack={ mod.KOMReviewDetailDispatchBack }
			KOMReviewDetailDispatchDiscard={ mod.KOMReviewDetailDispatchDiscard }
			KOMReviewDetailDispatchUpdate={ mod.KOMReviewDetailDispatchUpdate }
			KOMReviewDetailDispatchBrowse={ mod.KOMReviewDetailDispatchBrowse }
			KOMReviewDetailDispatchPlay={ mod.KOMReviewDetailDispatchPlay }
			/>
	{/if}

	{#if mod._ValueDeckSelected && mod._ValueBrowseVisible && !mod._ValuePlayVisible }
		<KOMBrowse
			KOMBrowseStorageClient={ mod._ValueStorageClient }
			KOMBrowseDeckSelected={ mod._ValueDeckSelected }
			KOMBrowseDispatchCreate={ mod.KOMBrowseDispatchCreate }
			KOMBrowseListDispatchClose={ mod.KOMBrowseListDispatchClose }
			/>
	{/if}

	{#if mod._ValuePlayVisible}
		<KOMPlay
			KOMPlaySpacings={ mod._ValuePlaySpacings }
			KOMPlayDispatchDone={ mod.KOMPlayDispatchDone }
			KOMPlayDispatchRespond={ mod.KOMPlayDispatchRespond }
			/>
	{/if}
</OLSKViewportContent>

{#if true || OLSK_TESTING_BEHAVIOUR()}
	<p>
		<strong>TestCardCount</strong>
		<span id="TestCardCount">0</span>
	</p>

	<p>
		<strong>TestSpacingCount</strong>
		<span id="TestSpacingCount">0</span>
	</p>

	<p>
		<strong>TestCallReactCounts</strong>
		<span id="TestCallReactCounts">0</span>
	</p>
{/if}

{#if !mod._ValuePlayVisible}
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
{/if}

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('KOMServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
