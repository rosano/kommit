<script>
export let KOMReviewMasterItems;
export let KOMReviewMasterDispatchCreate;
export let KOMReviewMasterDispatchSelect;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewMasterCreateButtonPromptText'));
		
		if (!outputData) {
			return;
		}

		KOMReviewMasterDispatchCreate(outputData);
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import KOMReviewMasterListItem from '../KOMReviewMasterListItem/main.svelte';
</script>

<div class="KOMReviewMaster">

<header class="KOMReviewMasterToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<span class="KOMReviewMasterToolbarTitle">{ OLSKLocalized('KOMReviewMasterToolbarTitleText') }</span>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMReviewMasterBody">
{#each KOMReviewMasterItems as e}
	<div class="KOMReviewMasterListItemContainer" on:click={ () => KOMReviewMasterDispatchSelect(e) }
		on:keypress={ (event) => ['Enter', 'Space'].includes(event.code) && KOMReviewMasterDispatchSelect(e) }>
		<KOMReviewMasterListItem KOMReviewMasterListItemObject={ e } />
	</div>
{/each}

<button class="KOMReviewMasterCreateButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }
</button>
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

.KOMReviewMasterToolbar :global(.OLSKToolbar) {
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

.KOMReviewMasterBody :global(.KOMReviewMasterListItem) {
	display: block;
	margin-bottom: var(--KOMCommonPadding);
	padding: var(--KOMCommonPadding);
	border: 1px solid rgba(0, 0, 0, 0.1);

	clear: both;

	cursor: pointer;
}
</style>
