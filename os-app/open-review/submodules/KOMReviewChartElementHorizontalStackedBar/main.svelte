<script>
export let KOMReviewChartElementHorizontalStackedBarValues;
export let KOMReviewChartElementHorizontalStackedBarColors;
export let KOMReviewChartElementHorizontalStackedBarMaximum = undefined;

import { OLSKLocalized } from 'OLSKInternational';
import KOMReviewChartElementHorizontalStackedBarLogic from './ui-logic.js';

import d3 from '../../../_shared/__external/d3-scale/dist/d3-scale.min.js';

const mod = {

	// DATA

	DataScaleHorizontal (inputData) {
		return KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleHorizontal(d3.scaleLinear, KOMReviewChartElementHorizontalStackedBarValues, KOMReviewChartElementHorizontalStackedBarMaximum)(inputData);
	},

	DataScaleColor (inputData) {
		return KOMReviewChartElementHorizontalStackedBarLogic.KOMReviewChartElementHorizontalStackedBarScaleColor(d3.scaleOrdinal, KOMReviewChartElementHorizontalStackedBarColors, KOMReviewChartElementHorizontalStackedBarValues.map(function (e, i) {
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
