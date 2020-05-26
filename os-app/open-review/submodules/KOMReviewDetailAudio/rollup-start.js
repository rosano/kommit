import RollupStart from './main.svelte';

const KOMReviewDetailAudio = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailAudioDispatchUpdate: (function _KOMReviewDetailAudioDispatchUpdate (inputData) {
			window.TestKOMReviewDetailAudioDispatchUpdate.innerHTML = parseInt(window.TestKOMReviewDetailAudioDispatchUpdate.innerHTML) + 1;
			window.TestKOMReviewDetailAudioDispatchUpdateData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailAudioDispatchClear: (function _KOMReviewDetailAudioDispatchClear (inputData) {
			window.TestKOMReviewDetailAudioDispatchClear.innerHTML = parseInt(window.TestKOMReviewDetailAudioDispatchClear.innerHTML) + 1;
			window.TestKOMReviewDetailAudioDispatchClearData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailAudioItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewDetailAudio;
