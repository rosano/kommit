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

import KOMReviewNormalizeBarUILogic from '../KOMReviewNormalizedBar/ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataNormalizeValues () {
		return Object.values(KOMReviewChartCompositionStatesData).slice(1);
	},

	DataScaleColor (inputData) {
		return KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, mod.DataNormalizeValues())(inputData);
	},

};

import KOMReviewNormalizedBar from '../KOMReviewNormalizedBar/main.svelte';
</script>

<table class="KOMReviewChartCompositionStates">

<tr>
	<th></th>
	<th class="KOMReviewChartCompositionStatesTotalCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesTotalCardsLabelText') }</th>
	<th class="KOMReviewChartCompositionStatesTotalCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesTotal }</th>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionStatesLearningCardsColor" style="background: { mod.DataScaleColor(KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesLearning) };"></span></td>
	<td class="KOMReviewChartCompositionStatesLearningCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesLearningCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionStatesLearningCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesLearning }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionStatesMatureCardsColor" style="background: { mod.DataScaleColor(KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesMature) };"></span></td>
	<td class="KOMReviewChartCompositionStatesMatureCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesMatureCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionStatesMatureCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesMature }</td>
</tr>

<tr>
	<td><span class="KOMReviewChartCompositionStatesSuspendedCardsColor" style="background: { mod.DataScaleColor(KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesSuspended) };"></span></td>
	<td class="KOMReviewChartCompositionStatesSuspendedCardsLabel">{ OLSKLocalized('KOMReviewChartCompositionStatesSuspendedCardsLabelText') }</td>
	<td class="KOMReviewChartCompositionStatesSuspendedCardsValue">{ KOMReviewChartCompositionStatesData.KOMReviewChartCompositionStatesSuspended }</td>
</tr>

<tr>
	<td colspan="3">
		<KOMReviewNormalizedBar KOMReviewNormalizeBarValues={ mod.DataNormalizeValues() } />
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

.KOMReviewChartCompositionStates :global(.KOMReviewNormalizeBar) {
	width: 100%;
	max-width: 150px;
	height: auto;
}
</style>
