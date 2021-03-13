<script>
export let KOMBrowseStorageClient;

export let KOMBrowseDeckSelected;
export let KOMBrowseDeckCards;
export let KOMBrowseDispatchEligible;
export let KOMBrowseDispatchCreate;
export let KOMBrowseDispatchDiscard;
export let KOMBrowseListDispatchClose;
export let KOMBrowseInfoSpeechAvailable;
export let KOMBrowseInfoDispatchRead;
export let KOMBrowse_DEBUG = false;

export const modPublic = {

	KOMBrowseChangeDelegateCreateCard () {
		mod.ChangeDelegateCreateCard(...arguments);
	},

	KOMBrowseChangeDelegateUpdateCard () {
		mod.ChangeDelegateUpdateCard(...arguments);
	},

	KOMBrowseChangeDelegateDeleteCard () {
		mod.ChangeDelegateDeleteCard(...arguments);
	},

	KOMBrowseRecipes () {
		return mod.DataBrowseRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKThrottle from 'OLSKThrottle';
import KOMBrowseLogic from './ui-logic.js';
import KOMCard from '../_shared/KOMCard/main.js';

const mod = {

	// VALUE

	_ValueTagsAll: [],

	_ValueCardUpdateThrottleMap: {},

	OLSKMobileViewInactive: false,

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

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
					LCHRecipeName: 'FakeChangeDelegateCreateCard',
					LCHRecipeCallback: async function FakeChangeDelegateCreateCard () {
						return mod.ChangeDelegateCreateCard(await KOMBrowseStorageClient.App.KOMCard.KOMCardCreate(mod.DataCardObjectTemplate('FakeChangeDelegateCreateCard'), KOMBrowseDeckSelected));
					},
				},
				{
					LCHRecipeName: 'FakeChangeDelegateUpdateCard',
					LCHRecipeCallback: async function FakeChangeDelegateUpdateCard () {
						return mod.ChangeDelegateUpdateCard(await KOMBrowseStorageClient.App.KOMCard.KOMCardUpdate(Object.assign(mod._ValueCardsAll.filter(function (e) {
							return e.KOMCardFrontText.match('FakeChangeDelegate');
						}).pop(), {
							KOMCardFrontText: 'FakeChangeDelegateUpdateCard',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeChangeDelegateDeleteCard',
					LCHRecipeCallback: async function FakeChangeDelegateDeleteCard () {
						const item = mod._ValueCardsAll.filter(function (e) {
							return e.KOMCardFrontText.match('FakeChangeDelegate');
						}).pop();
						
						await KOMBrowseStorageClient.App.KOMCard.KOMCardDelete(item);
						
						return mod.ChangeDelegateDeleteCard(item);
					},
				},
				{
					LCHRecipeName: 'FakeEscapeWithoutSort',
					LCHRecipeCallback: function FakeEscapeWithoutSort () {
						mod.ControlCardSelect(null);
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

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Tab () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()) {
					mod.ControlFocusDetail();

					return event.preventDefault();
				}

				if (document.activeElement === document.querySelector('.KOMBrowseInfoFormFrontTextField') && event.shiftKey) {
					mod.ControlFocusMaster();

					return event.preventDefault();
				}
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	async ControlCardCreate(param1, param2 = {}) {
		if (!KOMBrowseDispatchEligible()) {
			return;
		}

		const item = await KOMBrowseStorageClient.App.KOMCard.KOMCardCreate(Object.assign(mod.DataCardObjectTemplate(), param2), param1);

		mod.ControlCardSelect(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(item));

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
		document.querySelector('.OLSKMasterListFilterField').focus();
	},

	ControlFocusDetail () {
		document.querySelector('.KOMBrowseInfoFormFrontTextField').focus();
	},

	ControlCardSelect(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && mod.ControlFocusMaster();
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		setTimeout(mod.ControlFocusDetail);
	},
	
	// MESSAGE

	OLSKMasterListItemAccessibilitySummaryFunction (inputData) {
		KOMBrowseLogic.KOMBrowseAccessibilitySummary(inputData, OLSKLocalized);
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.KOMCardID;
	},

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlCardSelect(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchQuantity (inputData) {
		console.log('OLSKCatalogDispatchQuantity');
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

	ChangeDelegateCreateCard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	ChangeDelegateUpdateCard (inputData) {
		if (mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected().KOMCardID === inputData.KOMCardID) {
			mod.ControlCardSelect(inputData);
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},

	ChangeDelegateDeleteCard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
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

		mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll()
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
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKMasterListItemAccessibilitySummaryFunction={ mod.OLSKMasterListItemAccessibilitySummaryFunction }

	OLSKCatalogSortFunction={ KOMBrowseLogic.KOMBrowseSortFunction }
	OLSKCatalogFilterFunction={ KOMBrowseLogic.KOMBrowseFilterFunction }
	OLSKCatalogExactFunction={ KOMBrowseLogic.KOMBrowseExactFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchFilterSubmit={ mod.OLSKCatalogDispatchFilterSubmit }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }

	let:OLSKResultsListItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail">
		<button class="KOMBrowseListToolbarCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseListToolbarCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
			<div class="KOMBrowseListToolbarCreateButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- LIST ITEM -->

	<div slot="OLSKMasterListItem">
		<KOMBrowseListItem KOMBrowseListItemObject={ OLSKResultsListItem } />
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
			OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive }
			KOMBrowseInfoDispatchDebug={ mod.KOMBrowseInfoDispatchDebug }
			bind:this={ mod._KOMBrowseInfo }
			/>
	</div>

</OLSKCatalog>

{#if OLSK_SPEC_UI() && KOMBrowse_DEBUG }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.KOMBrowseListToolbarCreateButton {
	margin-left: 4px !important;
}

@media screen and (max-width: 760px) {

.KOMBrowseListToolbarCreateButton {
	margin-left: 8px !important;
}

}
</style>