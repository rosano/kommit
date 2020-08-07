<script>
export let KOMReviewMasterItems;
export let KOMReviewMasterDispatchCreate;
export let KOMReviewMasterDispatchSelect;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// DATA

	DataUnseenCount () {
		return KOMReviewMasterItems.reduce(function (coll, item) {
			return coll + (item.$KOMDeckGeneralNotUnseenCount || 0);
		}, 0);
	},

	DataTodaySpacings () {
		return KOMReviewMasterItems.reduce(function (coll, item) {
			return coll.concat(item.$KOMDeckTodayStudiedSpacings || []);
		}, []);
	},

	DataGeneralSpacings () {
		return KOMReviewMasterItems.reduce(function (coll, item) {
			return coll.concat(item.$KOMDeckSpacings || []);
		}, []);
	},

	// INTERFACE

	InterfaceCreateButtonDidClick() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewMasterCreateButtonPromptText'));
		
		if (!outputData) {
			return;
		}

		KOMReviewMasterDispatchCreate(outputData);
	},

};

import KOMReviewMasterListItem from '../KOMReviewMasterListItem/main.svelte';
import KOMReviewStats from '../KOMReviewStats/main.svelte';
</script>

<div class="KOMReviewMaster">

<header class="KOMReviewMasterToolbar OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<span class="KOMReviewMasterToolbarTitle">{ OLSKLocalized('KOMReviewMasterToolbarTitleText') }</span>
	</div>
</header>

<div class="KOMReviewMasterBody">

{#each KOMReviewMasterItems as e}
	<KOMReviewMasterListItem
		KOMReviewMasterListItemName={ e.KOMDeckName }
		KOMReviewMasterListItemReviewCount={ e.$KOMDeckTodayReviewCount }
		KOMReviewMasterListItemUnseenCount={ e.$KOMDeckTodayUnseenCount }
		KOMReviewMasterListItemDispatchClick={ () => KOMReviewMasterDispatchSelect(e) }
		/>
{/each}

<button class="KOMReviewMasterCreateButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }
</button>

{#if KOMReviewMasterItems.length && mod.DataUnseenCount() }
	<hr>

	<KOMReviewStats KOMReviewTodaySpacings={ mod.DataTodaySpacings() } KOMReviewGeneralSpacings={ mod.DataGeneralSpacings() } />
{/if}

</div>

</div>

<style>
.KOMReviewMaster {
	/* OLSKViewportContentFlexbox:Child */
	flex-grow: 1;
}

.KOMReviewMasterToolbar {
	border-bottom: var(--KOMBorderStyle);
}

.KOMReviewMasterToolbar.OLSKToolbar {
	/* OLSKToolbarFlexbox:Parent */
	justify-content: center;
}

.KOMReviewMasterToolbarTitle {
	display: block;
	padding: 7px;

	font-size: 14px;
}

.KOMReviewMasterBody {
	padding: var(--KOMCommonPadding);
}

:global(.OLSKIsLoading) .KOMReviewMasterBody {
	visibility: hidden;
}

hr {
	height: 1px;
	border: none;

	background: #e6e6e6;
}
</style>
