import RollupStart from './main.svelte';

const KOMReviewCardForm = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewCardFormDispatchCancel () {
			window.TestKOMReviewCardFormDispatchCancel.innerHTML = parseInt(window.TestKOMReviewCardFormDispatchCancel.innerHTML) + 1;
		},
		KOMReviewCardFormDispatchSave (inputData) {
			window.TestKOMReviewCardFormDispatchSave.innerHTML = parseInt(window.TestKOMReviewCardFormDispatchSave.innerHTML) + 1;
			window.TestKOMReviewCardFormDispatchSaveData.innerHTML = JSON.stringify(inputData);
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewCardFormItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewCardForm;
