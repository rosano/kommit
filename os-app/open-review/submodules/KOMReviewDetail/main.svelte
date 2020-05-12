<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchDiscard;
export let KOMReviewDetailDispatchRename;
export let KOMReviewDetailDispatchBrowse;
export let KOMReviewDetailDispatchUpdate;
export let KOMReviewDetailDispatchPlay;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';
import KOMReviewLogic from '../../ui-logic.js';

const kMaxUnseenCards = 10;

const itemsToday = KOMReviewLogic.KOMReviewSpacingsToday(KOMReviewDetailDeck.$KOMDeckSpacings);

const mod = {

	// VALUE

	_ValueSpacingsToday: itemsToday,
	_ValueSpacingsReviewing: itemsToday.filter(function (e) {
		return !KOMSpacingModel.KOMSpacingModelIsUnseen(e);
	}),
	_ValueSpacingsUnseen: itemsToday.filter(KOMSpacingModel.KOMSpacingModelIsUnseen),

	// INTERFACE

	InterfaceRenameButtonDidClick() {
		mod.ControlRename();
	},

	InterfaceReviewingButtonDidClick() {
		mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeReviewing());
	},

	InterfaceUnseenButtonDidClick() {
		mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeUnseen());
	},

	InterfaceMixedButtonDidClick() {
		mod.ContolPlay(KOMReviewLogic.KOMReviewSchemeMixed());
	},

	// CONTROL

	ControlRename() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewDetailToolbarRenameButtonPromptText'), KOMReviewDetailDeck.KOMDeckName);
		
		if (!outputData) {
			return;
		}

		KOMReviewDetailDispatchRename(outputData);
	},

	ContolPlay (inputData) {
		KOMReviewDetailDispatchPlay(Object.assign({
			KOMReviewScheme: inputData,
		}, inputData !== KOMReviewLogic.KOMReviewSchemeReviewing() ? {
			KOMReviewMaxUnseenCards: kMaxUnseenCards,
		} : {}));
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
			<strong class="KOMReviewDetailToolbarTitle">{ KOMReviewDetailDeck.KOMDeckName }</strong>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('KOMReviewDetailToolbarDiscardPromptText')) && KOMReviewDetailDispatchDiscard(KOMReviewDetailDeck) }>{ OLSKLocalized('KOMReviewDetailToolbarDiscardButtonText') }</button>
			
			<button class="KOMReviewDetailToolbarRenameButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailToolbarRenameButtonText') }</button>
			
			<button class="KOMReviewDetailToolbarCardsButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBrowse }>{ OLSKLocalized('KOMReviewDetailToolbarCardsButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMReviewDetailBody">

<h1 class="KOMReviewDetailStudyHeading">{ OLSKLocalized('KOMReviewDetailStudyHeadingText') }</h1>

{#if !KOMReviewDetailDeck.$KOMDeckSpacings.length}
	<p class="KOMReviewDetailNoCards">{ OLSKLocalized('KOMReviewDetailNoCardsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && mod._ValueSpacingsToday.length}
	<p>
		<label>
			<input class="KOMReviewDetailIsForwardOnlyField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckIsForwardOnly } on:input={ () => window.setTimeout(() => KOMReviewDetailDispatchUpdate(KOMReviewDetailDeck)) } />
			<span class="KOMReviewDetailIsForwardOnlyFieldLabel">{ OLSKLocalized('KOMReviewDetailIsForwardOnlyFieldLabelText') }</span>
		</label>
	</p>

	{#if mod._ValueSpacingsReviewing.length }
		<button class="KOMReviewDetailPlayButtonReviewing" on:click={ mod.InterfaceReviewingButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonReviewingText') }</button>
	{/if}
	
	{#if mod._ValueSpacingsUnseen.length }
		<button class="KOMReviewDetailPlayButtonUnseen" on:click={ mod.InterfaceUnseenButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonUnseenText') }</button>
	{/if}
	
	{#if mod._ValueSpacingsReviewing.length && mod._ValueSpacingsUnseen.length }
		<button class="KOMReviewDetailPlayButtonMixed" on:click={ mod.InterfaceMixedButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonMixedText') }</button>
	{/if}
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && !mod._ValueSpacingsToday.length}
	<p class="KOMReviewDetailNoSpacings">{ OLSKLocalized('KOMReviewDetailNoSpacingsText') }</p>
{/if}

</div>

</div>

<style>
.KOMReviewDetail {
	/* OLSKViewportContentFlexbox:Child */
	flex-grow: 1;
	
	/* KOMReviewDetailFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.KOMReviewDetailToolbar {
	border-bottom: var(--KOMBorderStyle);
}

.KOMReviewDetailBody {
	padding: var(--KOMCommonPadding);
}
</style>
