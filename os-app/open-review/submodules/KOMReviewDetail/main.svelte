<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchDiscard;
export let KOMReviewDetailDispatchRename;
export let KOMReviewDetailDispatchBrowse;
export let KOMReviewDetailDispatchPlay;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewLogic from '../../ui-logic.js';

const mod = {

	// VALUE

	_ValueSpacingsToday: KOMReviewLogic.KOMReviewSpacingsToday(KOMReviewDetailDeck.$KOMDeckSpacings),

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
			
			<button class="KOMReviewDetailToolbarCardsButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBrowse }>{ OLSKLocalized('KOMReviewDetailToolbarCardsButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div>

<h1 class="KOMReviewDetailHeading">{ KOMReviewDetailDeck.KOMDeckName }</h1>

{#if !KOMReviewDetailDeck.$KOMDeckSpacings.length}
	<p class="KOMReviewDetailNoCards">{ OLSKLocalized('KOMReviewDetailNoCardsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && mod._ValueSpacingsToday.length}
	<button class="KOMReviewDetailPlayButton" on:click={ KOMReviewDetailDispatchPlay }>{ OLSKLocalized('KOMReviewDetailPlayButtonText') }</button>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && !mod._ValueSpacingsToday.length}
	<p class="KOMReviewDetailNoSpacings">{ OLSKLocalized('KOMReviewDetailNoSpacingsText') }</p>
{/if}

</div>

</div>

<style>
.KOMReviewDetail {
	/* KOMReviewDetailFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.KOMReviewDetailToolbar {
	border-bottom: var(--KOMBorderStyle);
}
</style>
