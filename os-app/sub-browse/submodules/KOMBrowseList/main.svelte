<script>
export let KOMBrowseListFilterText;
export let KOMBrowseListItems;
export let KOMBrowseListItemSelected = null;
export let KOMBrowseListDispatchClose;
export let KOMBrowseListDispatchCreate;
export let KOMBrowseListDispatchClick;
export let KOMBrowseListDispatchArrow;
export let KOMBrowseListDispatchFilter;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import KOMBrowseListLogic from './ui-logic.js';

const mod = {

	InterfaceCreateButtonDidClick () {
		KOMBrowseListDispatchCreate();
	},

};

import OLSKMasterList from 'OLSKMasterList';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import KOMBrowseListItem from '../KOMBrowseListItem/main.svelte';
</script>

<OLSKMasterList
	OLSKMasterListItems={ KOMBrowseListItems }
	OLSKMasterListItemSelected={ KOMBrowseListItemSelected }
	OLSKMasterListFilterText={ KOMBrowseListFilterText }
	OLSKMasterListDispatchClick={ KOMBrowseListDispatchClick }
	OLSKMasterListDispatchArrow={ KOMBrowseListDispatchArrow }
	OLSKMasterListDispatchFilter={ KOMBrowseListDispatchFilter }
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFor={ (inputData) => KOMBrowseListLogic.KOMBrowseListItemAccessibilitySummary(inputData, OLSKLocalized) }	
	OLSKMasterListClass={ 'KOMBrowseList' }
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
	>
	<div slot="OLSKMasterListToolbarHead">
		<OLSKToolbarElementGroup>
			<button class="KOMBrowseListToolbarCloseButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" on:click={ KOMBrowseListDispatchClose }>{ OLSKLocalized('KOMBrowseListToolbarCloseButtonText') }</button>
		</OLSKToolbarElementGroup>
	</div>

	<KOMBrowseListItem
		KOMBrowseListItemQuestion={ KOMBrowseListLogic.KOMBrowseListItemQuestion(item) }
		/>

	<div slot="OLSKMasterListToolbarTail">
		<OLSKToolbarElementGroup>
			<button class="KOMBrowseListToolbarCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n" title={ OLSKLocalized('KOMBrowseListToolbarCreateButtonText') }>
				<div class="KOMBrowseListToolbarCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</OLSKToolbarElementGroup>
	</div>
</OLSKMasterList>	

<style src="./ui-style.css"></style>
