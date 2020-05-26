<script>
export let KOMReviewDetailAudioItem;
export let KOMReviewDetailAudioItemProperty;
export let KOMReviewDetailAudioDispatchUpdate;
export let KOMReviewDetailAudioDispatchClear;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// VALUE

	_ValueAudio: KOMReviewDetailAudioItem[KOMReviewDetailAudioItemProperty],

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

	ControlRecordStart () {
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('record');
		}
	},

	ControlRecordStop () {
		if (true || OLSK_TESTING_BEHAVIOUR()) {
			mod.DebugLog('stop');
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

	// DEBUG

	DebugLog (inputData) {
		window.TestKOMReviewDetailAudioLog.innerHTML = window.TestKOMReviewDetailAudioLog.innerHTML ? window.TestKOMReviewDetailAudioLog.innerHTML.split(',').concat(inputData).join(',') : inputData;
	},

};
</script>

<div class="KOMReviewDetailAudio">

{#if !mod._ValueAudio }
	<button class="KOMReviewDetailAudioRecordButton" on:mousedown={ mod.InterfaceRecordButtonDidTouchDown } on:mouseup={ mod.InterfaceRecordButtonDidTouchUp }>{ OLSKLocalized('KOMReviewDetailAudioRecordButtonText') }</button>
{/if}

{#if mod._ValueAudio }
	<button class="KOMReviewDetailAudioPlaybackButton" on:click={ mod.InterfacePlaybackButtonDidClick }>{ OLSKLocalized('KOMReviewDetailAudioPlaybackButtonText') }</button>

	<button class="KOMReviewDetailAudioClearButton" on:click={ () => KOMReviewDetailAudioDispatchClear(KOMReviewDetailAudioItem) }>{ OLSKLocalized('KOMReviewDetailAudioClearButtonText') }</button>
{/if}

</div>
