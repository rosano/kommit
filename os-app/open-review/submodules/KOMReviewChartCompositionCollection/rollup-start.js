import RollupStart from './main.svelte';

const KOMReviewChartCompositionCollection = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewChartCompositionCollectionData: {
			KOMSpacingGroupingTotal: 1,
			KOMSpacingGroupingUnseen: 2,
			KOMSpacingGroupingDeveloping: 3,
			KOMSpacingGroupingMature: 4,
			KOMSpacingGroupingSuspended: 5,
		},
		KOMReviewChartElementHorizontalStackedBarColors: ['alfa', 'bravo', 'charlie', 'delta'],
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewChartCompositionCollectionData'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewChartCompositionCollection;
