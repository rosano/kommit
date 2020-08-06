<script>
export let KOMReviewChartElementDateBarTableRowData;
export let KOMReviewChartElementHorizontalStackedBarMaximum;

import KOMReviewChartElementDateBarTableRowLogic from './ui-logic.js';

if (!KOMReviewChartElementDateBarTableRowLogic.KOMReviewChartElementDateBarTableRowIsValid(KOMReviewChartElementDateBarTableRowData)) {
	throw new Error('KOMErrorInputNotValid');
}

const mod = {

	// DATA

	DataSum() {
		return Math.round(KOMReviewChartElementDateBarTableRowData.KOMReviewChartElementDateBarTableRowDataValues.reduce(function (coll, item) {
			return coll + item;
		}, 0) * 10) / 10;
	},

};

import KOMReviewChartElementHorizontalStackedBar from '../KOMReviewChartElementHorizontalStackedBar/main.svelte';
</script>

<tr class="KOMReviewChartElementDateBarTableRow" class:KOMReviewChartElementDateBarTableRowZero={ !mod.DataSum() }>

<td class="KOMReviewChartElementDateBarTableRowKey">{ KOMReviewChartElementDateBarTableRowData.KOMReviewChartElementDateBarTableRowDataKey }</td>

<td class="KOMReviewChartElementDateBarTableRowBar">
	<KOMReviewChartElementHorizontalStackedBar
		KOMReviewChartElementHorizontalStackedBarValues={ KOMReviewChartElementDateBarTableRowData.KOMReviewChartElementDateBarTableRowDataValues }
		KOMReviewChartElementHorizontalStackedBarMaximum={ KOMReviewChartElementHorizontalStackedBarMaximum }
		/>
</td>

<td class="KOMReviewChartElementDateBarTableRowCount">{ mod.DataSum() || '' }</td>
	
</tr>

<style>
.KOMReviewChartElementDateBarTableRowBar :global(.KOMReviewChartElementHorizontalStackedBar) {
	width: 100%;
	max-width: 150px;
	height: auto;
}

.KOMReviewChartElementDateBarTableRowZero {
	opacity: 0.3;
}
</style>