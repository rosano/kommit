import RollupStart from './main.svelte';

const KOMBrowseInfoAudio = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseInfoAudioAvailable: true,
		KOMBrowseInfoAudioDispatchCapture: (function (inputData) {
			window.TestKOMBrowseInfoAudioDispatchCapture.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchCapture.innerHTML) + 1;
			window.TestKOMBrowseInfoAudioDispatchCaptureData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseInfoAudioDispatchFetch: (function (inputData) {
			window.TestKOMBrowseInfoAudioDispatchFetch.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchFetch.innerHTML) + 1;
			window.TestKOMBrowseInfoAudioDispatchFetchData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseInfoAudioDispatchClear: (function (inputData) {
			window.TestKOMBrowseInfoAudioDispatchClear.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchClear.innerHTML) + 1;
			window.TestKOMBrowseInfoAudioDispatchClearData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMBrowseInfoAudioItem', 'KOMBrowseInfoAudioAvailable', 'DebugFakeChangeObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMBrowseInfoAudio;
