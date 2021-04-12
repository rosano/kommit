<script>
export let KOMBrowseStorageClient;

export let KOMBrowseDeckSelected;
export let KOMBrowseDeckCards;
export let KOMBrowseDispatchEligible;
export let KOMBrowseDispatchCreate;
export let KOMBrowseDispatchDiscard;
export let KOMBrowseDispatchClose;
export let KOMBrowseInfoSpeechAvailable;
export let KOMBrowseInfoDispatchRead;
export let KOMBrowse_DEBUG = false;

export const modPublic = {

	KOMBrowseSyncCreateCard () {
		mod.SyncCreateCard(...arguments);
	},

	KOMBrowseSyncUpdateCard () {
		mod.SyncUpdateCard(...arguments);
	},

	KOMBrowseSyncDeleteCard () {
		mod.SyncDeleteCard(...arguments);
	},

	KOMBrowseRecipes () {
		return mod.DataBrowseRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKThrottle from 'OLSKThrottle';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import KOMBrowseLogic from './ui-logic.js';
import KOMCard from '../_shared/KOMCard/main.js';

const mod = {

	// VALUE

	_ValueTagsAll: [],

	_ValueCardUpdateThrottleMap: {},

	// DATA

	DataCardObjectTemplate (inputData = '') {
		return {
			KOMCardFrontText: inputData,
			KOMCardRearText: '',
			KOMCardNotes: '',
		};
	},

	DataBrowseRecipes () {
		const items = [];

		if (mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
			return e.KOMCardIsRetired;
		}).length) {
			items.push(...[
				{
					LCHRecipeSignature: 'KOMBrowseLauncherItemDiscardRetiredCards',
					LCHRecipeName: OLSKLocalized('KOMBrowseLauncherItemDiscardRetiredCardsText'),
					LCHRecipeCallback: function KOMBrowseLauncherItemDiscardRetiredCards () {
						return mod.ControlDiscardRetiredCards();
					},
				},
			]);
		}

		if (OLSK_SPEC_UI()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeSyncCreateCard',
					LCHRecipeCallback: async function FakeSyncCreateCard () {
						return mod.SyncCreateCard(await KOMBrowseStorageClient.App.KOMCard.KOMCardCreate(mod.DataCardObjectTemplate('FakeSyncCreateCard'), KOMBrowseDeckSelected));
					},
				},
				{
					LCHRecipeName: 'FakeSyncUpdateCard',
					LCHRecipeCallback: async function FakeSyncUpdateCard () {
						return mod.SyncUpdateCard(await KOMBrowseStorageClient.App.KOMCard.KOMCardUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.KOMCardFrontText.match('FakeSync');
						}).pop(), {
							KOMCardFrontText: 'FakeSyncUpdateCard',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeSyncDeleteCard',
					LCHRecipeCallback: async function FakeSyncDeleteCard () {
						return mod.SyncDeleteCard(await KOMBrowseStorageClient.App.KOMCard.KOMCardDelete(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.KOMCardFrontText.match('FakeSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeSyncConflictCard',
					LCHRecipeCallback: async function FakeSyncConflictCard () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.KOMCardFrontText.match('FakeSyncConflictCard');
						}).pop();
						
						return mod.SyncConflictCard({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await KOMBrowseStorageClient.App.KOMCard.KOMCardUpdate(Object.assign({}, item, {
								KOMCardFrontText: item.KOMCardFrontText + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign({}, item, {
								KOMCardFrontText: item.KOMCardFrontText + '-remote',
							}))),
						});
					},
				},
			]);
		}

		if (mod._KOMBrowseInfo) {
			items.push(...mod._KOMBrowseInfo.modPublic.KOMBrowseInfoRecipes());
		}
		
		return items;
	},

	// INTERFACE	

	InterfaceCreateButtonDidClick () {
		mod.ControlCardCreate(KOMBrowseDeckSelected);
	},

	// CONTROL

	async ControlCardCreate(param1, param2 = {}) {
		if (!KOMBrowseDispatchEligible()) {
			return;
		}

		const item = await KOMBrowseStorageClient.App.KOMCard.KOMCardCreate(Object.assign(mod.DataCardObjectTemplate(), param2), param1);

		mod.ControlCardActivate(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(item));

		KOMBrowseDispatchCreate(item);
	},

	ControlCardUpdate(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueCardUpdateThrottleMap, inputData.KOMCardID, {
			OLSKThrottleDuration: OLSK_SPEC_UI() ? 0 : 500,
			OLSKThrottleCallback () {
				return KOMBrowseStorageClient.App.KOMCard.KOMCardUpdate(inputData);
			},
		});
	},

	async ControlCardAudioCapture(property, data, card) {
		await KOMBrowseStorageClient.App.KOMCard.KOMCardAudioCapture(card, property === 'KOMCardFrontAudio' ? KOMCard.KOMCardSideFront() : KOMCard.KOMCardSideRear(), data);

		await mod.ControlCardUpdate(card);
	},

	async ControlCardAudioClear(param1, param2) {
		await KOMBrowseStorageClient.App.KOMCard.KOMCardAudioClear(param2, param1 === 'KOMCardFrontAudio' ? KOMCard.KOMCardSideFront() : KOMCard.KOMCardSideRear());

		await mod.ControlCardUpdate(param2);
	},

	async ControlCardDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData)

		KOMBrowseDispatchDiscard(await KOMBrowseStorageClient.App.KOMCard.KOMCardDelete(inputData));
	},

	ControlDiscardRetiredCards () {
		if (window.prompt(OLSKLocalized('KOMBrowseLauncherItemDiscardRetiredCardsPromptText')) !== KOMBrowseDeckSelected.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingRetired.toString()) {
			return;
		}

		return mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
			return e.KOMCardIsRetired;
		}).map(function (e) {
			return mod.ControlCardDiscard(e);
		});
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKNarrowFilterField').focus();
	},

	ControlFocusDetail () {
		document.querySelector('.KOMBrowseInfoFormFrontTextField').focus();
	},

	ControlCardActivate(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		setTimeout(mod.ControlFocusDetail);
	},
	
	// MESSAGE

	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		KOMBrowseLogic.KOMBrowseAccessibilitySummary(inputData, OLSKLocalized);
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.KOMCardID;
	},

	OLSKCollectionDispatchClick (inputData) {
		mod.ControlCardActivate(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchDetailActivate () {
		document.querySelector('.KOMBrowseInfoFormFrontTextField').focus();
	},

	OLSKCatalogDispatchMasterShouldActivate () {
		return document.activeElement === document.querySelector('.KOMBrowseInfoFormFrontTextField');
	},

	OLSKCatalogDispatchQuantity (inputData) {
		mod.ReactTags();
	},

	KOMBrowseInfoDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	KOMBrowseInfoDispatchDiscard () {
		mod.ControlCardDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	KOMBrowseInfoDispatchTemplate (inputData) {
		mod.ControlCardCreate(KOMBrowseDeckSelected, inputData);
	},

	KOMBrowseInfoDispatchUpdate () {
		mod.ControlCardUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));

		mod.ReactTags();
	},

	async KOMBrowseInfoAudioDispatchCapture (property, data) {
		await mod.ControlCardAudioCapture(property, data, mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());

		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()); // #purge-svelte-force-update
	},

	async KOMBrowseInfoAudioDispatchClear (inputData) {
		await mod.ControlCardAudioClear(inputData, mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());

		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()); // #purge-svelte-force-update
	},

	KOMBrowseInfoAudioDispatchFetch (inputData) {
		return KOMBrowseStorageClient.App.KOMCard.KOMCardAudioFetch(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected(), inputData === 'KOMCardFrontAudio' ? KOMCard.KOMCardSideFront() : KOMCard.KOMCardSideRear());
	},

	KOMBrowseInfoDispatchDebug (inputData) {
		const url = `https://inspektor.5apps.com/?path=kommit%2F${ encodeURIComponent(KOMCard.KOMCardFolderPath(inputData, KOMBrowseDeckSelected)) }`;

		if (OLSK_SPEC_UI()) {
			window.FakeWindowOpen = url;
			return;
		}

		window.open(url)
	},

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataBrowseRecipes(),
		});
	},

	SyncCreateCard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	SyncUpdateCard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},

	SyncDeleteCard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	SyncConflictCard (inputData) {
		return setTimeout(async function () {
			mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(await KOMBrowseStorageClient.App.KOMCard.KOMCardUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))))
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	// REACT

	ReactTags () {
		mod._ValueTagsAll = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().reduce(function (coll, item) {
			return coll.concat((item.KOMCardTags || []).filter(function (e) {
				return !coll.includes(e);
			}));
		}, []).sort();
	},

	// SETUP

	SetupEverything() {
		mod.SetupCatalog();
		mod.SetupFocus();
	},

	SetupCatalog() {
		KOMBrowseDeckCards.map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert);
	},

	SetupFocus() {
		setTimeout(function () {
			mod.ControlFocusMaster();
		});
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKCatalog from 'OLSKCatalog';
import KOMBrowseListItem from './submodules/KOMBrowseListItem/main.svelte';
import KOMBrowseInfo from './submodules/KOMBrowseInfo/main.svelte';
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKCollectionItemAccessibilitySummaryFunction={ mod.OLSKCollectionItemAccessibilitySummaryFunction }

	OLSKCatalogSortFunction={ KOMBrowseLogic.KOMBrowseSortFunction }
	OLSKCatalogIsMatch={ KOMBrowseLogic.KOMBrowseIsMatch }
	OLSKCatalogExactSortFunction={ KOMBrowseLogic.KOMBrowseExactSortFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCollectionDispatchClick={ mod.OLSKCollectionDispatchClick }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKCatalogDispatchDetailActivate={ mod.OLSKCatalogDispatchDetailActivate }
	OLSKCatalogDispatchMasterShouldActivate={ mod.OLSKCatalogDispatchMasterShouldActivate }
	OLSKCatalogDispatchFilterSubmit={ mod.OLSKCatalogDispatchFilterSubmit }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }
	OLSKCatalogDispatchEscapeOnEmpty={ KOMBrowseDispatchClose }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->
	
	<div class="OLSKToolbarElementGroup" slot="OLSKNarrowToolbarHead">
		<button class="KOMBrowseCloseButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseCloseButtonText') } on:click={ KOMBrowseDispatchClose }>
			<div class="KOMBrowseCloseButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup" slot="OLSKNarrowToolbarTail">
		<button class="KOMBrowseCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
			<div class="KOMBrowseCreateButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- LIST ITEM -->

	<div slot="OLSKCollectionItem">
		<KOMBrowseListItem KOMBrowseListItemObject={ OLSKCollectionItem } />
	</div>

	<!-- DETAIL -->
	
	<div class="KOMBrowseDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<KOMBrowseInfo
			KOMBrowseInfoItem={ OLSKCatalogItemSelected }
			KOMBrowseInfoDeck={ KOMBrowseDeckSelected }
			KOMBrowseInfoTagsSuggestions={ mod._ValueTagsAll }
			KOMBrowseInfoSpeechAvailable={ KOMBrowseInfoSpeechAvailable }
			KOMBrowseInfoDispatchBack={ mod.KOMBrowseInfoDispatchBack }
			KOMBrowseInfoDispatchDiscard={ mod.KOMBrowseInfoDispatchDiscard }
			KOMBrowseInfoDispatchUpdate={ mod.KOMBrowseInfoDispatchUpdate }
			KOMBrowseInfoDispatchTemplate={ mod.KOMBrowseInfoDispatchTemplate }
			KOMBrowseInfoDispatchRead={ KOMBrowseInfoDispatchRead }
			KOMBrowseInfoAudioDispatchCapture={ mod.KOMBrowseInfoAudioDispatchCapture }
			KOMBrowseInfoAudioDispatchFetch={ mod.KOMBrowseInfoAudioDispatchFetch }
			KOMBrowseInfoAudioDispatchClear={ mod.KOMBrowseInfoAudioDispatchClear }
			KOMBrowseInfoDispatchDebug={ mod.KOMBrowseInfoDispatchDebug }
			bind:this={ mod._KOMBrowseInfo }
			/>
	</div>

</OLSKCatalog>

{#if OLSK_SPEC_UI() && KOMBrowse_DEBUG }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.KOMBrowseCreateButton {
	margin-left: 4px !important;
}

@media screen and (max-width: 760px) {

.KOMBrowseCreateButton {
	margin-left: 8px !important;
}

}
</style>