<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';
const OLSKFormatted = OLSKString.OLSKStringWithFormat;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStoragePackage from '../_shared/__external/OLSKRemoteStorage/main.js'
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
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
import KOMPlayLogic from '../sub-play/ui-logic.js';
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

		mod._ValueDeckSelected = mod._ValueDeckSelected // #purge-svelte-force-update
	},

	KOMReviewDetailDispatchBrowse () {
		mod._ValueBrowseVisible = true;
	},

	KOMReviewDetailDispatchPlay (inputData) {
		mod._ValuePlaySpacings = KOMPlayLogic.KOMPlaySort(KOMReviewLogic.KOMReviewFilter(KOMReviewLogic.KOMReviewSpacingsToday(mod._ValueDeckSelected.$KOMDeckSpacings), inputData, mod._ValueDeckSelected));
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

	KOMPlayDispatchUpdate (inputData) {
		mod.ControlSpacingSave(inputData);
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		const items = mod._ValueDecksAll.map(function (e) {
			return {
				LCHRecipeName: OLSKFormatted(OLSKLocalized('KOMReviewLauncherItemSelectDeckTextFormat'), e.KOMDeckName),
				LCHRecipeCallback () {
					return mod.ControlDeckSelect(e);
				},
			}
		});

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateDeck () {
						return mod.OLSKChangeDelegateCreateDeck(await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, mod.FakeDeckObjectValid('FakeOLSKChangeDelegateCreateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateDeck () {
						return mod.OLSKChangeDelegateUpdateDeck(await KOMDeckAction.KOMDeckActionUpdate(mod._ValueStorageClient, mod.FakeDeckObjectValid('FakeOLSKChangeDelegateUpdateDeck')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteDeck',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateDeleteDeck () {
						const deck = mod.FakeDeckObjectValid();
						await KOMDeckAction.KOMDeckActionDelete(mod._ValueStorageClient, deck)
						return mod.OLSKChangeDelegateDeleteDeck(deck);
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateCard () {
						return mod.OLSKChangeDelegateCreateCard(await KOMCardAction.KOMCardActionCreate(mod._ValueStorageClient, mod.FakeCardObjectValid('FakeOLSKChangeDelegateCreateCard'), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateCard () {
						return mod.OLSKChangeDelegateUpdateCard(await KOMCardAction.KOMCardActionUpdate(mod._ValueStorageClient, mod.FakeCardObjectValid('FakeOLSKChangeDelegateUpdateCard'), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteCard',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateDeleteCard () {
						const card = mod.FakeCardObjectValid();
						await KOMCardAction.KOMCardActionDelete(mod._ValueStorageClient, card, mod.FakeDeckObjectValid());
						return mod.OLSKChangeDelegateDeleteCard(card);
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateSpacing',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateSpacing () {
						return mod.OLSKChangeDelegateCreateSpacing(await KOMSpacingMetal.KOMSpacingMetalWrite(mod._ValueStorageClient, mod.FakeSpacingObjectValid(), mod.FakeCardObjectValid(), mod.FakeDeckObjectValid()));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateSpacing',
					LCHRecipeCallback: function FakeOLSKChangeDelegateUpdateSpacing () {
						[false, true].map(async function (backward) {
							const spacing = await KOMSpacingMetal.KOMSpacingMetalWrite(mod._ValueStorageClient, Object.assign(mod.FakeSpacingObjectValid(backward), {
								KOMSpacingIsLearning: true,
								KOMSpacingDueDate: new Date(),
							}), mod.FakeCardObjectValid(), mod.FakeDeckObjectValid());

							if (!backward) {
								return;
							}

							mod.OLSKChangeDelegateUpdateSpacing(spacing);
						});
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteSpacing',
					LCHRecipeCallback: function FakeOLSKChangeDelegateDeleteSpacing () {
						return mod.OLSKChangeDelegateDeleteSpacing(mod.FakeSpacingObjectValid());
					},
				},
			]);
		}
		
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: items,
		});
	},

	OLSKChangeDelegateCreateDeck (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateUpdateDeck (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateDeleteDeck (inputData) {
		mod.ReactThrottle();
	},
	OLSKChangeDelegateCreateCard (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateUpdateCard (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateDeleteCard (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateCreateSpacing (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateUpdateSpacing (inputData) {
		mod.ReactThrottle();
	},

	OLSKChangeDelegateDeleteSpacing (inputData) {},

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

	_ValueHoldCards: [],
	_ValueHoldSpacings: [],
	
	_ValueStorageToolbarHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSpacingUpdateThrottleMap: {},
	_ValueCountThrottleMap: {},
	
	// DATA

	FakeDeckObjectValid(inputData) {
		return {
			KOMDeckID: 'FakeDeckID',
			KOMDeckName: inputData || '',
			KOMDeckCreationDate: new Date(),
			KOMDeckModificationDate: new Date(),
		};
	},

	FakeCardObjectValid(inputData) {
		return {
			KOMCardID: 'FakeCardID',
			KOMCardDeckID: 'FakeDeckID',
			KOMCardFront: inputData || '',
			KOMCardRear: '',
			KOMCardCreationDate: new Date(),
			KOMCardModificationDate: new Date(),
		};
	},

	FakeSpacingObjectValid(inputData) {
		return {
			KOMSpacingID: 'FakeCardID-' + (inputData ? 'backward' : 'forward'),
			KOMSpacingChronicles: [],
		};
	},

	// CONTROL

	async ControlDeckCreate(inputData) {
		const item = await KOMDeckAction.KOMDeckActionCreate(mod._ValueStorageClient, {
			KOMDeckName: inputData,
			$KOMDeckCards: [],
			$KOMDeckSpacings: [],
		});

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
		const deck = mod._ValueDeckSelected;
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSpacingUpdateThrottleMap, inputData.KOMSpacingID, {
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
			OLSKThrottleCallback () {
				return KOMSpacingMetal.KOMSpacingMetalWrite(mod._ValueStorageClient, inputData, inputData.$KOMSpacingCard, deck);
			},
		});
	},

	// REACT

	ReactThrottle () {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueCountThrottleMap, 'mod._ValueDecksAll', {
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
			async OLSKThrottleCallback () {
				await mod.SetupValueDecksAll();

				if (OLSK_TESTING_BEHAVIOUR()) {
					const deck = mod._ValueDecksAll[0];
					window.TestCardCount.innerHTML = !deck ? 0 : deck.$KOMDeckCards.length;
					window.TestSpacingCount.innerHTML = !deck ? 0 : deck.$KOMDeckSpacings.length;
					window.TestCallReactThrottle.innerHTML = parseInt(window.TestCallReactThrottle.innerHTML) + 1;
				}

				mod.ReactSelected();
			},
		});
	},

	ReactSelected () {
		if (!mod._ValueDeckSelected) {
			return;
		}

		mod._ValueDeckSelected = mod._ValueDecksAll.filter(function (e) {
			return e.KOMDeckID === mod._ValueDeckSelected.KOMDeckID;
		}).pop();

		if (OLSK_TESTING_BEHAVIOUR()) {
			window.TestCallReactSelected.innerHTML = parseInt(window.TestCallReactSelected.innerHTML) + 1;
		}
	},

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValueDecksAll();

		mod._ValueIsLoading = false;
	},

	SetupStorageClient() {
		const storageModule = KOM_Data.KOM_DataModule([
			Object.assign(KOMDeckStorage.KOMDeckStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateDeck,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateDeck,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteDeck,
				},
			}),
			Object.assign(KOMCardStorage.KOMCardStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateCard,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateCard,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteCard,
				},
			}),
			Object.assign(KOMSpacingStorage.KOMSpacingStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateSpacing,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateSpacing,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteSpacing,
				},
			}),
			]);
		
		mod._ValueStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.caching.enable(`/${ storageModule.name }/`);
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
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
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
			KOMPlayDeck={ mod._ValueDeckSelected }
			KOMPlayDispatchDone={ mod.KOMPlayDispatchDone }
			KOMPlayDispatchUpdate={ mod.KOMPlayDispatchUpdate }
			/>
	{/if}
</OLSKViewportContent>

{#if OLSK_TESTING_BEHAVIOUR()}
	<p>
		<strong>TestCardCount</strong>
		<span id="TestCardCount">0</span>
	</p>

	<p>
		<strong>TestSpacingCount</strong>
		<span id="TestSpacingCount">0</span>
	</p>

	<p>
		<strong>TestCallReactThrottle</strong>
		<span id="TestCallReactThrottle">0</span>
	</p>

	<p>
		<strong>TestCallReactSelected</strong>
		<span id="TestCallReactSelected">0</span>
	</p>
{/if}

{#if !mod._ValuePlayVisible }
	<footer class="KOMReviewViewportFooter OLSKMobileViewFooter">

		{#if !mod._ValueStorageToolbarHidden }
			<div class="KOMReviewStorageToolbar OLSKStorageToolbar">
				<OLSKToolbar OLSKToolbarJustify={ true }>
					<OLSKToolbarElementGroup>
						<div></div>
					</OLSKToolbarElementGroup>

					<OLSKToolbarElementGroup>
						<OLSKStorageWidget StorageClient={ mod._ValueStorageClient } />
					</OLSKToolbarElementGroup>
				</OLSKToolbar>
			</div>
		{/if}

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
