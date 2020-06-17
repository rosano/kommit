<script>
export let KOMReviewDetailStatsSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewDetailStatsLogic from './ui-logic.js';
</script>

<table class="KOMReviewDetailStats">

<tr>
	<td class="KOMReviewDetailStatsTotalCardsLabel">{ OLSKLocalized('KOMReviewDetailStatsTotalCardsLabelText') }</td>
	<td class="KOMReviewDetailStatsTotalCardsValue">{ KOMReviewDetailStatsLogic.KOMReviewDetailStatsTotalCards(KOMReviewDetailStatsSpacings) }</td>
</tr>

<tr>
	<td class="KOMReviewDetailStatsTotalMinutesLabel">{ OLSKLocalized('KOMReviewDetailStatsTotalMinutesLabelText') }</td>
	<td class="KOMReviewDetailStatsTotalMinutesValue">{ KOMReviewDetailStatsLogic.KOMReviewDetailStatsMinutes(KOMReviewDetailStatsLogic.KOMReviewDetailStatsTotalMilliseconds(KOMReviewDetailStatsSpacings)) }</td>
</tr>

</table>
