<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchBrowse;
export let KOMReviewDetailDispatchUpdate;
export let KOMReviewDetailDispatchPlay;
export let KOMReviewDetailDispatchDiscard;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';
import KOMReviewLogic from '../../ui-logic.js';

const kMaxUnseenCards = 10;

const itemsToday = KOMReviewLogic.KOMReviewSpacingsToday(KOMReviewDetailDeck.$KOMDeckSpacings).filter(function (e) {
	if (KOMReviewDetailDeck.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e)) {
		return false;
	}

	return true;
});

const mod = {

	// VALUE

	_ValueSpacingsToday: itemsToday,
	_ValueSpacingsReviewing: itemsToday.filter(function (e) {
		return !KOMSpacingModel.KOMSpacingModelIsUnseen(e);
	}),
	_ValueSpacingsUnseen: itemsToday.filter(KOMSpacingModel.KOMSpacingModelIsUnseen),

	_ValueLanguages: 'speechSynthesis' in window ? speechSynthesis.getVoices().map(function (e) {
		return e.lang
	}).filter(function (e, i, coll) {
		return coll.indexOf(e) === i;
	}).sort() : [],

	// INTERFACE

	InterfaceFormDidUpdate () {
		if (!KOMReviewDetailDeck.KOMDeckFrontLanguageCode && KOMReviewDetailDeck.KOMDeckFrontIsOral) {
			KOMReviewDetailDeck.KOMDeckFrontIsOral = false;
			delete KOMReviewDetailDeck.KOMDeckFrontIsOral;
		}


		window.setTimeout(function () {
			KOMReviewDetailDispatchUpdate(KOMReviewDetailDeck);
		});
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

	InterfaceRenameButtonDidClick() {
		mod.ControlRename();
	},

	// CONTROL

	ControlRename() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewDetailRenameButtonPromptText'), KOMReviewDetailDeck.KOMDeckName);
		
		if (!outputData) {
			return;
		}

		if (outputData === KOMReviewDetailDeck.KOMDeckName) {
			return;
		}

		KOMReviewDetailDispatchUpdate(Object.assign(KOMReviewDetailDeck, {
			KOMDeckName: outputData,
		}));
	},

	ContolPlay (inputData) {
		const outputData = {
			KOMReviewScheme: inputData,
		};

		if (inputData !== KOMReviewLogic.KOMReviewSchemeReviewing()) {
			outputData.KOMReviewMaxUnseenCards = kMaxUnseenCards;
		}
		
		KOMReviewDetailDispatchPlay(outputData);
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import KOMReviewDetailLanguageCode from '../KOMReviewDetailLanguageCode/main.svelte';
</script>

<div class="KOMReviewDetail">

<header class="KOMReviewDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMReviewDetailToolbarBackButtonText') } on:click={ KOMReviewDetailDispatchBack }>
				<div class="KOMReviewDetailToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
			</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<strong class="KOMReviewDetailToolbarTitle">{ KOMReviewDetailDeck.KOMDeckName }</strong>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarCardsButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBrowse }>{ OLSKLocalized('KOMReviewDetailToolbarCardsButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMReviewDetailBody">

<h1 class="KOMReviewDetailStudyHeading">{ OLSKLocalized('KOMReviewDetailStudyHeadingText') }</h1>

<div class="KOMReviewDetailForm">
	<p>
		<label>
			<input class="KOMReviewDetailFormFrontIsOralField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckFrontIsOral } disabled={ KOMReviewDetailDeck.KOMDeckFrontLanguageCode ? null : true } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormFrontIsOralFieldLabel">{ OLSKLocalized('KOMReviewDetailFormFrontIsOralFieldLabelText') }</span>
		</label>

		<span class="KOMReviewDetailFormFrontLanguageCode">
			<KOMReviewDetailLanguageCode
				KOMReviewDetailLanguageCodeItem={ KOMReviewDetailDeck }
				KOMReviewDetailLanguageCodeItemProperty={ 'KOMDeckFrontLanguageCode' }
				KOMReviewDetailLanguageCodeOptions={ mod._ValueLanguages }
				KOMReviewDetailLanguageCodeDispatchUpdate={ mod.InterfaceFormDidUpdate }
				/>
		</span>
	</p>
	<p>
		<label>
			<input class="KOMReviewDetailFormIsForwardOnlyField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckIsForwardOnly } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormIsForwardOnlyFieldLabel">{ OLSKLocalized('KOMReviewDetailFormIsForwardOnlyFieldLabelText') }</span>
		</label>
	</p>
</div>

{#if !KOMReviewDetailDeck.$KOMDeckSpacings.length}
	<p class="KOMReviewDetailNoCards">{ OLSKLocalized('KOMReviewDetailNoCardsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && mod._ValueSpacingsToday.length}
	<div class="KOMReviewDetailPlay">
		{#if mod._ValueSpacingsReviewing.length }
			<button class="KOMReviewDetailPlayButtonReviewing" on:click={ mod.InterfaceReviewingButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonReviewingText') }</button>
		{/if}
		
		{#if mod._ValueSpacingsUnseen.length }
			<button class="KOMReviewDetailPlayButtonUnseen" on:click={ mod.InterfaceUnseenButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonUnseenText') }</button>
		{/if}
		
		{#if mod._ValueSpacingsReviewing.length && mod._ValueSpacingsUnseen.length }
			<button class="KOMReviewDetailPlayButtonMixed" on:click={ mod.InterfaceMixedButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonMixedText') }</button>
		{/if}
	</div>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && !mod._ValueSpacingsToday.length}
	<p class="KOMReviewDetailNoSpacings">{ OLSKLocalized('KOMReviewDetailNoSpacingsText') }</p>
{/if}

<hr>

<h1 class="KOMReviewDetailDeckHeading">{ OLSKLocalized('KOMReviewDetailDeckHeadingText') }</h1>

<p>
	<button class="KOMReviewDetailRenameButton" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailRenameButtonText') }</button>
</p>

<p>
	<button class="KOMReviewDetailDiscardButton" on:click={ () => window.confirm(OLSKLocalized('KOMReviewDetailDiscardPromptText')) && KOMReviewDetailDispatchDiscard(KOMReviewDetailDeck) }>{ OLSKLocalized('KOMReviewDetailDiscardButtonText') }</button>
</p>

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

hr {
	width: 100%;
	height: 1px;
	border: none;

	background: #e6e6e6;
}
</style>
