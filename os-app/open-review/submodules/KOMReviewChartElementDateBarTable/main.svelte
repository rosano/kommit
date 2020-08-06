<script>
export let KOMReviewChartElementDateBarTableData;

const mod = {

	// DATA

	DataMaximum () {
		return KOMReviewChartElementDateBarTableData.reduce(function (coll, item) {
			const sum = item.KOMReviewChartElementDateBarTableRowDataValues.reduce(function (coll, item) {
				return coll + item;
			}, 0);

			if (sum > coll) {
				return sum;
			}

			return coll;
		}, 0);
	},

};

import KOMReviewChartElementDateBarTableRow from '../KOMReviewChartElementDateBarTableRow/main.svelte';
</script>

<table class="KOMReviewChartElementDateBarTable">

{#each KOMReviewChartElementDateBarTableData as item }
	<KOMReviewChartElementDateBarTableRow
		KOMReviewChartElementDateBarTableRowData={ item }
		KOMReviewChartElementHorizontalStackedBarMaximum={ mod.DataMaximum() }
		/>
{/each}
	
</table>