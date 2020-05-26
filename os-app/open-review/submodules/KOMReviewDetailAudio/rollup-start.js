import RollupStart from './main.svelte';

const KOMReviewDetailAudio = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailAudioAvailable: true,
		KOMReviewDetailAudioDispatchCapture: (function _KOMReviewDetailAudioDispatchCapture (inputData) {
			window.TestKOMReviewDetailAudioDispatchCapture.innerHTML = parseInt(window.TestKOMReviewDetailAudioDispatchCapture.innerHTML) + 1;
			window.TestKOMReviewDetailAudioDispatchCaptureData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailAudioDispatchClear: (function _KOMReviewDetailAudioDispatchClear (inputData) {
			window.TestKOMReviewDetailAudioDispatchClear.innerHTML = parseInt(window.TestKOMReviewDetailAudioDispatchClear.innerHTML) + 1;
			window.TestKOMReviewDetailAudioDispatchClearData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailAudioItem', 'KOMReviewDetailAudioAvailable'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewDetailAudio;
