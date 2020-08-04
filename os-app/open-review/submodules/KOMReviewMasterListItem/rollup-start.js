import RollupStart from './main.svelte';

const KOMReviewMasterListItem = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewMasterListItemDispatchClick: (function _KOMReviewMasterListItemDispatchClick() {
			window.TestKOMReviewMasterListItemDispatchClick.innerHTML = parseInt(window.TestKOMReviewMasterListItemDispatchClick.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default KOMReviewMasterListItem;
