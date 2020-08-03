<script>
export let KOMReviewNormalizeBarValues;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewNormalizeBarUILogic from './ui-logic.js';

import d3 from '../../../_shared/__external/d3/dist/d3.min.js';

const mod = {

	// DATA

	DataScaleHorizontal (inputData) {
		return KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleHorizontal(d3.scaleLinear, KOMReviewNormalizeBarValues)(inputData);
	},

	DataScaleColor (inputData) {
		return KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarScaleColor(d3.scaleOrdinal, d3.schemeGreys, KOMReviewNormalizeBarValues)(inputData);
	},

};
</script>

<svg class="KOMReviewNormalizeBar" viewBox={ `0,0,${ KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarWidth() },${ KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarHeight() }` }>

{#each KOMReviewNormalizeBarValues as item, index }
	<rect class="KOMReviewNormalizeBarSection" x={ mod.DataScaleHorizontal(KOMReviewNormalizeBarValues.slice(0, index).reduce(function (coll, item) {
		return coll + item;
	}, 0)) } y="0" width={ mod.DataScaleHorizontal(item) } height={ KOMReviewNormalizeBarUILogic.KOMReviewNormalizeBarHeight() } fill={ mod.DataScaleColor(item) }></rect>
{/each}

</svg>
