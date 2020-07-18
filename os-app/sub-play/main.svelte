<script>
export let KOMPlaySpacings;
export let KOMPlayDeck;
export let KOMPlayDispatchDone;
export let KOMPlayDispatchUpdate;
export let KOMPlayDispatchFetch;

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
		KOMPlayStateShouldRandomize: true,
	},

	_ValueHistory: [],

	_ValueSpeechAvailable: 'speechSynthesis' in window,

	_ValueAudioCache: {},
	_ValueAudioPlaying: undefined,

	// DATA

	DataQuestion () {
		return mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard[KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? 'KOMCardRearText' : 'KOMCardFrontText'];
	},

	DataAnswer () {
		return mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard[!KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? 'KOMCardRearText' : 'KOMCardFrontText'];
	},

	DataQuestionShouldSound () {
		return mod._DataQuestionFrontShouldSound() || mod._DataQuestionRearShouldSound();
	},

	_DataQuestionFrontShouldSound () {
		if (KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return false;
		}

		if (mod.DataFrontHasAudio()) {
			return true;
		}

		return KOMPlayDeck.KOMDeckFrontSpeechIsEnabled;
	},

	_DataQuestionRearShouldSound () {
		if (!KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return false;
		}

		if (mod.DataRearHasAudio()) {
			return true;
		}

		return KOMPlayDeck.KOMDeckRearSpeechIsEnabled;
	},

	DataAnswerShouldSound () {
		return mod._DataAnswerFrontShouldSound() || mod._DataAnswerRearShouldSound();
	},

	_DataAnswerFrontShouldSound () {
		if (!KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return false;
		}

		if (mod.DataFrontHasAudio()) {
			return true;
		}

		return KOMPlayDeck.KOMDeckFrontSpeechIsEnabled;
	},

	_DataAnswerRearShouldSound () {
		if (KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return false;
		}

		if (mod.DataRearHasAudio()) {
			return true;
		}

		return KOMPlayDeck.KOMDeckRearSpeechIsEnabled;
	},

	DataFrontHasAudio() {
		return KOMPlayDeck.KOMDeckAudioIsEnabled && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardFrontAudio;
	},

	DataRearHasAudio() {
		return KOMPlayDeck.KOMDeckAudioIsEnabled && mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardRearAudio;
	},

	DataFakeAudio (inputData) {
		return {
			play () {},
			pause () {},
			src: inputData,
		};
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

		if (mod.DataQuestionShouldSound()) {
			mod.ControlQuestionRead();
		}
	},

	ControlQuestionRead () {
		if (mod.DataFrontHasAudio() && !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return mod.ControlAudioStart('KOMCardFrontAudio');
		}
		
		if (mod.DataRearHasAudio() && KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return mod.ControlAudioStart('KOMCardRearAudio');
		}
		
		mod.ControlReadStart(mod.DataQuestion(), !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? KOMPlayDeck.KOMDeckFrontLanguageCode : KOMPlayDeck.KOMDeckRearLanguageCode);
	},

	ControlAnswerRead () {
		if (mod.DataFrontHasAudio() && KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return mod.ControlAudioStart('KOMCardFrontAudio');
		}
		
		if (mod.DataRearHasAudio() && !KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent)) {
			return mod.ControlAudioStart('KOMCardRearAudio');
		}
		
		mod.ControlReadStart(mod.DataAnswer(), KOMSpacingModel.KOMSpacingModelIsBackward(mod._ValueState.KOMPlayStateCurrent) ? KOMPlayDeck.KOMDeckFrontLanguageCode : KOMPlayDeck.KOMDeckRearLanguageCode);
	},

	ControlReadStart (param1, param2) {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugAudioLog(`read:${ param2 }:${ param1 }`);
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
			mod.DebugAudioLog(mod._ValueAudioPlaying ? 'stop:audio' : 'stop');
		}

		if (mod._ValueAudioIsPlaying) {
			for (let key in mod._ValueAudioCache) {
				mod._ValueAudioCache[key].pause();
			}

			delete mod._ValueAudioPlaying;
		};

		if (!mod._ValueSpeechAvailable) {
			return;
		}

		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}
	},

	async ControlAudioStart (inputData) {
		if (!mod._ValueAudioCache[inputData] && OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugAudioLog('fetch');

			mod._ValueAudioCache[inputData] = mod.DataFakeAudio(await KOMPlayDispatchFetch(inputData, mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard));
		}

		if (!mod._ValueAudioCache[inputData]) {
			(mod._ValueAudioCache[inputData] = new Audio()).src = URL.createObjectURL(await KOMPlayDispatchFetch(inputData, mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard));
		}

		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugAudioLog('play:' + inputData);
		}

		mod._ValueAudioCache[inputData].currentTime = 0;
		mod._ValueAudioCache[inputData].play();

		mod._ValueAudioPlaying = true;
	},

	ControlFlush() {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugAudioLog('flush');
		}

		mod._ValueAudioCache = {};
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

		if (mod.DataFrontHasAudio() || mod.DataRearHasAudio()) {
			mod.ControlFlush();
		}

		mod.ControlDraw();
	},

	ControlFlip () {
		mod._ValueIsFlipped = true;

		Object.assign(mod._ValueChronicle, KOMPlayLogic.KOMChronicleGenerateFlip(new Date(), mod._ValueState.KOMPlayStateCurrent))

		mod._ValueState.KOMPlayStateCurrent.KOMSpacingFlipDate = mod._ValueChronicle.KOMChronicleFlipDate;
		KOMPlayDispatchUpdate(mod._ValueState.KOMPlayStateCurrent);

		if (mod.DataQuestionShouldSound()) {
			mod.ControlReadStop();
		}

		if (mod.DataAnswerShouldSound()) {
			mod.ControlAnswerRead();
		}
	},

	ControlRespond (inputData) {
		if (mod.DataAnswerShouldSound()) {
			mod.ControlReadStop();
		}

		if (mod.DataFrontHasAudio() || mod.DataRearHasAudio()) {
			mod.ControlFlush();
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

	DebugAudioLog (inputData) {
		window.TestKOMPlayAudioLog.innerHTML = window.TestKOMPlayAudioLog.innerHTML ? window.TestKOMPlayAudioLog.innerHTML.split(',').concat(inputData).join(',') : inputData;
	},

	// SETUP

	SetupEverything () {
		mod.ControlDraw();
	},

	SetupChronicle () {
		mod._ValueChronicle = KOMPlayLogic.KOMChronicleGenerateDraw(new Date(), mod._ValueState.KOMPlayStateCurrent);

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
	<div class="KOMPlayCard OLSKLayoutElementTappable" on:click={ mod.InterfaceCardDidClick }>

		<div class="KOMPlayCardQuestion">{ mod.DataQuestion() }</div>

		{#if mod._ValueIsFlipped}
			<div class="KOMPlayCardAnswer">{ mod.DataAnswer() }</div>
		{/if}

		{#if mod._ValueIsFlipped}
			<div class="KOMPlayCardNotes">{ mod._ValueState.KOMPlayStateCurrent.$KOMSpacingCard.KOMCardNotes }</div>
		{/if}
		
	</div>
	
	{#if mod.DataQuestionShouldSound() || (mod._ValueIsFlipped && mod.DataAnswerShouldSound()) }
		<div class="KOMPlayHear">
			{#if mod.DataQuestionShouldSound()}
				<button class="KOMPlayHearQuestionButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceHearQuestionButtonDidClick }>{ OLSKLocalized('KOMPlayHearQuestionButtonText') }</button>
			{/if}

			{#if mod._ValueIsFlipped && mod.DataAnswerShouldSound() }
				<button class="KOMPlayHearAnswerButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceHearAnswerButtonDidClick }>{ OLSKLocalized('KOMPlayHearAnswerButtonText') }</button>
			{/if}
		</div>
	{/if}

	{#if !mod._ValueIsFlipped}
		<button class="KOMPlayFlipButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceFlipButtonDidClick }>{ OLSKLocalized('KOMPlayFlipButtonText') }</button>
	{/if}

	{#if mod._ValueIsFlipped}
		<button class="KOMPlayResponseButtonAgain OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceResponseButtonDidClickAgain }>{ OLSKLocalized('KOMPlayResponseButtonAgainText') }</button>

		<div class="KOMPlayResponseCorrect">
			<button class="KOMPlayResponseButtonHard OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceResponseButtonDidClickHard }>{ OLSKLocalized('KOMPlayResponseButtonHardText') }</button>

			<button class="KOMPlayResponseButtonGood OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceResponseButtonDidClickGood }>{ OLSKLocalized('KOMPlayResponseButtonGoodText') }</button>

			<button class="KOMPlayResponseButtonEasy OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceResponseButtonDidClickEasy }>{ OLSKLocalized('KOMPlayResponseButtonEasyText') }</button>
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
