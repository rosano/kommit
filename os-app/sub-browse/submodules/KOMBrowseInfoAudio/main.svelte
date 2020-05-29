<script>
export let KOMBrowseInfoAudioAvailable;
export let KOMBrowseInfoAudioItem;
export let KOMBrowseInfoAudioItemProperty;
export let KOMBrowseInfoAudioDispatchCapture;
export let KOMBrowseInfoAudioDispatchFetch;
export let KOMBrowseInfoAudioDispatchClear;
export let DebugFakeChangeObject = null;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const kMaxLengthSeconds = 10;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import record from 'vmsg';

const mod = {

	// VALUE

	_ValueIsRecording: false,

	_ValueAudioID: undefined,
	_ValueAudio: undefined,
	_ValueAudioIsPlaying: false,

	// DATA

	DataFakeRecorder () {
		return {
			initAudio () {},
			initWorker () {},
			startRecording () {},
			stopRecording () {},
		};
	},

	DataFakeAudio (inputData) {
		return {
			play () {},
			pause () {},
			src: inputData,
		};
	},

	// INTERFACE

	InterfaceRecordButtonDidClick () {
		!mod._ValueIsRecording ? mod.ControlRecordStart() : mod.ControlRecordStop();
	},

	InterfacePlaybackButtonDidClick () {
		if (OLSK_TESTING_BEHAVIOUR() && DebugFakeChangeObject && mod._ValueAudioIsPlaying) {
			KOMBrowseInfoAudioItem = DebugFakeChangeObject;
		}

		mod.ControlSetAudio();

		!mod._ValueAudioIsPlaying ? mod.ControlPlaybackStart() : mod.ControlPlaybackStop();
	},

	InterfaceClearButtonDidClick () {
		mod.ControlAudioClear();

		KOMBrowseInfoAudioDispatchClear(KOMBrowseInfoAudioItemProperty);
	},

	// CONTROL

	async ControlRecordStart () {
		if (mod._ValueIsRecording) {
		  await mod.ControlRecordStop();
		}
		
		try {
		  await mod._ValueRecorder.initAudio();
		  await mod._ValueRecorder.initWorker();

		  if (OLSK_TESTING_BEHAVIOUR()) {
		  	mod.DebugLog('record');
		  }

		  await mod._ValueRecorder.startRecording();

		  mod._ValueIsRecording = true;

		  setTimeout(function () {
		  	mod._ValueIsRecording && mod.ControlRecordStop();
		  }, 1000 * kMaxLengthSeconds);
		} catch (e) {
		  console.error(e);
		}
	},

	async ControlRecordStop () {
		if (!mod._ValueIsRecording) {
			return;
		}

		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
		}

		KOMBrowseInfoAudioDispatchCapture(KOMBrowseInfoAudioItemProperty, await mod._ValueRecorder.stopRecording());

		mod._ValueIsRecording = false;
	},

	async ControlSetAudio () {
		if (mod._ValueAudioID === KOMBrowseInfoAudioItem.KOMCardID) {
			return;
		}

		if (mod._ValueAudioID) {
			mod.ControlAudioClear();
		}

		mod._ValueAudioID = KOMBrowseInfoAudioItem.KOMCardID;
	},

	async ControlAudioClear () {
		if (mod._ValueAudioIsPlaying) {
			mod.ControlPlaybackStop();
		};

		delete mod._ValueAudio;
		delete mod._ValueAudioID;

		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('clear');
		}
	},

	async ControlPlaybackStart () {
		if (!mod._ValueAudio && OLSK_TESTING_BEHAVIOUR()) {
			mod._ValueAudio = mod.DataFakeAudio(await KOMBrowseInfoAudioDispatchFetch(KOMBrowseInfoAudioItemProperty) || KOMBrowseInfoAudioItem[KOMBrowseInfoAudioItemProperty]);
		}

		if (!mod._ValueAudio) {
			(mod._ValueAudio = new Audio()).src = URL.createObjectURL(await KOMBrowseInfoAudioDispatchFetch(KOMBrowseInfoAudioItemProperty));
		}

		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('play:' + mod._ValueAudio.src);
		}

		mod._ValueAudio.currentTime = 0;
		mod._ValueAudio.play();

		mod._ValueAudioIsPlaying = true;
	},

	ControlPlaybackStop () {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
		}

		mod._ValueAudio.pause();

		mod._ValueAudioIsPlaying = false;
	},

	// SETUP

	SetupEverything() {
		mod.SetupRecorder();
	},

	SetupRecorder() {
		mod._ValueRecorder = OLSK_TESTING_BEHAVIOUR() ? mod.DataFakeRecorder() : new record.Recorder({
		  wasmURL: '/_shared/__external/vmsg/vmsg.wasm',
		});
	},

	// DEBUG

	DebugLog (inputData) {
		window.TestKOMBrowseInfoAudioLog.innerHTML = window.TestKOMBrowseInfoAudioLog.innerHTML ? window.TestKOMBrowseInfoAudioLog.innerHTML.split(',').concat(inputData).join(',') : inputData;
	},

};

mod.SetupEverything();
</script>

<div class="KOMBrowseInfoAudio">

{#if KOMBrowseInfoAudioAvailable }

	{#if !KOMBrowseInfoAudioItem[KOMBrowseInfoAudioItemProperty] }
		<button class="KOMBrowseInfoAudioRecordButton" on:click={ mod.InterfaceRecordButtonDidClick }>{ OLSKLocalized('KOMBrowseInfoAudioRecordButtonText') }</button>
	{/if}

	{#if mod._ValueIsRecording}
		<span class="KOMBrowseInfoAudioRecordingAlert">{ OLSKLocalized('KOMBrowseInfoAudioRecordingAlertText') }</span>
	{/if}

	{#if KOMBrowseInfoAudioItem[KOMBrowseInfoAudioItemProperty] }
		<button class="KOMBrowseInfoAudioPlaybackButton" on:click={ mod.InterfacePlaybackButtonDidClick }>{ OLSKLocalized('KOMBrowseInfoAudioPlaybackButtonText') }</button>

		<button class="KOMBrowseInfoAudioClearButton" on:click={ mod.InterfaceClearButtonDidClick }>{ OLSKLocalized('KOMBrowseInfoAudioClearButtonText') }</button>
	{/if}

{/if}

{#if !KOMBrowseInfoAudioAvailable }
	<span class="KOMBrowseInfoAudioNotAvailableAlert">{ OLSKLocalized('KOMBrowseInfoAudioNotAvailableAlertText') }</span>
{/if}

{#if OLSK_TESTING_BEHAVIOUR() }
	<p>
		<strong>TestKOMBrowseInfoAudioLog</strong>
		<span id="TestKOMBrowseInfoAudioLog"></span>
	</p>
{/if}

</div>
