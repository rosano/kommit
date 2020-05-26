<script>
export let KOMReviewDetailAudioAvailable;
export let KOMReviewDetailAudioItem;
export let KOMReviewDetailAudioItemProperty;
export let KOMReviewDetailAudioDispatchUpdate;
export let KOMReviewDetailAudioDispatchClear;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import record from 'vmsg';

const mod = {

	// VALUE

	_ValueAudio: KOMReviewDetailAudioItem[KOMReviewDetailAudioItemProperty],

	_ValueIsAvailable: 'WebAssembly' in window,

	_ValueIsRecording: false,

	_ValueIsPlaying: false,

	// INTERFACE

	InterfaceRecordButtonDidTouchDown () {
		mod.ControlRecordStart();
	},

	InterfaceRecordButtonDidTouchUp () {
		mod.ControlRecordStop();
	},

	InterfacePlaybackButtonDidClick () {
		!mod._ValueIsPlaying ? mod.ControlPlaybackStart() : mod.ControlPlaybackStop();
	},

	// CONTROL

	async ControlRecordStart () {
		if (mod._ValueIsRecording) {
		  await mod.ControlRecordStop();
		}
		
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('record');
		}

		if (!mod._ValueIsAvailable) {
			return;
		}

		try {
		  await mod._ValueRecorder.initAudio();
		  await mod._ValueRecorder.initWorker();

		  mod._ValueRecorder.startRecording();

		  mod._ValueIsRecording = true;
		} catch (e) {
		  console.error(e);
		}
	},

	async ControlRecordStop () {
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
		}

		if (!mod._ValueIsRecording) {
			return;
		}

		if (mod._ValueIsAvailable) {
			const blob = await mod._ValueRecorder.stopRecording();
			mod._ValueIsRecording = false;
		}

		KOMReviewDetailAudioItem[KOMReviewDetailAudioItemProperty] = 'bravo';

		KOMReviewDetailAudioDispatchUpdate(KOMReviewDetailAudioItem);
	},

	ControlPlaybackStart () {
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('play');
		}

		mod._ValueIsPlaying = true;
	},

	ControlPlaybackStop () {
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
		}

		mod._ValueIsPlaying = false;
	},

	// SETUP

	SetupEverything() {
		mod.SetupRecorder();
	},

	SetupRecorder() {
		if (!KOMReviewDetailAudioAvailable) {
			return;
		}

		mod._ValueRecorder = new record.Recorder({
		  wasmURL: '/_shared/__external/vmsg/vmsg.wasm',
		});
	},

	// DEBUG

	DebugLog (inputData) {
		window.TestKOMReviewDetailAudioLog.innerHTML = window.TestKOMReviewDetailAudioLog.innerHTML ? window.TestKOMReviewDetailAudioLog.innerHTML.split(',').concat(inputData).join(',') : inputData;
	},

};

mod.SetupEverything();
</script>

<div class="KOMReviewDetailAudio">

{#if KOMReviewDetailAudioAvailable }

	{#if !mod._ValueAudio }
		<button class="KOMReviewDetailAudioRecordButton" on:mousedown={ mod.InterfaceRecordButtonDidTouchDown } on:mouseup={ mod.InterfaceRecordButtonDidTouchUp }>{ OLSKLocalized('KOMReviewDetailAudioRecordButtonText') }</button>
	{/if}

	{#if mod._ValueAudio }
		<button class="KOMReviewDetailAudioPlaybackButton" on:click={ mod.InterfacePlaybackButtonDidClick }>{ OLSKLocalized('KOMReviewDetailAudioPlaybackButtonText') }</button>

		<button class="KOMReviewDetailAudioClearButton" on:click={ () => KOMReviewDetailAudioDispatchClear(KOMReviewDetailAudioItem) }>{ OLSKLocalized('KOMReviewDetailAudioClearButtonText') }</button>
	{/if}

{/if}

{#if !KOMReviewDetailAudioAvailable }
	<span class="KOMReviewDetailAudioNotAvailableAlert">{ OLSKLocalized('KOMReviewDetailAudioNotAvailableAlertText') }</span>
{/if}

</div>
