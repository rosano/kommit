import RollupStart from './main.svelte';

const KOMReviewDetailLanguageCode = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailLanguageCodeDispatchUpdate: (function (inputData) {
			window.TestKOMReviewDetailLanguageCodeDispatchUpdate.innerHTML = parseInt(window.TestKOMReviewDetailLanguageCodeDispatchUpdate.innerHTML) + 1;
			window.TestKOMReviewDetailLanguageCodeDispatchUpdateData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailLanguageCodeItem', 'KOMReviewDetailLanguageCodeOptions'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewDetailLanguageCode;
