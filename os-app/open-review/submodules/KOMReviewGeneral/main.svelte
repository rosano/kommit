<script>
export let KOMReviewGeneralSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewGeneralLogic from './ui-logic.js';
import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const mod = {

	// DATA

	DataStatesData() {
		return Object.entries(KOMReviewGeneralSpacings.reduce(function (coll, item) {
			coll.KOMReviewChartCompositionStatesTotal.push(item);

			if (KOMSpacingModel.KOMSpacingModelIsUnseen(item)) {
				coll.KOMReviewChartCompositionStatesUnseen.push(item);
			}

			if (KOMSpacingModel.KOMSpacingModelIsDeveloping(item)) {
				coll.KOMReviewChartCompositionStatesDeveloping.push(item);
			}

			if (KOMSpacingModel.KOMSpacingModelIsMature(item)) {
				coll.KOMReviewChartCompositionStatesMature.push(item);
			}

			return coll;
		}, {
			KOMReviewChartCompositionStatesTotal: [],
			KOMReviewChartCompositionStatesUnseen: [],
			KOMReviewChartCompositionStatesDeveloping: [],
			KOMReviewChartCompositionStatesMature: [],
			KOMReviewChartCompositionStatesSuspended: [],
		})).reduce(function (coll, item) {
			coll[item[0]] = KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length;

			return coll;
		}, {});
	},

};

import KOMReviewChartCompositionStates from '../KOMReviewChartCompositionStates/main.svelte';
</script>

<div class="KOMReviewGeneral">

<h2 class="KOMReviewGeneralCollectionHeading">{ OLSKLocalized('KOMReviewGeneralCollectionHeadingText') }</h2>

<KOMReviewChartCompositionStates KOMReviewChartCompositionStatesData={ mod.DataStatesData() } />

</div>
