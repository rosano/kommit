import RollupStart from './main.svelte';

const KOMReviewDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailDispatchBack () {
			window.TestKOMReviewDetailDispatchBack.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBack.innerHTML) + 1;
		},
		KOMReviewDetailDispatchDiscard (inputData) {
			window.TestKOMReviewDetailDispatchDiscard.innerHTML = parseInt(window.TestKOMReviewDetailDispatchDiscard.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		},
		KOMReviewDetailDispatchRename (inputData) {
			window.TestKOMReviewDetailDispatchRename.innerHTML = parseInt(window.TestKOMReviewDetailDispatchRename.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchRenameData.innerHTML = JSON.stringify(inputData);
		},
		KOMReviewDetailDispatchCreateCard (inputData) {
			window.TestKOMReviewDetailDispatchCreateCard.innerHTML = parseInt(window.TestKOMReviewDetailDispatchCreateCard.innerHTML) + 1;
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewDetail;
