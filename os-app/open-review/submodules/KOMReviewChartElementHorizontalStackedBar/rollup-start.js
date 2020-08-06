import RollupStart from './main.svelte';

const KOMReviewChartElementHorizontalStackedBar = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewChartElementHorizontalStackedBarColors: ['alfa', 'bravo', 'charlie'],
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewChartElementHorizontalStackedBarValues', 'KOMReviewChartElementHorizontalStackedBarColors'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['KOMReviewChartElementHorizontalStackedBarMaximum'].includes(e[0])) {
			e[1] = parseFloat(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewChartElementHorizontalStackedBar;
