<script>
export let KOMReviewTodayTotalCards;
export let KOMReviewTodayTimeMinutes;
export let KOMReviewTodayReviewAccuracy;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<div class="KOMReviewToday">

<h2 class="KOMReviewTodayHeading">{ OLSKLocalized('KOMReviewTodayHeadingText') }</h2>

<table>

<tr>
	<td class="KOMReviewTodayTotalCardsLabel">{ OLSKLocalized('KOMReviewTodayTotalCardsLabelText') }</td>
	<td class="KOMReviewTodayTotalCardsValue">{ KOMReviewTodayTotalCards }</td>
</tr>

<tr>
	<td class="KOMReviewTodayTimeMinutesLabel">{ OLSKLocalized('KOMReviewTodayTimeMinutesLabelText') }</td>
	<td class="KOMReviewTodayTimeMinutesValue">{ KOMReviewTodayTimeMinutes }</td>
</tr>

<tr>
	<td class="KOMReviewTodayReviewAccuracyLabel">{ OLSKLocalized('KOMReviewTodayReviewAccuracyLabelText') }</td>
	<td class="KOMReviewTodayReviewAccuracyValue">{ KOMReviewTodayReviewAccuracy }</td>
</tr>

</table>

</div>

<style>
td:first-child {
	font-style: oblique;
}

td:last-child {
	font-style: oblique;
	padding: 0 10px;
}
</style>
