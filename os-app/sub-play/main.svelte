<script>
export let KOMPlaySpacings;
export let KOMPlayCards;
export let KOMPlayDispatchBack;
export let KOMPlayDispatchDone;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import KOMPlayLogic from './ui-logic.js';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const mod = {

	// VALUE

	_ValueAnswerVisible: false,
	_ValueState: {
		KOMPlayStateCurrent: KOMPlaySpacings[0],
		KOMPlayStateQueue: KOMPlaySpacings.slice(1),
		KOMPlayStateWait: [],
	},

	// DATA

	DataCardFor (inputData) {
		return KOMPlayCards.filter(function (e) {
			return KOMSpacingModel.KOMSpacingModelIdentifier(inputData.KOMSpacingID) === e.KOMCardID;
		}).pop();
	},

	// INTERFACE

	InterfaceCardDidClick () {
		mod.ControlFlip();
	},

	InterfaceFlipButtonDidClick () {
		mod.ControlFlip();
	},

	InterfaceResponseButtonDidClickAgain () {
		mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeAgain());
	},

	InterfaceResponseButtonDidClickHard () {
		mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeHard());
	},

	InterfaceResponseButtonDidClickGood () {
		mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeGood());
	},

	InterfaceResponseButtonDidClickEasy () {
		mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeEasy());
	},

	// CONTROL

	ControlFlip () {
		mod._ValueAnswerVisible = !mod._ValueAnswerVisible;

		if (!mod._ValueAnswerVisible) {
			mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeGood());
		}
	},

	ControlRespond (inputData) {
		KOMPlayLogic.KOMPlayRespond(mod._ValueState, {
			KOMPlayResponseType: inputData,
			KOMPlayResponseDate: new Date(),
		});

		mod._ValueState = mod._ValueState; // #purge-svelte-force-update

		mod._ValueAnswerVisible = false;
	},

};

import OLSKViewportContent from 'OLSKViewportContent';
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="KOMPlay OLSKViewport">

<OLSKViewportContent>

<header class="KOMPlayToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMPlayToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchBack }>{ OLSKLocalized('KOMPlayToolbarBackButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMPlayToolbarDoneButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchDone }>{ OLSKLocalized('KOMPlayToolbarDoneButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

{#if mod._ValueState.KOMPlayStateCurrent }
	<div class="KOMPlayCard" on:click={ mod.InterfaceCardDidClick }>

		<div class="KOMPlayCardQuestion">{ mod.DataCardFor(mod._ValueState.KOMPlayStateCurrent).KOMCardQuestion }</div>

		{#if mod._ValueAnswerVisible}
			<div class="KOMPlayCardAnswer">{ mod.DataCardFor(mod._ValueState.KOMPlayStateCurrent).KOMCardAnswer }</div>
			<div class="KOMPlayCardHint">{ mod.DataCardFor(mod._ValueState.KOMPlayStateCurrent).KOMCardHint }</div>
		{/if}
		
	</div>
	
	{#if !mod._ValueAnswerVisible}
		<button class="KOMPlayFlipButton" on:click={ mod.InterfaceFlipButtonDidClick }>{ OLSKLocalized('KOMPlayFlipButtonText') }</button>
	{/if}

	{#if mod._ValueAnswerVisible}
		<button class="KOMPlayResponseButtonAgain" on:click={ mod.InterfaceResponseButtonDidClickAgain }>{ OLSKLocalized('KOMPlayResponseButtonAgainText') }</button>

		<button class="KOMPlayResponseButtonHard" on:click={ mod.InterfaceResponseButtonDidClickHard }>{ OLSKLocalized('KOMPlayResponseButtonHardText') }</button>

		<button class="KOMPlayResponseButtonGood" on:click={ mod.InterfaceResponseButtonDidClickGood }>{ OLSKLocalized('KOMPlayResponseButtonGoodText') }</button>

		<button class="KOMPlayResponseButtonEasy" on:click={ mod.InterfaceResponseButtonDidClickEasy }>{ OLSKLocalized('KOMPlayResponseButtonEasyText') }</button>
	{/if}

	{#if OLSK_TESTING_BEHAVIOUR}
		<div id="TestKOMPlayStateQueueCount">{ mod._ValueState.KOMPlayStateQueue.length }</div>
		<div id="TestKOMPlayStateWaitCount">{ mod._ValueState.KOMPlayStateWait.length }</div>
	{/if}	
{/if}

{#if !mod._ValueState.KOMPlayStateCurrent}
	<div class="KOMPlayConclusion">{ OLSKLocalized('KOMPlayConclusionText') }</div>
{/if}
	
</OLSKViewportContent>

</div>
