<script>
export let KOMReviewChartElementNormalizedBarValues;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewChartElementNormalizedBarLogic from './ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataScaleHorizontal (inputData) {
		return KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarScaleHorizontal(d3.scaleLinear, KOMReviewChartElementNormalizedBarValues)(inputData);
	},

	DataScaleColor (inputData) {
		return KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, KOMReviewChartElementNormalizedBarValues.map(function (e, i) {
			return i;
		}))(inputData);
	},

};
</script>

<svg class="KOMReviewChartElementNormalizedBar" viewBox={ `0,0,${ KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarWidth() },${ KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarHeight() }` }>

{#each KOMReviewChartElementNormalizedBarValues as item, index }
	<rect class="KOMReviewChartElementNormalizedBarSection" x={ mod.DataScaleHorizontal(KOMReviewChartElementNormalizedBarValues.slice(0, index).reduce(function (coll, item) {
		return coll + item;
	}, 0)) } y="0" width={ mod.DataScaleHorizontal(item) } height={ KOMReviewChartElementNormalizedBarLogic.KOMReviewChartElementNormalizedBarHeight() } fill={ mod.DataScaleColor(index) }></rect>
{/each}

</svg>
