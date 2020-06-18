<script>
export let KOMReviewTodaySpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewTodayLogic from './ui-logic.js';
</script>

<table class="KOMReviewToday">

<tr>
	<td class="KOMReviewTodayTotalCardsLabel">{ OLSKLocalized('KOMReviewTodayTotalCardsLabelText') }</td>
	<td class="KOMReviewTodayTotalCardsValue">{ KOMReviewTodayLogic.KOMReviewTodayTotalCards(KOMReviewTodaySpacings) }</td>
</tr>

<tr>
	<td class="KOMReviewTodayTimeMinutesLabel">{ OLSKLocalized('KOMReviewTodayTimeMinutesLabelText') }</td>
	<td class="KOMReviewTodayTimeMinutesValue">{ KOMReviewTodayLogic.KOMReviewTodayMinutes(KOMReviewTodayLogic.KOMReviewTodayTotalMilliseconds(KOMReviewTodaySpacings)) }</td>
</tr>

<tr>
	<td class="KOMReviewTodayReviewAccuracyLabel">{ OLSKLocalized('KOMReviewTodayReviewAccuracyLabelText') }</td>
	<td class="KOMReviewTodayReviewAccuracyValue">{ KOMReviewTodayLogic.KOMReviewTodayPercentage(KOMReviewTodayLogic.KOMReviewTodayReviewAccuracy(KOMReviewTodaySpacings)) }</td>
</tr>

</table>

<style>
td:first-child {
	font-style: oblique;
}

td:last-child {
	font-style: oblique;
	padding: 0 10px;
}
</style>
