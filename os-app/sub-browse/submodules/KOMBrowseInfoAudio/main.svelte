<script>
export let KOMBrowseInfoAudioAvailable;
export let KOMBrowseInfoAudioItem;
export let KOMBrowseInfoAudioItemProperty;
export let KOMBrowseInfoAudioDispatchCapture;
export let KOMBrowseInfoAudioDispatchFetch;
export let KOMBrowseInfoAudioDispatchClear;
export let DebugFakeChangeObject = null;

const kMaxLengthSeconds = 10;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
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

	InterfaceUploadFieldDidInput (event) {
		mod.ControlUpload(event.target.files[0]);
	},

	InterfacePlaybackButtonDidClick () {
		if (OLSK_SPEC_UI() && DebugFakeChangeObject && mod._ValueAudioIsPlaying) {
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

		  if (OLSK_SPEC_UI()) {
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

		if (OLSK_SPEC_UI()) {
			mod.DebugLog('stop');
		}

		KOMBrowseInfoAudioDispatchCapture(KOMBrowseInfoAudioItemProperty, await mod._ValueRecorder.stopRecording());

		mod._ValueIsRecording = false;
	},

	ControlUpload (inputData) {
		Object.assign(new FileReader(), {
			onload (event) {
				console.log(inputData, event);
				KOMBrowseInfoAudioDispatchCapture(KOMBrowseInfoAudioItemProperty, new Blob([event.target.result], { type: inputData.type }));
			},
		}).readAsArrayBuffer(inputData);
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

		if (OLSK_SPEC_UI()) {
			mod.DebugLog('clear');
		}
	},

	async ControlPlaybackStart () {
		if (!mod._ValueAudio && OLSK_SPEC_UI()) {
			mod._ValueAudio = mod.DataFakeAudio(await KOMBrowseInfoAudioDispatchFetch(KOMBrowseInfoAudioItemProperty) || KOMBrowseInfoAudioItem[KOMBrowseInfoAudioItemProperty]);
		}

		if (!mod._ValueAudio) {
			mod._ValueAudio = Object.assign(new Audio(), {
				src: URL.createObjectURL(await KOMBrowseInfoAudioDispatchFetch(KOMBrowseInfoAudioItemProperty)),
				onended () {
					mod._ValueAudioIsPlaying = false;
				},
			});
		}

		if (OLSK_SPEC_UI()) {
			mod.DebugLog('play:' + mod._ValueAudio.src);
		}

		mod._ValueAudio.currentTime = 0;
		mod._ValueAudio.play();

		mod._ValueAudioIsPlaying = true;
	},

	ControlPlaybackStop () {
		if (OLSK_SPEC_UI()) {
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
		mod._ValueRecorder = OLSK_SPEC_UI() ? mod.DataFakeRecorder() : new record.Recorder({
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

		{#if !mod._ValueIsRecording}
			<input class="KOMBrowseInfoAudioUploadField" type="file" accept="audio/*" on:change={ mod.InterfaceUploadFieldDidInput } />
		{/if}
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

{#if OLSK_SPEC_UI() }
	<p>
		<strong>KOMBrowseInfoAudioLog</strong>
		<span id="TestKOMBrowseInfoAudioLog"></span>
	</p>
{/if}

</div>
