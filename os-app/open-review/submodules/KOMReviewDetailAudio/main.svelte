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

	_ValueSkipRecording: OLSK_TESTING_BEHAVIOUR(),

	_ValueIsRecording: false,

	_ValueIsPlaying: false,

	// INTERFACE

	InterfaceRecordButtonDidClick () {
		!mod._ValueIsRecording ? mod.ControlRecordStart() : mod.ControlRecordStop();
	},

	InterfacePlaybackButtonDidClick () {
		!mod._ValueIsPlaying ? mod.ControlPlaybackStart() : mod.ControlPlaybackStop();
	},

	// CONTROL

	async ControlRecordStart () {
		if (mod._ValueIsRecording) {
		  await mod.ControlRecordStop();
		}
		
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('record');
		}

		mod._ValueIsRecording = true;

		if (mod._ValueSkipRecording) {
			return;
		}

		try {
		  await mod._ValueRecorder.initAudio();
		  await mod._ValueRecorder.initWorker();

		  mod._ValueRecorder.startRecording();

		} catch (e) {
		  console.error(e);
		}
	},

	async ControlRecordStop () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
		}

		if (!mod._ValueIsRecording) {
			return;
		}

		if (!mod._ValueSkipRecording) {
			const blob = await mod._ValueRecorder.stopRecording();
		}

		mod._ValueIsRecording = false;

		KOMReviewDetailAudioItem[KOMReviewDetailAudioItemProperty] = 'bravo';

		KOMReviewDetailAudioDispatchUpdate(KOMReviewDetailAudioItem);
	},

	ControlPlaybackStart () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('play');
		}

		mod._ValueIsPlaying = true;
	},

	ControlPlaybackStop () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
		}

		mod._ValueIsPlaying = false;
	},

	// SETUP

	SetupEverything() {
		mod.SetupRecorder();
	},

	SetupRecorder() {
		if (mod._ValueSkipRecording) {
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
		<button class="KOMReviewDetailAudioRecordButton" on:click={ mod.InterfaceRecordButtonDidClick }>{ OLSKLocalized('KOMReviewDetailAudioRecordButtonText') }</button>
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
