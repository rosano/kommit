<script>
export let KOMReviewDetailDeck;
export let KOMReviewDetailPlaySingle = false;
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
import KOMPlayLogic from '../../../sub-play/ui-logic.js';

const kMaxUnseenCards = 10;

const mod = {

	// VALUE

	_ValueSpacingsToday: [],
	_ValueSpacingsReviewing: [],
	_ValueSpacingsUnseen: [],
	_ValueSpacingsStudied: [],
	_ValueSpacingsNotUnseen: [],

	_ValueLanguages: 'speechSynthesis' in window ? speechSynthesis.getVoices().map(function (e) {
		return e.lang
	}).filter(function (e, i, coll) {
		return coll.indexOf(e) === i;
	}).sort() : [],

	// INTERFACE

	InterfaceFormDidUpdate () {
		// if (!KOMReviewDetailDeck.KOMDeckFrontLanguageCode && KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled) {
		// 	KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled = false;
		// 	delete KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled;
		// }

		// if (!KOMReviewDetailDeck.KOMDeckRearLanguageCode && KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled) {
		// 	KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled = false;
		// 	delete KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled;
		// }

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

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Escape () {
				KOMReviewDetailDispatchBack()
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
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

	// REACT

	ReactObject (inputData) {
		const items = KOMReviewLogic.KOMReviewSpacingsToday(inputData.$KOMDeckSpacings).filter(function (e) {
			if (inputData.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e)) {
				return false;
			}

			return true;
		});

		mod._ValueSpacingsToday = items;
		mod._ValueSpacingsReviewing = items.filter(function (e) {
			return !KOMSpacingModel.KOMSpacingModelIsUnseen(e);
		});
		mod._ValueSpacingsUnseen = items.filter(KOMSpacingModel.KOMSpacingModelIsUnseen);
		mod._ValueSpacingsStudied = inputData.$KOMDeckSpacings.filter(function (e) {
			if (!e.KOMSpacingChronicles.length) {
				return false;
			}
			
			return KOMPlayLogic.KOMPlayDayGrouping(e.KOMSpacingChronicles.slice(-1).pop().KOMChronicleResponseDate) === KOMPlayLogic.KOMPlayDayGrouping(new Date());
		});
		mod._ValueSpacingsNotUnseen = inputData.$KOMDeckSpacings.filter(function (e) {
			return e.KOMSpacingChronicles.length;
		});
	},

	ReactDirection () {
		mod.ReactObject(KOMReviewDetailDeck);
	},

};

$: mod.ReactDirection(KOMReviewDetailDeck.KOMDeckIsForwardOnly);

import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import KOMReviewDetailLanguageCode from '../KOMReviewDetailLanguageCode/main.svelte';
import KOMReviewToday from '../KOMReviewToday/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="KOMReviewDetail">

<header class="KOMReviewDetailToolbar OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<button class="KOMReviewDetailToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('KOMReviewDetailToolbarBackButtonText') } on:click={ KOMReviewDetailDispatchBack }>
			<div class="KOMReviewDetailToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<strong class="KOMReviewDetailToolbarTitle">{ KOMReviewDetailDeck.KOMDeckName }</strong>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="KOMReviewDetailToolbarCardsButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBrowse } accesskey="c">{ OLSKLocalized('KOMReviewDetailToolbarCardsButtonText') }</button>
	</div>
</header>

<div class="KOMReviewDetailBody">

<h1 class="KOMReviewDetailStudyHeading">{ OLSKLocalized('KOMReviewDetailGameOptionsHeadingText') }</h1>

