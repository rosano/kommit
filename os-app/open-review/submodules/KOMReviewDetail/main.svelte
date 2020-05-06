<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailSpacings;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchDiscard;
export let KOMReviewDetailDispatchRename;
export let KOMReviewDetailDispatchBrowse;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceRenameButtonDidClick() {
		mod.ControlRename();
	},

	// CONTROL

	ControlRename() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewDetailToolbarRenameButtonPromptText'), KOMReviewDetailDeck.KOMDeckName);
		
		if (!outputData) {
			return;
		}

		KOMReviewDetailDispatchRename(outputData);
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="KOMReviewDetail">

<header class="KOMReviewDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBack }>{ OLSKLocalized('KOMReviewDetailToolbarBackButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('KOMReviewDetailToolbarDiscardPromptText')) && KOMReviewDetailDispatchDiscard(KOMReviewDetailDeck) }>{ OLSKLocalized('KOMReviewDetailToolbarDiscardButtonText') }</button>
			
			<button class="KOMReviewDetailToolbarRenameButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailToolbarRenameButtonText') }</button>
			
			<button class="KOMReviewDetailToolbarBrowseButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBrowse }>{ OLSKLocalized('KOMReviewDetailToolbarBrowseButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div>

<h1 class="KOMReviewDetailHeading">{ KOMReviewDetailDeck.KOMDeckName }</h1>

{#if !KOMReviewDetailSpacings.length}
	<p class="KOMReviewDetailNoCards">{ OLSKLocalized('KOMReviewDetailNoCardsText') }</p>
{/if}

</div>

</div>

<style>
.KOMReviewDetail {
	/* KOMReviewDetailFlexbox:Parent */
	display: flex;
	flex-direction: column;
}
</style>
