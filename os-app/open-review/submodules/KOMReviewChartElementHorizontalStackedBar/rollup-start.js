import RollupStart from './main.svelte';

const KOMReviewChartElementHorizontalStackedBar = new RollupStart({
	target: document.body,
	props: Object.assign({}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewChartElementHorizontalStackedBarValues'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewChartElementHorizontalStackedBar;
