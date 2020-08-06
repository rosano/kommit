<script>
export let KOMReviewChartCompositionCollectionData;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewChartElementHorizontalStackedBarLogic from '../KOMReviewChartElementHorizontalStackedBar/ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataScaleColor (inputData) {
		return KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, mod.DataStackedBarValues().map(function (e, i) {
			return i;
		}))(inputData);
	},

	DataStackedBarValues () {
		return Object.values(KOMReviewChartCompositionCollectionData).slice(1).map(function (e) {
			return e.length;
		});
	},

};

import KOMReviewChartElementHorizontalStackedBar from '../KOMReviewChartElementHorizontalStackedBar/main.svelte';
</script>

<table class="KOMReviewChartCompositionCollection">

<tr>
	<th></th>
	<th class="KOMReviewChartCompositionCollectionTotalCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionTotalCardsLabelText') }</th>
	<th class="KOMReviewChartCompositionCollectionTotalCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal.length }</th>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionUnseenCardsColor" style="background: { mod.DataScaleColor(0) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionUnseenCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionUnseenCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionUnseenCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingUnseen.length }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionDevelopingCardsColor" style="background: { mod.DataScaleColor(1) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionDevelopingCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionDevelopingCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionDevelopingCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingDeveloping.length }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionMatureCardsColor" style="background: { mod.DataScaleColor(2) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionMatureCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionMatureCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionMatureCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingMature.length }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionSuspendedCardsColor" style="background: { mod.DataScaleColor(3) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionSuspendedCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionSuspendedCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionSuspendedCardsValue">{ KOMReviewChartCompositionCollectionData.KOMSpacingGroupingSuspended.length }</td>
</tr>

<tr>
	<td colspan="3">
		<KOMReviewChartElementHorizontalStackedBar KOMReviewChartElementHorizontalStackedBarValues={ mod.DataStackedBarValues() } />
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

.KOMSpacingGrouping :global(.KOMReviewChartElementHorizontalStackedBar) {
	width: 100%;
	max-width: 150px;
	height: auto;
}
</style>
