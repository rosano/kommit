<script>
export let KOMBrowseStorageClient;

export let KOMBrowseDeckSelected;
export let KOMBrowseDeckCards;
export let KOMBrowseDispatchCreate;
export let KOMBrowseListDispatchClose;
export let KOMBrowseInfoSpeechAvailable;
export let KOMBrowseInfoDispatchRead;

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

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import OLSKThrottle from 'OLSKThrottle';
import KOMBrowseLogic from './ui-logic.js';
import KOMCardAction from '../_shared/KOMCard/action.js';
import KOMCardStorage from '../_shared/KOMCard/storage.js';

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

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeChangeDelegateCreateCard',
					LCHRecipeCallback: async function FakeChangeDelegateCreateCard () {
						return mod.ChangeDelegateCreateCard(await KOMCardAction.KOMCardActionCreate(KOMBrowseStorageClient, mod.DataCardObjectTemplate('FakeChangeDelegateCreateCard'), KOMBrowseDeckSelected));
					},
				},
				{
					LCHRecipeName: 'FakeChangeDelegateUpdateCard',
					LCHRecipeCallback: async function FakeChangeDelegateUpdateCard () {
						return mod.ChangeDelegateUpdateCard(await KOMCardAction.KOMCardActionUpdate(KOMBrowseStorageClient, Object.assign(mod._ValueCardsAll.filter(function (e) {
							return e.KOMCardFrontText.match('FakeChangeDelegate');
						}).pop(), {
							KOMCardFrontText: 'FakeChangeDelegateUpdateCard',
						}), KOMBrowseDeckSelected));
					},
				},
				{
					LCHRecipeName: 'FakeChangeDelegateDeleteCard',
					LCHRecipeCallback: async function FakeChangeDelegateDeleteCard () {
						const item = mod._ValueCardsAll.filter(function (e) {
							return e.KOMCardFrontText.match('FakeChangeDelegate');
						}).pop();
						
						await KOMCardAction.KOMCardActionDelete(KOMBrowseStorageClient, item, KOMBrowseDeckSelected);
						
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

				if (!OLSK_TESTING_BEHAVIOUR()) {
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
		const item = await KOMCardAction.KOMCardActionCreate(KOMBrowseStorageClient, Object.assign(mod.DataCardObjectTemplate(), param2), param1);

		mod.ValueCardsAll(mod._ValueCardsAll.concat(item));

		mod.ControlCardSelect(item);

		KOMBrowseDispatchCreate(item);
	},

	ControlCardUpdate(param1, param2) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueCardUpdateThrottleMap, param1.KOMCardID, {
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
			OLSKThrottleCallback () {
				return KOMCardAction.KOMCardActionUpdate(KOMBrowseStorageClient, param1, param2);
			},
		});
	},

	async ControlCardAudioCapture(param1, param2, param3, param4) {
		await KOMCardAction.KOMCardActionAudioCapture(...[KOMBrowseStorageClient].concat(Object.values(arguments)));

		await mod.ControlCardUpdate(param3, param4);
	},

	async ControlCardAudioClear(param1, param2, param3) {
		await KOMCardAction.KOMCardActionAudioClear(...([KOMBrowseStorageClient].concat(Object.values(arguments))));

		await mod.ControlCardUpdate(param2, param3);
	},

	async ControlCardDiscard (param1, param2) {
		mod.ValueCardsAll(mod._ValueCardsAll.filter(function (e) {
			return e !== param1;
		}), false);

		await KOMCardAction.KOMCardActionDelete(KOMBrowseStorageClient, param1, param2);

		mod.ControlCardSelect(null);
	},

	async ControlDiscardRetiredCards () {
		if (window.prompt(OLSKLocalized('KOMBrowseLauncherItemDiscardRetiredCardsPromptText')) !== KOMBrowseDeckSelected.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingRetired.toString()) {
			return;
		}

		const retired = mod._ValueCardsAll.filter(function (e) {
			return e.KOMCardIsRetired;
		});

		const selectedIsRetired = retired.includes(mod._ValueCardSelected);

		mod.ValueCardsAll(mod._ValueCardsAll.filter(function (e) {
			return !retired.includes(e);
		}), false);

		await Promise.all(retired.map(function (e) {
			return KOMCardAction.KOMCardActionDelete(KOMBrowseStorageClient, e, KOMBrowseDeckSelected);
		}));

		if (selectedIsRetired) {
			mod.ControlCardSelect(null);
		}
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
		mod.ControlCardDiscard(mod._ValueCardSelected, KOMBrowseDeckSelected);
	},

	KOMBrowseInfoDispatchTemplate (inputData) {
		mod.ControlCardCreate(KOMBrowseDeckSelected, inputData);
	},

	KOMBrowseInfoDispatchUpdate () {
		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update

		mod.ControlCardUpdate(mod._ValueCardSelected, KOMBrowseDeckSelected);

		mod.ReactTags();
	},

	async KOMBrowseInfoAudioDispatchCapture (param1, param2) {
		await mod.ControlCardAudioCapture(param1, param2, mod._ValueCardSelected, KOMBrowseDeckSelected);

		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update
	},

	async KOMBrowseInfoAudioDispatchClear (inputData) {
		await mod.ControlCardAudioClear(inputData, mod._ValueCardSelected, KOMBrowseDeckSelected);

		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update
	},

	async KOMBrowseInfoAudioDispatchFetch (inputData) {
		return await KOMCardAction.KOMCardActionAudioFetch(KOMBrowseStorageClient, inputData, mod._ValueCardSelected, KOMBrowseDeckSelected);
	},

	KOMBrowseInfoDispatchDebug (inputData) {
		const url = `https://inspektor.5apps.com/?path=kommit%2F${ encodeURIComponent(KOMCardStorage.KOMCardStorageFolderPath(inputData, KOMBrowseDeckSelected)) }`;

		if (OLSK_TESTING_BEHAVIOUR()) {
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

{#if OLSK_TESTING_BEHAVIOUR() && KOMBrowseStorageClient.FakeStorageClient }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}
