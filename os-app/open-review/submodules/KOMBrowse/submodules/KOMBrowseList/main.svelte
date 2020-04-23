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

	// MESSAGE

	OLSKInputWrapperDispatchClear () {
		KOMBrowseListDispatchFilter('');
	},

	// VALUE

	_ValueFilterFieldFocused: true,

	// DATA

	DataIsFocused () {
		return document.activeElement === document.querySelector('.KOMBrowseListFilterField');
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// INTERFACE

	InterfaceFilterFieldDidInput (event) {
		KOMBrowseListDispatchFilter(this.value);
	},

	InterfaceCreateButtonDidClick () {
		KOMBrowseListDispatchCreate();
	},

	// SETUP

	SetupEverything () {
		mod.SetupFilterFieldEventListeners();
	},

	SetupFilterFieldEventListeners () {
		setTimeout(function () {
			document.querySelector('.KOMBrowseListFilterField').addEventListener('focus', function () {
				mod._ValueFilterFieldFocused = true;
			});

			document.querySelector('.KOMBrowseListFilterField').addEventListener('blur', function () {
				mod._ValueFilterFieldFocused = false;
			});
		}, 100);
	},

	// LIFECYCLE

	LifecycleComponentDidMount () {
		mod.SetupEverything();
	},

	LifecycleComponentDidUpdate () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			return;
		}

		if (mod.DataIsMobile()) {
			return;
		}
		
		const element = document.querySelector('.OLSKResultsListItemSelected');

		if (!element) {
			return;
		}
		
		element.scrollIntoView({
			block: 'nearest',
			inline: 'nearest',
		});
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleComponentDidMount);

import { afterUpdate } from 'svelte';
afterUpdate(mod.LifecycleComponentDidUpdate);

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKInputWrapper from 'OLSKInputWrapper';
import _OLSKSharedCreate from '../../../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import OLSKResults from 'OLSKResults';
import KOMBrowseListItem from '../KOMBrowseListItem/main.svelte';
</script>

<div class="KOMBrowseList OLSKViewportMaster" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } class:KOMBrowseListFocused={ mod._ValueFilterFieldFocused } aria-hidden={ OLSKMobileViewInactive ? true : null }>

<header class="KOMBrowseListToolbar OLSKMobileViewHeader">
	<OLSKToolbar>
		<OLSKToolbarElementGroup>
			<button class="KOMBrowseListToolbarCloseButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" on:click={ KOMBrowseListDispatchClose }>{ OLSKLocalized('KOMBrowseListToolbarCloseButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKInputWrapper OLSKInputWrapperValue={ KOMBrowseListFilterText } OLSKInputWrapperDispatchClear={ mod.OLSKInputWrapperDispatchClear } >
			<input class="KOMBrowseListFilterField" placeholder={ OLSKLocalized('KOMBrowseListFilterFieldText') } bind:value={ KOMBrowseListFilterText } on:input={ mod.InterfaceFilterFieldDidInput } />
		</OLSKInputWrapper>

		<OLSKToolbarElementGroup>
			<button class="KOMBrowseListCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n" title={ OLSKLocalized('KOMBrowseListCreateButtonText') }>
				<div class="KOMBrowseListCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<section class="KOMBrowseListBody OLSKMobileViewBody">
	<OLSKResults
		OLSKResultsListItems={ KOMBrowseListItems }
		OLSKResultsListItemSelected={ KOMBrowseListItemSelected }
		OLSKResultsDispatchClick={ KOMBrowseListDispatchClick }
		OLSKResultsDispatchArrow={ (inputData) => mod.DataIsFocused() && KOMBrowseListDispatchArrow(inputData) }
		let:OLSKResultsListItem={ e }
		>
		<KOMBrowseListItem
			KOMBrowseListItemAccessibilitySummary={ KOMBrowseListLogic.KOMBrowseListItemAccessibilitySummary(e, OLSKLocalized) }
			KOMBrowseListItemTitle={ KOMBrowseListLogic.KOMBrowseListItemTitle(e) }
			/>
	</OLSKResults>
</section>

</div>

<style src="./ui-style.css"></style>
