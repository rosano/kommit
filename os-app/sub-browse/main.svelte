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

	_ValueCardsAll: KOMBrowseDeckCards,
	ValueCardsAll (inputData, shouldSort = true) {
		mod.ValueCardsVisible(mod._ValueCardsAll = inputData, shouldSort);

		mod.ReactTags();
	},

	_ValueCardsVisible: [],
	ValueCardsVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(KOMBrowseLogic.KOMBrowseFilterFunction(mod._ValueFilterText));
		mod._ValueCardsVisible = shouldSort ? items.sort(KOMBrowseLogic.KOMBrowseSort) : items;
	},
	
	_ValueCardSelected: undefined,
	ValueCardSelected (inputData) {
		mod._ValueCardSelected = inputData;

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},
	
	_ValueFilterText: '',

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

		if (mod._ValueCardsVisible.filter(function (e) {
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

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Escape () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && !mod._ValueFilterText) {
					return KOMBrowseListDispatchClose();
				}

				mod.ControlFilter('');

				if (!OLSK_SPEC_UI()) {
					document.querySelector('.OLSKMasterListBody').scrollTo(0, 0);
				}
			},
			Tab () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && mod._ValueCardSelected) {
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

		mod.ValueCardsAll(mod._ValueCardsAll.concat(item));

		mod.ControlCardSelect(item);

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

	async ControlCardDiscard (param1) {
		mod.ValueCardsAll(mod._ValueCardsAll.filter(function (e) {
			return e !== param1;
		}), false);

		await KOMBrowseStorageClient.App.KOMCard.KOMCardDelete(param1);

		if (param1 === mod._ValueCardSelected) {
			mod.ControlCardSelect(null);
		}

		KOMBrowseDispatchDiscard(param1);
	},

	ControlDiscardRetiredCards () {
		if (window.prompt(OLSKLocalized('KOMBrowseLauncherItemDiscardRetiredCardsPromptText')) !== KOMBrowseDeckSelected.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingRetired.toString()) {
			return;
		}

		return mod._ValueCardsAll.filter(function (e) {
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
		mod.ValueCardSelected(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && mod.ControlFocusMaster();
		}

		mod.OLSKMobileViewInactive = true;

		setTimeout(mod.ControlFocusDetail);
	},
	
	ControlFilter(inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueCardsVisible(mod._ValueCardsAll);

		if (!inputData) {
			return mod.ControlCardSelect(null);
		}

		if (!mod._ValueCardsVisible.length) {
			return mod.ControlCardSelect(null);
		}

		mod.ValueCardSelected(KOMBrowseLogic.KOMBrowseExactMatchFirst(inputData, mod._ValueCardsVisible).shift());
	},

	// MESSAGE

	KOMBrowseListDispatchCreate () {
		mod.ControlCardCreate(KOMBrowseDeckSelected);
	},

	KOMBrowseListDispatchClick (inputData) {
		mod.ControlCardSelect(inputData);
	},

	KOMBrowseListDispatchArrow (inputData) {
		mod.ValueCardSelected(inputData);
	},

	KOMBrowseListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	KOMBrowseInfoDispatchBack () {
		mod.OLSKMobileViewInactive = false;
	},

	KOMBrowseInfoDispatchDiscard () {
		mod.ControlCardDiscard(mod._ValueCardSelected);
	},

	KOMBrowseInfoDispatchTemplate (inputData) {
		mod.ControlCardCreate(KOMBrowseDeckSelected, inputData);
	},

	KOMBrowseInfoDispatchUpdate () {
		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update

		mod.ControlCardUpdate(mod._ValueCardSelected);

		mod.ReactTags();
	},

	async KOMBrowseInfoAudioDispatchCapture (property, data) {
		await mod.ControlCardAudioCapture(property, data, mod._ValueCardSelected);

		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update
	},

	async KOMBrowseInfoAudioDispatchClear (inputData) {
		await mod.ControlCardAudioClear(inputData, mod._ValueCardSelected);

		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update
	},

	KOMBrowseInfoAudioDispatchFetch (inputData) {
		return KOMBrowseStorageClient.App.KOMCard.KOMCardAudioFetch(mod._ValueCardSelected, inputData === 'KOMCardFrontAudio' ? KOMCard.KOMCardSideFront() : KOMCard.KOMCardSideRear());
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
		mod.ValueCardsAll([inputData].concat(mod._ValueCardsAll), !mod._ValueCardSelected);
	},

	ChangeDelegateUpdateCard (inputData) {
		if (mod._ValueCardSelected && mod._ValueCardSelected.KOMCardID === inputData.KOMCardID) {
			mod.ControlCardSelect(inputData);
		}

		mod.ValueCardsAll(mod._ValueCardsAll.map(function (e) {
			return e.KOMCardID === inputData.KOMCardID ? inputData : e;
		}), !mod._ValueCardSelected);
	},

	ChangeDelegateDeleteCard (inputData) {
		if (mod._ValueCardSelected && (mod._ValueCardSelected.KOMCardID === inputData.KOMCardID)) {
			mod.ControlCardSelect(null);
		}

		mod.ValueCardsAll(mod._ValueCardsAll.filter(function (e) {
			return e.KOMCardID !== inputData.KOMCardID;
		}), false);
	},

	// REACT

	ReactCardSelected () {
		if (!mod._ValueCardSelected) {
			return;
		}

		mod._ValueCardSelected = mod._ValueCardsVisible.filter(function (e) {
			return e.KOMCardID === mod._ValueCardSelected.KOMCardID;
		}).pop();
	},

	ReactTags () {
		mod._ValueTagsAll = mod._ValueCardsAll.reduce(function (coll, item) {
			return coll.concat((item.KOMCardTags || []).filter(function (e) {
				return !coll.includes(e);
			}));
		}, []).sort();
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueCardsAll();
		mod.SetupFocus();
	},

	SetupValueCardsAll() {
		mod.ValueCardsAll(mod._ValueCardsAll);
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

import KOMBrowseList from './submodules/KOMBrowseList/main.svelte';
import KOMBrowseInfo from './submodules/KOMBrowseInfo/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<KOMBrowseList
	KOMBrowseListItems={ mod._ValueCardsVisible }
	KOMBrowseListItemSelected={ mod._ValueCardSelected }
	KOMBrowseListFilterText={ mod._ValueFilterText }
	KOMBrowseListDispatchClose={ KOMBrowseListDispatchClose }
	KOMBrowseListDispatchCreate={ mod.KOMBrowseListDispatchCreate }
	KOMBrowseListDispatchClick={ mod.KOMBrowseListDispatchClick }
	KOMBrowseListDispatchArrow={ mod.KOMBrowseListDispatchArrow }
	KOMBrowseListDispatchFilter={ mod.KOMBrowseListDispatchFilter }
	OLSKMobileViewInactive={ !!mod.OLSKMobileViewInactive }
	/>

<KOMBrowseInfo
	KOMBrowseInfoItem={ mod._ValueCardSelected }
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

{#if OLSK_SPEC_UI() && KOMBrowse_DEBUG }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}
