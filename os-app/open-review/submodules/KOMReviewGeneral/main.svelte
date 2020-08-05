<script>
export let KOMReviewGeneralSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const mod = {

	// DATA

	DataStatesData() {
		return Object.entries(KOMReviewGeneralSpacings.reduce(function (coll, item) {
			coll.KOMReviewChartCompositionCollectionTotal.push(item);

			if (KOMSpacingModel.KOMSpacingModelIsUnseen(item)) {
				coll.KOMReviewChartCompositionCollectionUnseen.push(item);
			}

			if (KOMSpacingModel.KOMSpacingModelIsDeveloping(item)) {
				coll.KOMReviewChartCompositionCollectionDeveloping.push(item);
			}

			if (KOMSpacingModel.KOMSpacingModelIsMature(item)) {
				coll.KOMReviewChartCompositionCollectionMature.push(item);
			}

			return coll;
		}, {
			KOMReviewChartCompositionCollectionTotal: [],
			KOMReviewChartCompositionCollectionUnseen: [],
			KOMReviewChartCompositionCollectionDeveloping: [],
			KOMReviewChartCompositionCollectionMature: [],
			KOMReviewChartCompositionCollectionSuspended: [],
		})).reduce(function (coll, item) {
			coll[item[0]] = KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length;

			return coll;
		}, {});
	},

};

import KOMReviewChartCompositionCollection from '../KOMReviewChartCompositionCollection/main.svelte';
</script>

<div class="KOMReviewGeneral">

<div class="KOMReviewGeneralUpcoming">
	<h2 class="KOMReviewGeneralUpcomingHeading">{ OLSKLocalized('KOMReviewGeneralUpcomingHeadingText') }</h2>
</div>

<div class="KOMReviewGeneralCollection">
	<h2 class="KOMReviewGeneralCollectionHeading">{ OLSKLocalized('KOMReviewGeneralCollectionHeadingText') }</h2>

	<KOMReviewChartCompositionCollection KOMReviewChartCompositionCollectionData={ mod.DataStatesData() } />
</div>

</div>
