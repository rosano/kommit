<script>
export let KOMReviewChartElementDateBarTableRowData;
export let KOMReviewChartElementHorizontalStackedBarMaximum;

import KOMReviewChartElementDateBarTableRowLogic from './ui-logic.js';

if (!KOMReviewChartElementDateBarTableRowLogic.KOMReviewChartElementDateBarTableRowIsValid(KOMReviewChartElementDateBarTableRowData)) {
	throw new Error('KOMErrorInputNotValid');
}

import KOMReviewChartElementHorizontalStackedBar from '../KOMReviewChartElementHorizontalStackedBar/main.svelte';
</script>

<tr class="KOMReviewChartElementDateBarTableRow">

<td class="KOMReviewChartElementDateBarTableRowKey">{ KOMReviewChartElementDateBarTableRowData.KOMReviewChartElementDateBarTableRowDataKey }</td>

<td class="KOMReviewChartElementDateBarTableRowBar">
	<KOMReviewChartElementHorizontalStackedBar
		KOMReviewChartElementHorizontalStackedBarValues={ KOMReviewChartElementDateBarTableRowData.KOMReviewChartElementDateBarTableRowDataValues }
		KOMReviewChartElementHorizontalStackedBarMaximum={ KOMReviewChartElementHorizontalStackedBarMaximum }
		/>
</td>
	
</tr>