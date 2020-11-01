import RollupStart from './main.svelte';

const KOMReviewStats = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewTodayTotalCards: 0,
		KOMReviewTodayTimeMinutes: 0,
		KOMReviewTodayReviewAccuracy: 0,
		KOMReviewGeneralUpcomingData: [],
		KOMReviewGeneralHistoricalData: [],
		KOMReviewChartCompositionCollectionData: {
			KOMSpacingGroupingTotal: 1,
			KOMSpacingGroupingUnseen: 2,
			KOMSpacingGroupingDeveloping: 3,
			KOMSpacingGroupingMature: 4,
			KOMSpacingGroupingRetired: 5,
			KOMSpacingGroupingSuspended: 6,
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewGeneralUpcomingData', 'KOMReviewGeneralHistoricalData', 'KOMReviewChartCompositionCollectionData'].includes(e[0])) {
			e[1] = JSON.parse(e[1])
		}

		return e;
	}))),
});

export default KOMReviewStats;