<div class="KOMReviewDetailForm">
	<p>
		<label>
			<input class="KOMReviewDetailFormAudioIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckAudioIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormAudioIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormAudioIsEnabledFieldLabelText') }</span>
		</label>
	</p>
	<p>
		<label>
			<input class="KOMReviewDetailFormFrontSpeechIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckFrontSpeechIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormFrontSpeechIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormFrontSpeechIsEnabledFieldLabelText') }</span>
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
			<input class="KOMReviewDetailFormRearSpeechIsEnabledField" type="checkbox" bind:checked={ KOMReviewDetailDeck.KOMDeckRearSpeechIsEnabled } on:input={ mod.InterfaceFormDidUpdate } />
			<span class="KOMReviewDetailFormRearSpeechIsEnabledFieldLabel">{ OLSKLocalized('KOMReviewDetailFormRearSpeechIsEnabledFieldLabelText') }</span>
		</label>

		<span class="KOMReviewDetailFormRearLanguageCode">
			<KOMReviewDetailLanguageCode
				KOMReviewDetailLanguageCodeItem={ KOMReviewDetailDeck }
				KOMReviewDetailLanguageCodeItemProperty={ 'KOMDeckRearLanguageCode' }
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
		{#if KOMReviewDetailPlaySingle }
			<p>
				<button class="KOMReviewDetailPlayButtonSingle" on:click={ mod.InterfaceMixedButtonDidClick } accesskey="g">{ OLSKLocalized('KOMReviewDetailPlayButtonSingleText') }</button>
			</p>
		{/if}
		
		{#if !KOMReviewDetailPlaySingle && mod._ValueSpacingsReviewing.length }
			<p>
				<button class="KOMReviewDetailPlayButtonReviewing" on:click={ mod.InterfaceReviewingButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonReviewingText') }</button>
			</p>
		{/if}
		
		{#if !KOMReviewDetailPlaySingle && mod._ValueSpacingsUnseen.length }
			<p>
				<button class="KOMReviewDetailPlayButtonUnseen" on:click={ mod.InterfaceUnseenButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonUnseenText') }</button>
			</p>
		{/if}
		
		{#if !KOMReviewDetailPlaySingle && mod._ValueSpacingsReviewing.length && mod._ValueSpacingsUnseen.length }
			<p>
				<button class="KOMReviewDetailPlayButtonMixed" on:click={ mod.InterfaceMixedButtonDidClick }>{ OLSKLocalized('KOMReviewDetailPlayButtonMixedText') }</button>
			</p>
		{/if}
	</div>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && !mod._ValueSpacingsToday.length}
	<p class="KOMReviewDetailNoSpacings">{ OLSKLocalized('KOMReviewDetailNoSpacingsText') }</p>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length }
	<hr>

	<div class="KOMReviewDetailToday">
		<h1 class="KOMReviewDetailTodayHeading">{ OLSKLocalized('KOMReviewDetailTodayHeadingText') }</h1>

		{#if !mod._ValueSpacingsStudied.length }
			<p class="KOMReviewDetailTodayUnavailable">{ OLSKLocalized('KOMReviewDetailTodayUnavailableText') }</p>
		{/if}

		{#if mod._ValueSpacingsStudied.length }
			<KOMReviewToday KOMReviewTodaySpacings={ mod._ValueSpacingsStudied } />
		{/if}
	</div>
{/if}

{#if KOMReviewDetailDeck.$KOMDeckSpacings.length && mod._ValueSpacingsNotUnseen.length }
	<hr>

	<div class="KOMReviewDetailGeneral">
		<h1 class="KOMReviewDetailGeneralHeading">{ OLSKLocalized('KOMReviewDetailGeneralHeadingText') }</h1>
	</div>
{/if}

<hr>

<h1 class="KOMReviewDetailDeckHeading">{ OLSKLocalized('KOMReviewDetailDeckHeadingText') }</h1>

<p>
	<button class="KOMReviewDetailRenameButton" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailRenameButtonText') }</button>
</p>

<hr>

<p>
	<button class="KOMReviewDetailDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => (window.prompt(OLSKLocalized('KOMReviewDetailDiscardPromptText')) === KOMReviewDetailDeck.KOMDeckName) && KOMReviewDetailDispatchDiscard(KOMReviewDetailDeck) }>{ OLSKLocalized('KOMReviewDetailDiscardButtonText') }</button>
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

.KOMReviewDetailDiscardButton {
	padding: 5px;

	border: 1px solid #800002;
	border-radius: 3px;
	background: #ffefef;
	color: #800002;
}
</style>
