<script>
export let KOMReviewChartCompositionCollectionData;
export let KOMReviewChartElementHorizontalStackedBarColors;

import { OLSKLocalized } from 'OLSKInternational';
import KOMReviewChartElementHorizontalStackedBarLogic from '../KOMReviewChartElementHorizontalStackedBar/ui-logic.js';

import d3 from '../../../_shared/__external/d3-scale/dist/d3-scale.min.js';

const mod = {

	// DATA

	DataScaleColor (inputData) {
		return KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, KOMReviewChartElementHorizontalStackedBarColors, mod.DataStackedBarValues().map(function (e, i) {
			return i;
		}))(inputData);
	},

	DataStackedBarValues () {
		return Object.values(KOMReviewChartCompositionCollectionData).slice(1);
	},

};

import KOMReviewChartElementHorizontalStackedBar from '../KOMReviewChartElementHorizontalStackedBar/main.svelte';
</script>

<table class="KOMReviewChartCompositionCollection">

<tr>
	<th></th>
	<th class="KOMReviewChartCompositionCollectionTotalCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionTotalCardsLabelText') }</th>
	<th class="KOMReviewChartCompositionCollectionTotalCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal }</th>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionUnseenCardsColor" style="background: { mod.DataScaleColor(0) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionUnseenCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionUnseenCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionUnseenCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingUnseen }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionDevelopingCardsColor" style="background: { mod.DataScaleColor(1) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionDevelopingCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionDevelopingCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionDevelopingCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingDeveloping }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionMatureCardsColor" style="background: { mod.DataScaleColor(2) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionMatureCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionMatureCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionMatureCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingMature }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionRetiredCardsColor" style="background: { mod.DataScaleColor(3) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionRetiredCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionRetiredCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionRetiredCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingRetired }</td>
</tr>

<tr>
	<td colspan="3">
		<KOMReviewChartElementHorizontalStackedBar KOMReviewChartElementHorizontalStackedBarValues={ mod.DataStackedBarValues() } 
		KOMReviewChartElementHorizontalStackedBarColors={ KOMReviewChartElementHorizontalStackedBarColors }
		/>
	</td>
</tr>

</table>

<style>
td:first-child {
	font-style: oblique;
}

td, th {
	padding: 3px;

	text-align: left;
}

td span {
	display: inline-block;
	width: 20px;
	height: 10px;
}

tr:last-child td {
	padding: 0;
}

td :global(.KOMReviewChartElementHorizontalStackedBar) {
	width: 125px;
}
</style>
