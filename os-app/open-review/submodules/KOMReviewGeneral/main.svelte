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
			const cardID = KOMSpacingModel.KOMSpacingModelIdentifier(item.KOMSpacingID);

			if (!coll.KOMReviewChartCompositionStatesTotal.includes(cardID)) {
				coll.KOMReviewChartCompositionStatesTotal.push(cardID);
			}

			if (KOMSpacingModel.KOMSpacingModelIsUnseen(item) && !coll.KOMReviewChartCompositionStatesUnseen.includes(cardID)) {
				coll.KOMReviewChartCompositionStatesUnseen.push(cardID);
			}

			if (KOMSpacingModel.KOMSpacingModelIsDeveloping(item) && !coll.KOMReviewChartCompositionStatesDeveloping.includes(cardID)) {
				coll.KOMReviewChartCompositionStatesDeveloping.push(cardID);
			}

			if (KOMSpacingModel.KOMSpacingModelIsMature(item) && !coll.KOMReviewChartCompositionStatesMature.includes(cardID)) {
				coll.KOMReviewChartCompositionStatesMature.push(cardID);
			}

			return coll;
		}, {
			KOMReviewChartCompositionStatesTotal: [],
			KOMReviewChartCompositionStatesUnseen: [],
			KOMReviewChartCompositionStatesDeveloping: [],
			KOMReviewChartCompositionStatesMature: [],
			KOMReviewChartCompositionStatesSuspended: [],
		})).reduce(function (coll, item) {
			coll[item[0]] = item[1].length;

			return coll;
		}, {});
	},

};

import KOMReviewChartCompositionStates from '../KOMReviewChartCompositionStates/main.svelte';
</script>

<div class="KOMReviewGeneral">

<h3 class="KOMReviewGeneralCardStatesHeading">{ OLSKLocalized('KOMReviewGeneralCardStatesHeadingText') }</h3>

<KOMReviewChartCompositionStates KOMReviewChartCompositionStatesData={ mod.DataStatesData() } />

</div>
