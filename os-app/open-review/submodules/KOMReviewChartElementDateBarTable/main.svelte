<script>
export let KOMReviewChartElementDateBarTableData;
export let KOMReviewChartElementHorizontalStackedBarMaximum;

import KOMReviewChartElementDateBarTableRow from '../KOMReviewChartElementDateBarTableRow/main.svelte';
</script>

<table class="KOMReviewChartElementDateBarTable">

{#each KOMReviewChartElementDateBarTableData as item }
	<KOMReviewChartElementDateBarTableRow
		KOMReviewChartElementDateBarTableRowData={ item }
		KOMReviewChartElementHorizontalStackedBarMaximum={ KOMReviewChartElementHorizontalStackedBarMaximum }
		/>
{/each}
	
</table>