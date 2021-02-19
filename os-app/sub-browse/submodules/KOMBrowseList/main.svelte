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

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec'

import KOMBrowseListLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		KOMBrowseListDispatchCreate();
	},

};

import OLSKMasterList from 'OLSKMasterList';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
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
		<div class="OLSKToolbarElementGroup">
			<button class="KOMBrowseListToolbarCloseButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseListToolbarCloseButtonText') } on:click={ KOMBrowseListDispatchClose }>
				<div class="KOMBrowseListToolbarCloseButtonImage">{@html _OLSKSharedBack }</div>
			</button>
		</div>
	</div>

	<div slot="OLSKMasterListToolbarTail">
		<div class="OLSKToolbarElementGroup">
			<button class="KOMBrowseListToolbarCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('KOMBrowseListToolbarCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
				<div class="KOMBrowseListToolbarCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</div>
	</div>

	<div slot="OLSKMasterListItem">
		<KOMBrowseListItem
			KOMBrowseListItemObject={ item }
			/>
	</div>
</OLSKMasterList>	

<style src="./ui-style.css"></style>
