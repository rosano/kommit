<script>
export let KOMReviewChartCompositionStatesData;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewChartCompositionStatesLogic from './ui-logic.js';

if (!KOMReviewChartCompositionStatesLogic.KOMReviewChartCompositionStatesIsValid(KOMReviewChartCompositionStatesData)) {
	throw new Error('KOMErrorInputNotValid');
}

import KOMReviewChartElementNormalizedBarLogic from '../KOMReviewChartElementNormalizedBar/ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataNormalizeValues () {
		return Object.values(KOMReviewChartCompositionStatesData).slice(1);
	},

	DataScaleColor (inputData) {
		return KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, mod.DataNormalizeValues().map(function (e, i) {
			return i;
		}))(inputData);
	},

};

import KOMReviewChartElementNormalizedBar from '../KOMReviewChartElementNormalizedBar/main.svelte';
</script>

<table class="KOMReviewChartCompositionStates">

<tr>
	<th></th>
	<th class="KOMReviewChartCompositionStatesTotalCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesTotalCardsLabelText') }</th>
	<th class="KOMReviewChartCompositionStatesTotalCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesTotal }</th>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionStatesDevelopingCardsColor" style="background: { mod.DataScaleColor(0) };"></span></td>
	<td class="KOMReviewChartCompositionStatesDevelopingCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesDevelopingCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionStatesDevelopingCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesDeveloping }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionStatesMatureCardsColor" style="background: { mod.DataScaleColor(1) };"></span></td>
	<td class="KOMReviewChartCompositionStatesMatureCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesMatureCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionStatesMatureCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesMature }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionStatesSuspendedCardsColor" style="background: { mod.DataScaleColor(2) };"></span></td>
	<td class="KOMReviewChartCompositionStatesSuspendedCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesSuspendedCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionStatesSuspendedCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesSuspended }</td>
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

.KOMReviewChartCompositionStates :global(.KOMReviewChartElementNormalizedBar) {
	width: 100%;
	max-width: 150px;
	height: auto;
}
</style>
