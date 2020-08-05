<script>
export let KOMReviewChartCompositionCollectionData;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewChartCompositionCollectionLogic from './ui-logic.js';

if (!KOMReviewChartCompositionCollectionLogic.KOMReviewChartCompositionCollectionIsValid(KOMReviewChartCompositionCollectionData)) {
	throw new Error('KOMErrorInputNotValid');
}

import KOMReviewChartElementNormalizedBarLogic from '../KOMReviewChartElementNormalizedBar/ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataNormalizeValues () {
		return Object.values(KOMReviewChartCompositionCollectionData).slice(1);
	},

	DataScaleColor (inputData) {
		return KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, mod.DataNormalizeValues().map(function (e, i) {
			return i;
		}))(inputData);
	},

};

import KOMReviewChartElementNormalizedBar from '../KOMReviewChartElementNormalizedBar/main.svelte';
</script>

<table class="KOMReviewChartCompositionCollection">

<tr>
	<th></th>
	<th class="KOMReviewChartCompositionCollectionTotalCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionTotalCardsLabelText') }</th>
	<th class="KOMReviewChartCompositionCollectionTotalCardsValue">{ KOMReviewChartCompositionCollectionData.KOMReviewChartCompositionCollectionTotal }</th>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionUnseenCardsColor" style="background: { mod.DataScaleColor(0) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionUnseenCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionUnseenCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionUnseenCardsValue">{ KOMReviewChartCompositionCollectionData.KOMReviewChartCompositionCollectionUnseen }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionDevelopingCardsColor" style="background: { mod.DataScaleColor(1) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionDevelopingCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionDevelopingCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionDevelopingCardsValue">{ KOMReviewChartCompositionCollectionData.KOMReviewChartCompositionCollectionDeveloping }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionMatureCardsColor" style="background: { mod.DataScaleColor(2) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionMatureCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionMatureCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionMatureCardsValue">{ KOMReviewChartCompositionCollectionData.KOMReviewChartCompositionCollectionMature }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionCollectionSuspendedCardsColor" style="background: { mod.DataScaleColor(3) };"></span></td>
	<td class="KOMReviewChartCompositionCollectionSuspendedCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionCollectionSuspendedCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionCollectionSuspendedCardsValue">{ KOMReviewChartCompositionCollectionData.KOMReviewChartCompositionCollectionSuspended }</td>
</tr>

<tr>
	<td colspan="3">
		<KOMReviewChartElementNormalizedBar KOMReviewChartElementNormalizedBarValues={ mod.DataNormalizeValues() } />
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

.KOMReviewChartCompositionCollection :global(.KOMReviewChartElementNormalizedBar) {
	width: 100%;
	max-width: 150px;
	height: auto;
}
</style>
