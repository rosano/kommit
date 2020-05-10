<script>
export let KOMPlaySpacings;
export let KOMPlayDispatchBack;
export let KOMPlayDispatchDone;
export let KOMPlayDispatchRespond;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import KOMPlayLogic from './ui-logic.js';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const mod = {

	// VALUE

	_ValueIsFlipped: false,
	_ValueState: {
		KOMPlayStateCurrent: KOMPlaySpacings[0],
		KOMPlayStateQueue: KOMPlaySpacings.slice(1),
		KOMPlayStateWait: [],
	},

	// INTERFACE

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Space () {
				mod.ControlFlip();
			},
			Digit1 () {
				mod._ValueIsFlipped && mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeAgain());
			},
			Digit2 () {
				mod._ValueIsFlipped && mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeHard());
			},
			Digit3 () {
				mod._ValueIsFlipped && mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeGood());
			},
			Digit4 () {
				mod._ValueIsFlipped && mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeEasy());
			},
		};

		handlerFunctions[event.code] && handlerFunctions[event.code]();
	},

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
		mod._ValueIsFlipped = !mod._ValueIsFlipped;

		if (!mod._ValueIsFlipped) {
			mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeGood());
		}
	},

	ControlRespond (inputData) {
		const item = mod._ValueState.KOMPlayStateCurrent;

		KOMPlayLogic.KOMPlayRespond(mod._ValueState, {
			KOMPlayResponseType: inputData,
			KOMPlayResponseDate: new Date(),
		});

		mod._ValueState = mod._ValueState; // #purge-svelte-force-update

		mod._ValueIsFlipped = false;

		KOMPlayDispatchRespond(item);
	},

};

import OLSKViewportContent from 'OLSKViewportContent';
import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="KOMPlay">

<header class="KOMPlayToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMPlayToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchBack }>{ OLSKLocalized('KOMPlayToolbarBackButtonText') }</button>
			<button class="KOMPlayToolbarDoneButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchDone }>{ OLSKLocalized('KOMPlayToolbarDoneButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMPlayBody">

{#if mod._ValueState.KOMPlayStateCurrent }
	<div class="KOMPlayCard" on:click={ mod.InterfaceCardDidClick }>

		{#if !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) || mod._ValueIsFlipped}
			<div class="KOMPlayCardQuestion">{ mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardQuestion }</div>
		{/if}

		{#if KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) || mod._ValueIsFlipped}
			<div class="KOMPlayCardAnswer">{ mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardAnswer }</div>
		{/if}

		{#if mod._ValueIsFlipped}
			<div class="KOMPlayCardHint">{ mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardHint }</div>
		{/if}
		
	</div>
	
	{#if !mod._ValueIsFlipped}
		<button class="KOMPlayFlipButton OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceFlipButtonDidClick }>{ OLSKLocalized('KOMPlayFlipButtonText') }</button>
	{/if}

	{#if mod._ValueIsFlipped}
		<button class="KOMPlayResponseButtonAgain OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceResponseButtonDidClickAgain }>{ OLSKLocalized('KOMPlayResponseButtonAgainText') }</button>

		<div class="KOMPlayResponseCorrect">
			<button class="KOMPlayResponseButtonHard OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceResponseButtonDidClickHard }>{ OLSKLocalized('KOMPlayResponseButtonHardText') }</button>

			<button class="KOMPlayResponseButtonGood OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceResponseButtonDidClickGood }>{ OLSKLocalized('KOMPlayResponseButtonGoodText') }</button>

			<button class="KOMPlayResponseButtonEasy OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceResponseButtonDidClickEasy }>{ OLSKLocalized('KOMPlayResponseButtonEasyText') }</button>
		</div>
	{/if}

	{#if OLSK_TESTING_BEHAVIOUR()}
		<div id="TestKOMPlayStateQueueCount">{ mod._ValueState.KOMPlayStateQueue.length }</div>
		<div id="TestKOMPlayStateWaitCount">{ mod._ValueState.KOMPlayStateWait.length }</div>
	{/if}	
{/if}

{#if !mod._ValueState.KOMPlayStateCurrent}
	<div class="KOMPlayConclusion">{ OLSKLocalized('KOMPlayConclusionText') }</div>
{/if}

</div>
	
</div>

<style src="./ui-style.css"></style>
