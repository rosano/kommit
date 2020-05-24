<script>
export let KOMPlaySpacings;
export let KOMPlayDeck;
export let KOMPlayDispatchDone;
export let KOMPlayDispatchUpdate;

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

	_ValueHistory: [],

	_ValueSpeechAvailable: 'speechSynthesis' in window,

	// DATA

	DataQuestion () {
		return mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard[KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? 'KOMCardRear' : 'KOMCardFront'];
	},

	// INTERFACE

	InterfaceUndoButtonDidClick () {
		mod.ControlUndo();
	},

	InterfaceQuestionRepeatButtonDidClick () {
		mod.ControlQuestionRead();
	},

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Space () {
				mod.ControlProgress();
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
		mod.ControlProgress();
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

	ControlDraw() {
		mod._ValueState = mod._ValueState; // #purge-svelte-force-update

		mod._ValueIsFlipped = false;

		mod.SetupChronicle();

		if (KOMPlayDeck.KOMDeckFrontIsOral) {
			mod.ControlQuestionRead();
		}
	},

	ControlQuestionRead () {
		mod.ControlReadStart(mod.DataQuestion());
	},

	ControlReadStart (inputData) {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugFrontLog('read:' + inputData);
		}

		if (!mod._ValueSpeechAvailable) {
			return;
		}

		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}

		const item = new SpeechSynthesisUtterance(inputData);
		item.lang = KOMPlayDeck.KOMDeckFrontLanguageCode;
		item.voice = speechSynthesis.getVoices().filter(function (e) {
			return e.lang == item.lang;
		}).pop();

		speechSynthesis.speak(item);
	},

	ControlReadStop () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugFrontLog('stop');
		}

		if (!mod._ValueSpeechAvailable) {
			return;
		}

		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}
	},

	ControlProgress() {
		if (mod._ValueIsFlipped) {
			return mod.ControlRespond(KOMPlayLogic.KOMPlayResponseTypeGood());
		}

		mod.ControlFlip();
	},

	ControlUndo () {
		mod._ValueState.KOMPlayStateQueue.unshift(mod._ValueState.KOMPlayStateCurrent);
		
		mod._ValueState.KOMPlayStateCurrent = KOMPlayLogic.KOMPlayUndo(mod._ValueHistory.pop());

		mod.ControlDraw();
	},

	ControlFlip () {
		mod._ValueIsFlipped = true;

		mod._ValueChronicle.KOMChronicleFlipDate = new Date();

		if (mod._ValueState.KOMPlayStateCurrent.KOMSpacingFlipDate && KOMPlayLogic.KOMPlayDayGrouping(mod._ValueChronicle.KOMChronicleFlipDate) === KOMPlayLogic.KOMPlayDayGrouping(mod._ValueState.KOMPlayStateCurrent.KOMSpacingFlipDate)) {
			mod._ValueChronicle.KOMChronicleDidFlipMultipleTimes = true;
		}

		mod._ValueState.KOMPlayStateCurrent.KOMSpacingFlipDate = mod._ValueChronicle.KOMChronicleFlipDate;
		KOMPlayDispatchUpdate(mod._ValueState.KOMPlayStateCurrent);

		if (KOMPlayDeck.KOMDeckFrontIsOral) {
			mod.ControlReadStop();
		}
	},

	ControlRespond (inputData) {
		const item = mod._ValueState.KOMPlayStateCurrent;

		KOMPlayLogic.KOMPlayRespond(mod._ValueState, Object.assign(mod._ValueChronicle, {
			KOMChronicleResponseDate: new Date(),
			KOMChronicleResponseType: inputData,
		}));

		KOMPlayDispatchUpdate(item);

		mod._ValueHistory.push(item);

		if (!mod._ValueState.KOMPlayStateCurrent) {
			return KOMPlayDispatchDone();
		}

		mod.ControlDraw();
	},

	// DEBUG

	DebugFrontLog (inputData) {
		window.TestKOMPlayOralFrontLog.innerHTML = window.TestKOMPlayOralFrontLog.innerHTML ? window.TestKOMPlayOralFrontLog.innerHTML.split(',').concat(inputData).join(',') : inputData;
	},

	// SETUP

	SetupEverything () {
		mod.ControlDraw();
	},

	SetupChronicle () {
		mod._ValueChronicle = {
			KOMChronicleDrawDate: new Date(),
		};

		if (mod._ValueState.KOMPlayStateCurrent.KOMSpacingDrawDate && KOMPlayLogic.KOMPlayDayGrouping(mod._ValueChronicle.KOMChronicleDrawDate) === KOMPlayLogic.KOMPlayDayGrouping(mod._ValueState.KOMPlayStateCurrent.KOMSpacingDrawDate)) {
			mod._ValueChronicle.KOMChronicleDidDrawMultipleTimes = true;
		}

		mod._ValueState.KOMPlayStateCurrent.KOMSpacingDrawDate = mod._ValueChronicle.KOMChronicleDrawDate;
		KOMPlayDispatchUpdate(mod._ValueState.KOMPlayStateCurrent);
	},

	// LIFECYCLE

	LifecycleModuleWillMount () {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
OLSK_TESTING_BEHAVIOUR() ? mod.LifecycleModuleWillMount() : onMount(mod.LifecycleModuleWillMount);

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
			<button class="KOMPlayToolbarUndoButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" disabled={ mod._ValueHistory.length ? null : true } on:click={ mod.InterfaceUndoButtonDidClick }>{ OLSKLocalized('KOMPlayToolbarUndoButtonText') }</button>
			<button class="KOMPlayToolbarDoneButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchDone }>{ OLSKLocalized('KOMPlayToolbarDoneButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMPlayBody">

{#if mod._ValueState.KOMPlayStateCurrent }
	{#if KOMPlayDeck.KOMDeckFrontIsOral}
		<button class="KOMPlayCardQuestionRepeatButton" on:click={ mod.InterfaceQuestionRepeatButtonDidClick } tabindex="-1">{ OLSKLocalized('KOMPlayCardQuestionRepeatButtonText') }</button>
	{/if}

	<div class="KOMPlayCard OLSKLayoutElementTappable" on:click={ mod.InterfaceCardDidClick }>

		<div class="KOMPlayCardQuestion">{ mod.DataQuestion() }</div>

		{#if mod._ValueIsFlipped}
			<div class="KOMPlayCardAnswer">{ mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard[KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? 'KOMCardFront' : 'KOMCardRear'] }</div>
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
		<div id="TestKOMSpacingDrawDate">{ mod._ValueState.KOMPlayStateCurrent.KOMSpacingDrawDate ? KOMPlayLogic.KOMPlayDayGrouping(mod._ValueState.KOMPlayStateCurrent.KOMSpacingDrawDate) : 'undefined' }</div>
		<div id="TestKOMChronicleDidDrawMultipleTimes">{ JSON.stringify(mod._ValueChronicle.KOMChronicleDidDrawMultipleTimes) }</div>
		<div id="TestKOMSpacingFlipDate">{ mod._ValueState.KOMPlayStateCurrent.KOMSpacingFlipDate ? KOMPlayLogic.KOMPlayDayGrouping(mod._ValueState.KOMPlayStateCurrent.KOMSpacingFlipDate) : 'undefined' }</div>
		<div id="TestKOMChronicleDidFlipMultipleTimes">{ JSON.stringify(mod._ValueChronicle.KOMChronicleDidFlipMultipleTimes) }</div>
	{/if}	
{/if}

</div>
	
</div>

<style src="./ui-style.css"></style>
