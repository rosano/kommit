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

	_ValueAudioFront: undefined,
	_ValueAudioRear: undefined,

	// DATA

	DataQuestion () {
		return mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard[KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? 'KOMCardRear' : 'KOMCardFront'];
	},

	DataAnswer () {
		return mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard[!KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? 'KOMCardRear' : 'KOMCardFront'];
	},

	DataQuestionFrontShouldSound () {
		if (KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return false;
		}

		if (KOMPlayDeck.KOMDeckAudioIsEnabled && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardFrontAudio) {
			return true;
		}

		return KOMPlayDeck.KOMDeckFrontIsOral && !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent);
	},

	DataQuestionRearShouldSound () {
		return KOMPlayDeck.KOMDeckRearIsOral && KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent);
	},

	DataAnswerFrontShouldSound () {
		if (!KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return false;
		}

		if (KOMPlayDeck.KOMDeckAudioIsEnabled && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardFrontAudio) {
			return true;
		}

		return KOMPlayDeck.KOMDeckFrontIsOral;
	},

	DataAnswerRearShouldSound () {
		return KOMPlayDeck.KOMDeckRearIsOral && !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent);
	},

	// INTERFACE

	InterfaceUndoButtonDidClick () {
		mod.ControlUndo();
	},

	InterfaceHearQuestionButtonDidClick () {
		mod.ControlQuestionRead();
	},

	InterfaceHearAnswerButtonDidClick () {
		mod.ControlAnswerRead();
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

		if (mod.DataQuestionFrontShouldSound() || mod.DataQuestionRearShouldSound()) {
			mod.ControlQuestionRead();
		}
	},

	ControlQuestionRead () {
		if (KOMPlayDeck.KOMDeckAudioIsEnabled && !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardFrontAudio) {
			return mod.ControlAudioStart();
		}
		
		mod.ControlReadStart(mod.DataQuestion(), !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? KOMPlayDeck.KOMDeckFrontLanguageCode : KOMPlayDeck.KOMDeckRearLanguageCode);
	},

	ControlAnswerRead () {
		if (KOMPlayDeck.KOMDeckAudioIsEnabled && KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardFrontAudio) {
			return mod.ControlAudioStart();
		}
		
		mod.ControlReadStart(mod.DataAnswer(), KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? KOMPlayDeck.KOMDeckFrontLanguageCode : KOMPlayDeck.KOMDeckRearLanguageCode);
	},

	ControlReadStart (param1, param2) {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugOralLog(`read:${ param2 }:${ param1 }`);
		}

		if (!mod._ValueSpeechAvailable) {
			return;
		}

		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}

		const item = new SpeechSynthesisUtterance(param1);
		item.lang = param2;
		item.voice = speechSynthesis.getVoices().filter(function (e) {
			return e.lang == item.lang;
		}).pop();

		speechSynthesis.speak(item);
	},

	ControlReadStop () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugOralLog('stop');
		}

		if (!mod._ValueSpeechAvailable) {
			return;
		}

		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}
	},

	ControlAudioStart (param1, param2) {
		if (OLSK_TESTING_BEHAVIOUR() && !mod._ValueAudioFront) {
			mod.DebugOralLog('fetch');

			mod._ValueAudioFront = true;
		}

		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugOralLog('play:audio');
		}

		// if (!mod._ValueSpeechAvailable) {
		// 	return;
		// }

		// if (speechSynthesis.speaking) {
		// 	speechSynthesis.cancel();
		// }

		// const item = new SpeechSynthesisUtterance(param1);
		// item.lang = param2;
		// item.voice = speechSynthesis.getVoices().filter(function (e) {
		// 	return e.lang == item.lang;
		// }).pop();

		// speechSynthesis.speak(item);
	},

	ControlAudioStop () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugOralLog('stop:audio');
		}

		// if (!mod._ValueSpeechAvailable) {
		// 	return;
		// }

		// if (speechSynthesis.speaking) {
		// 	speechSynthesis.cancel();
		// }
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

		if (mod.DataQuestionFrontShouldSound()) {
			if (KOMPlayDeck.KOMDeckAudioIsEnabled && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardFrontAudio) {
				mod.ControlAudioStop();
			} else {
				mod.ControlReadStop();
			}
		}

		if (mod.DataAnswerFrontShouldSound() || mod.DataAnswerRearShouldSound()) {
			mod.ControlAnswerRead();
		}
	},

	ControlRespond (inputData) {
		if (mod.DataAnswerFrontShouldSound() || mod.DataAnswerRearShouldSound()) {
			mod.ControlReadStop();
		}

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

	DebugOralLog (inputData) {
		window.TestKOMPlayOralLog.innerHTML = window.TestKOMPlayOralLog.innerHTML ? window.TestKOMPlayOralLog.innerHTML.split(',').concat(inputData).join(',') : inputData;
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
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="KOMPlay">

<header class="KOMPlayToolbar OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="KOMPlayToolbarUndoButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" disabled={ mod._ValueHistory.length ? null : true } on:click={ mod.InterfaceUndoButtonDidClick }>{ OLSKLocalized('KOMPlayToolbarUndoButtonText') }</button>
		<button class="KOMPlayToolbarDoneButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMPlayDispatchDone }>{ OLSKLocalized('KOMPlayToolbarDoneButtonText') }</button>
	</div>
</header>

<div class="KOMPlayBody">

{#if mod._ValueState.KOMPlayStateCurrent }
	{#if mod.DataQuestionFrontShouldSound() || mod.DataQuestionRearShouldSound() || (mod._ValueIsFlipped && (mod.DataAnswerFrontShouldSound() || mod.DataAnswerRearShouldSound())) }
		<div class="KOMPlayHear">
			{#if mod.DataQuestionFrontShouldSound() || mod.DataQuestionRearShouldSound()}
				<button class="KOMPlayHearQuestionButton OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceHearQuestionButtonDidClick } tabindex="-1">{ OLSKLocalized('KOMPlayHearQuestionButtonText') }</button>
			{/if}

			{#if mod._ValueIsFlipped && (mod.DataAnswerFrontShouldSound() || mod.DataAnswerRearShouldSound()) }
				<button class="KOMPlayHearAnswerButton OLSKLayoutButtonNoStyle" on:click={ mod.InterfaceHearAnswerButtonDidClick } tabindex="-1">{ OLSKLocalized('KOMPlayHearAnswerButtonText') }</button>
			{/if}
		</div>
	{/if}

	<div class="KOMPlayCard OLSKLayoutElementTappable" on:click={ mod.InterfaceCardDidClick }>

		<div class="KOMPlayCardQuestion">{ mod.DataQuestion() }</div>

		{#if mod._ValueIsFlipped}
			<div class="KOMPlayCardAnswer">{ mod.DataAnswer() }</div>
		{/if}

		{#if mod._ValueIsFlipped}
			<div class="KOMPlayCardNotes">{ mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardNotes }</div>
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
