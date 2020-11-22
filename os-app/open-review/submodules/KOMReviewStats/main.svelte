<script>
export let KOMReviewTodayTotalCards;
export let KOMReviewTodayTimeMinutes;
export let KOMReviewTodayReviewAccuracy;
export let KOMReviewGeneralUpcomingData;
export let KOMReviewGeneralHistoricalData;
export let KOMReviewChartCompositionCollectionData;

import { OLSKLocalized } from 'OLSKInternational';

import KOMReviewToday from '../KOMReviewToday/main.svelte';
import KOMReviewGeneral from '../KOMReviewGeneral/main.svelte';
</script>

<div class="KOMReviewStats">
	<h1 class="KOMReviewStatsHeading">{ OLSKLocalized('KOMReviewStatsHeadingText') }</h1>

	{#if KOMReviewTodayTotalCards }
		<KOMReviewToday
			KOMReviewTodayTotalCards={ KOMReviewTodayTotalCards }
			KOMReviewTodayTimeMinutes={ KOMReviewTodayTimeMinutes }
			KOMReviewTodayReviewAccuracy={ KOMReviewTodayReviewAccuracy }
			/>
	{/if}

	<KOMReviewGeneral
		KOMReviewGeneralUpcomingData={ KOMReviewGeneralUpcomingData }
		KOMReviewGeneralHistoricalData={ KOMReviewGeneralHistoricalData }
		KOMReviewChartCompositionCollectionData={ KOMReviewChartCompositionCollectionData }
		/>
</div>
