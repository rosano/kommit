import RollupStart from './main.svelte';

const KOMReviewMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewMasterListItems: [],
		KOMReviewMasterDispatchCreate (inputData) {
			window.TestKOMReviewMasterDispatchCreate.innerHTML = parseInt(window.TestKOMReviewMasterDispatchCreate.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchCreateData.innerHTML = inputData;
		},
		KOMReviewMasterDispatchSelect (inputData) {
			window.TestKOMReviewMasterDispatchSelect.innerHTML = parseInt(window.TestKOMReviewMasterDispatchSelect.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchSelectData.innerHTML = JSON.stringify(inputData);
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewMasterListItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewMaster;
