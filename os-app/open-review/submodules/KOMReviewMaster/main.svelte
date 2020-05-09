<script>
export let KOMReviewMasterListItems;
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
</script>

<div class="KOMReviewMaster">

<header class="KOMReviewMasterToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<strong class="KOMReviewMasterToolbarTitle">{ OLSKLocalized('KOMReviewMasterToolbarTitleText') }</strong>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

{#each KOMReviewMasterListItems as e}
	<button class="KOMReviewMasterListItem" on:click={ () => KOMReviewMasterDispatchSelect(e) } >{ e.KOMDeckName }</button>
{/each}

<button class="KOMReviewMasterCreateButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }</button>

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
	padding: 10px;

	font-size: 14px;
}
</style>
