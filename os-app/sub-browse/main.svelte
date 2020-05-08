<script>
export let KOMBrowseStorageClient;

export let KOMBrowseDeckSelected = null;
export let KOMBrowseDispatchCreate;
export let KOMBrowseListDispatchClose;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import OLSKThrottle from 'OLSKThrottle';
import KOMBrowseLogic from './ui-logic.js';
import KOMCardAction from '../_shared/KOMCard/action.js';

const mod = {

	// MESSAGE

	KOMBrowseListDispatchCreate () {
		mod.ControlCardCreate(mod._ValueDeckSelected);
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
		mod.ControlCardDiscard(mod._ValueCardSelected, mod._ValueDeckSelected);
	},

	KOMBrowseInfoDispatchUpdate () {
		mod._ValueCardSelected = mod._ValueCardSelected; // #purge-svelte-force-update

		mod.ControlCardUpdate(mod._ValueCardSelected, mod._ValueDeckSelected);
	},

	// VALUE

	_ValueCardsAll: [],
	ValueCardsAll (inputData, shouldSort = true) {
		mod.ValueCardsVisible(mod._ValueDeckSelected.$KOMDeckCards = inputData, shouldSort);
	},

	_ValueCardsVisible: [],
	ValueCardsVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase().match(mod._ValueFilterText.toLowerCase());
		});
		mod._ValueCardsVisible = shouldSort ? items.sort(KOMBrowseLogic.KOMBrowseSort) : items;
	},
	
	_ValueCardSelected: undefined,
	ValueCardSelected (inputData) {
		mod._ValueCardSelected = inputData;

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},
	
	_ValueDeckSelected: KOMBrowseDeckSelected,
	ValueDeckSelected (inputData) {
		mod._ValueDeckSelected = inputData
	},

	_ValueFilterText: '',

	_ValueCardUpdateThrottleMap: {},

	OLSKMobileViewInactive: false,

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE	

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Escape () {
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

				if (document.activeElement === document.querySelector('.KOMBrowseInfoFormQuestionField') && event.shiftKey) {
					document.querySelector('.OLSKMasterListFilterField').focus();

					return event.preventDefault();
				}
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	async ControlCardCreate(inputData) {
		const item = await KOMCardAction.KOMCardActionCreate(KOMBrowseStorageClient, {
			KOMCardQuestion: '',
			KOMCardAnswer: '',
			KOMCardHint: '',
		}, inputData);

		mod.ValueCardsAll(mod._ValueDeckSelected.$KOMDeckCards.concat(item));

		mod.ControlCardSelect(item);

		KOMBrowseDispatchCreate(item);
	},

	ControlCardUpdate(param1, param2) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueCardUpdateThrottleMap, param1.KOMCardID, {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback () {
				return KOMCardAction.KOMCardActionUpdate(KOMBrowseStorageClient, param1, param2);
			},
		});
	},

	async ControlCardDiscard (param1, param2) {
		mod.ValueCardsAll(mod._ValueDeckSelected.$KOMDeckCards.filter(function (e) {
			return e !== param1;
		}))

		await KOMCardAction.KOMCardActionDelete(KOMBrowseStorageClient, param1, param2);

		mod.ControlCardSelect(null);
	},

	ControlFocusDetail () {
		setTimeout(function () {
			document.querySelector('.KOMBrowseInfoFormQuestionField').focus();
		});
	},

	ControlCardSelect(inputData) {
		mod.ValueCardSelected(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && document.querySelector('.OLSKMasterListFilterField').focus();
		}

		mod.OLSKMobileViewInactive = true;

		if (mod.DataIsMobile()) {
			return;
		}
		
		setTimeout(mod.ControlFocusDetail)
	},
	
	ControlFilter(inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueCardsVisible(mod._ValueDeckSelected.$KOMDeckCards);

		if (!inputData) {
			return mod.ControlCardSelect(null);
		}

		if (!mod._ValueCardsVisible.length) {
			return mod.ControlCardSelect(null);
		}

		mod.ValueCardSelected(mod._ValueCardsVisible.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase() === inputData.toLowerCase();
		}).concat(mod._ValueCardsVisible.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase().includes(inputData.toLowerCase());
		})).shift());
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueCardsAll();
		mod.SetupFocus();
	},

	async SetupValueCardsAll() {
		mod.ValueCardsAll(mod._ValueDeckSelected.$KOMDeckCards);
	},

	SetupFocus() {
		setTimeout(function () {
			document.querySelector('.OLSKMasterListFilterField').focus();
		});
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKViewportContent from 'OLSKViewportContent';
import KOMBrowseList from './submodules/KOMBrowseList/main.svelte';
import KOMBrowseInfo from './submodules/KOMBrowseInfo/main.svelte';
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="KOMBrowse OLSKViewport">

<OLSKViewportContent>
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
		KOMBrowseInfoDispatchBack={ mod.KOMBrowseInfoDispatchBack }
		KOMBrowseInfoDispatchDiscard={ mod.KOMBrowseInfoDispatchDiscard }
		KOMBrowseInfoDispatchUpdate={ mod.KOMBrowseInfoDispatchUpdate }
		OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive }
		/>
</OLSKViewportContent>

</div>

<style src="./ui-style.css"></style>
