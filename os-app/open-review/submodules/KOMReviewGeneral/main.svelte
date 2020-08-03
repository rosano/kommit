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
		const cardIDs = [];
		return KOMReviewGeneralSpacings.reduce(function (coll, item) {
			if (!cardIDs.includes(KOMSpacingModel.KOMSpacingModelIdentifier(item.KOMSpacingID))) {
				cardIDs.push(KOMSpacingModel.KOMSpacingModelIdentifier(item.KOMSpacingID));
				coll.KOMReviewChartCompositionStatesTotal += 1;
			}

			if (KOMSpacingModel.KOMSpacingModelIsDeveloping(item)) {
				coll.KOMReviewChartCompositionStatesDeveloping += 1;
			}

			if (KOMSpacingModel.KOMSpacingModelIsMature(item)) {
				coll.KOMReviewChartCompositionStatesMature += 1;
			}

			return coll;
		}, {
			KOMReviewChartCompositionStatesTotal: 0,
			KOMReviewChartCompositionStatesDeveloping: 0,
			KOMReviewChartCompositionStatesMature: 0,
			KOMReviewChartCompositionStatesSuspended: 0,
		})
	},

};

import KOMReviewChartCompositionStates from '../KOMReviewChartCompositionStates/main.svelte';
</script>

<div class="KOMReviewGeneral">

<h3 class="KOMReviewGeneralCardStatesHeading">{ OLSKLocalized('KOMReviewGeneralCardStatesHeadingText') }</h3>

<KOMReviewChartCompositionStates KOMReviewChartCompositionStatesData={ mod.DataStatesData() } />

</div>
