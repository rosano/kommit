import RollupStart from './main.svelte';

const KOMReviewChartCompositionCollection = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewChartCompositionCollectionData: {
			KOMSpacingGroupingTotal: 1,
			KOMSpacingGroupingUnseen: 2,
			KOMSpacingGroupingDeveloping: 3,
			KOMSpacingGroupingMature: 4,
			KOMSpacingGroupingRetired: 5,
			KOMSpacingGroupingSuspended: 6,
		},
		KOMReviewChartElementHorizontalStackedBarColors: ['alfa', 'bravo', 'charlie', 'delta', 'echo'],
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewChartCompositionCollectionData'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewChartCompositionCollection;
