<script>
export let KOMBrowseStorageClient;

export let KOMBrowseItemSelected = null;
export let KOMBrowseDeckSelected = null;
export let KOMBrowseListDispatchClose;
export let KOMBrowseListDispatchClick;
export let KOMBrowseListDispatchArrow;
export let KOMBrowseListDispatchFilter;
export let KOMBrowseInfoDispatchBack;
export let KOMBrowseInfoDispatchUpdate;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import KOMBrowseLogic from './ui-logic.js';
import KOMCardAction from '../../../_shared/KOMCard/action.js';

const mod = {

	// VALUE

	_ValueDocumentsAll: [],
	ValueDocumentsAll (inputData, shouldSort = true) {
		mod.ValueDocumentsVisible(mod._ValueDocumentsAll = inputData, shouldSort);
	},

	_ValueDocumentsVisible: [],
	ValueDocumentsVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase().match(mod._ValueFilterText.toLowerCase());
		});
		mod._ValueDocumentsVisible = shouldSort ? items.sort(KOMBrowseLogic.KOMBrowseSort) : items;
	},
	
	_ValueDocumentSelected: undefined,
	ValueDocumentSelected (inputData) {
		mod._ValueDocumentSelected = inputData;

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
		mod.ControlDocumentSelect(inputData);
	},

	KOMBrowseListDispatchArrow (inputData) {
		mod.ValueDocumentSelected(inputData);
	},

	KOMBrowseListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	KOMBrowseInfoDispatchBack () {
		mod.ControlDocumentSelect(null);

		mod.OLSKMobileViewInactive = false;
	},

	KOMBrowseInfoDispatchDiscard () {
		mod.ControlCardDiscard(mod._ValueDocumentSelected, );
	},

	KOMBrowseInfoDispatchUpdate () {
		mod._ValueDocumentSelected = mod._ValueDocumentSelected; // #purge-svelte-force-update

		mod.ControlDocumentPersist(mod._ValueDocumentSelected);
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
				if (document.activeElement === document.querySelector('.KOMBrowseListFilterField') && KOMBrowseItemSelected) {
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
	
	ControlDocumentSelect(inputData) {
		mod.ValueDocumentSelected(inputData);

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

		mod.ValueDocumentsVisible(mod._ValueDocumentsAll);

		if (!inputData) {
			return mod.ControlDocumentSelect(null);
		}

		if (!mod._ValueDocumentsVisible.length) {
			return mod.ControlDocumentSelect(null);
		}

		mod.ValueDocumentSelected(mod._ValueDocumentsVisible.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase() === inputData.toLowerCase();
		}).concat(mod._ValueDocumentsVisible.filter(function (e) {
			return e.KOMCardQuestion.toLowerCase().includes(inputData.toLowerCase());
		})).shift());
	},

};

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
		KOMBrowseListItems={ mod._ValueDocumentsAll }
		KOMBrowseListItemSelected={ KOMBrowseItemSelected }
		KOMBrowseListFilterText={ mod._ValueFilterText }
		KOMBrowseListDispatchClose={ KOMBrowseListDispatchClose }
		KOMBrowseListDispatchCreate={ mod.KOMBrowseListDispatchCreate }
		KOMBrowseListDispatchClick={ KOMBrowseListDispatchClick }
		KOMBrowseListDispatchArrow={ KOMBrowseListDispatchArrow }
		KOMBrowseListDispatchFilter={ KOMBrowseListDispatchFilter }
		OLSKMobileViewInactive={ !!KOMBrowseItemSelected }
		/>

	<KOMBrowseInfo
		KOMBrowseInfoItem={ KOMBrowseItemSelected }
		KOMBrowseInfoDispatchBack={ KOMBrowseInfoDispatchBack }
		KOMBrowseInfoDispatchDiscard={ mod.KOMBrowseInfoDispatchDiscard }
		KOMBrowseInfoDispatchUpdate={ KOMBrowseInfoDispatchUpdate }
		OLSKMobileViewInactive={ !KOMBrowseItemSelected }
		/>
</OLSKViewportContent>

</div>

<style src="./ui-style.css"></style>
