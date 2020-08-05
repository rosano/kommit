<script>
export let KOMReviewChartElementHorizontalStackedBarValues;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewChartElementHorizontalStackedBarLogic from './ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataScaleHorizontal (inputData) {
		return KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, KOMReviewChartElementHorizontalStackedBarValues)(inputData);
	},

	DataScaleColor (inputData) {
		return KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, KOMReviewChartElementHorizontalStackedBarValues.map(function (e, i) {
			return i;
		}))(inputData);
	},

};
</script>

<svg class="KOMReviewChartElementHorizontalStackedBar" viewBox={ `0,0,${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarWidth() },${ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarHeight() }` }>

{#each KOMReviewChartElementHorizontalStackedBarValues as item, index }
	<rect class="KOMReviewChartElementHorizontalStackedBarSection" x={ mod.DataScaleHorizontal(KOMReviewChartElementHorizontalStackedBarValues.slice(0, index).reduce(function (coll, item) {
		return coll + item;
	}, 0)) } y="0" width={ mod.DataScaleHorizontal(item) } height={ KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarHeight() } fill={ mod.DataScaleColor(index) }></rect>
{/each}

</svg>
