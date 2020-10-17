import RollupStart from './main.svelte';

const KOMReviewDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailDispatchBack: (function () {
			window.TestKOMReviewDetailDispatchBack.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBack.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchBrowse: (function () {
			window.TestKOMReviewDetailDispatchBrowse.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBrowse.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchUpdate: (function (inputData) {
			window.TestKOMReviewDetailDispatchUpdate.innerHTML = parseInt(window.TestKOMReviewDetailDispatchUpdate.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchUpdateData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailDispatchRecount: (function () {
			window.TestKOMReviewDetailDispatchRecount.innerHTML = parseInt(window.TestKOMReviewDetailDispatchPlay.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchPlay: (function (inputData) {
			window.TestKOMReviewDetailDispatchPlay.innerHTML = parseInt(window.TestKOMReviewDetailDispatchPlay.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchPlayData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailDispatchDiscard: (function (inputData) {
			window.TestKOMReviewDetailDispatchDiscard.innerHTML = parseInt(window.TestKOMReviewDetailDispatchDiscard.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetail_DebugShowLauncherButton: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailDeck'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewDetail;
