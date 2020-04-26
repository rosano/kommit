<script>
export let KOMBrowseStorageClient;

export let KOMBrowseDeckSelected = null;
export let KOMBrowseListDispatchClose;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import KOMBrowseLogic from './ui-logic.js';
import KOMCardAction from '../../../_shared/KOMCard/action.js';

const mod = {

	// VALUE

	_ValueCardsAll: [],
	ValueCardsAll (inputData, shouldSort = true) {
		mod.ValueDocumentsVisible(mod._ValueCardsAll = inputData, shouldSort);
	},

	_ValueDocumentsVisible: [],
	ValueDocumentsVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase().match(mod._ValueFilterText.toLowerCase());
		});
		mod._ValueDocumentsVisible = shouldSort ? items.sort(KOMBrowseLogic.KOMBrowseSort) : items;
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

	OLSKMobileViewInactive: false,

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

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

		mod.ControlDocumentPersist(mod._ValueCardSelected);
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
					document.querySelector('.KOMBrowseListBody').scrollTo(0, 0);
				}
			},
			Tab () {
				if (document.activeElement === document.querySelector('.KOMBrowseListFilterField') && mod._ValueCardSelected) {
					mod.ControlFocusDetail();

					return event.preventDefault();
				}

				if (document.activeElement === document.querySelector('.KOMBrowseInfoFormQuestionField') && event.shiftKey) {
					document.querySelector('.KOMBrowseListFilterField').focus();

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
		}, inputData);

		mod.ValueCardsAll(mod._ValueCardsAll.concat(item));

		mod.ControlCardSelect(item);
	},

	async ControlCardDiscard (param1, param2) {
		mod.ValueCardsAll(mod._ValueCardsAll.filter(function (e) {
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

	ControlDocumentPersist(inputData) {
	},

	async _ControlDocumentSave(inputData) {
	},

	async ControlDocumentCreate(inputData) {
		
	},
	
	ControlCardSelect(inputData) {
		mod.ValueCardSelected(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && document.querySelector('.KOMBrowseListFilterField').focus();
		}

		mod.OLSKMobileViewInactive = true;

		if (mod.DataIsMobile()) {
			return;
		}
		
		setTimeout(mod.ControlFocusDetail)
	},
	
	ControlFilter(inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueDocumentsVisible(mod._ValueCardsAll);

		if (!inputData) {
			return mod.ControlCardSelect(null);
		}

		if (!mod._ValueDocumentsVisible.length) {
			return mod.ControlCardSelect(null);
		}

		mod.ValueCardSelected(mod._ValueDocumentsVisible.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase() === inputData.toLowerCase();
		}).concat(mod._ValueDocumentsVisible.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase().includes(inputData.toLowerCase());
		})).shift());
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueCardsAll();
		mod.SetupFocus();
	},

	async SetupValueCardsAll() {
		mod.ValueCardsAll((await KOMCardAction.KOMCardActionList(KOMBrowseStorageClient, mod._ValueDeckSelected)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}));
	},

	SetupFocus() {
		setTimeout(function () {
			document.querySelector('.KOMBrowseListFilterField').focus();
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
		KOMBrowseListItems={ mod._ValueDocumentsVisible }
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
