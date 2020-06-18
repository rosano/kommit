<script>
export let KOMReviewDetailFiguresSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewDetailFiguresLogic from './ui-logic.js';
</script>

<table class="KOMReviewDetailFigures">

<tr>
	<td class="KOMReviewDetailFiguresTotalCardsLabel">{ OLSKLocalized('KOMReviewDetailFiguresTotalCardsLabelText') }</td>
	<td class="KOMReviewDetailFiguresTotalCardsValue">{ KOMReviewDetailFiguresLogic.KOMReviewDetailFiguresTotalCards(KOMReviewDetailFiguresSpacings) }</td>
</tr>

<tr>
	<td class="KOMReviewDetailFiguresTimeMinutesLabel">{ OLSKLocalized('KOMReviewDetailFiguresTimeMinutesLabelText') }</td>
	<td class="KOMReviewDetailFiguresTimeMinutesValue">{ KOMReviewDetailFiguresLogic.KOMReviewDetailFiguresMinutes(KOMReviewDetailFiguresLogic.KOMReviewDetailFiguresTotalMilliseconds(KOMReviewDetailFiguresSpacings)) }</td>
</tr>

<tr>
	<td class="KOMReviewDetailFiguresReviewAccuracyLabel">{ OLSKLocalized('KOMReviewDetailFiguresReviewAccuracyLabelText') }</td>
	<td class="KOMReviewDetailFiguresReviewAccuracyValue">{ KOMReviewDetailFiguresLogic.KOMReviewDetailFiguresReviewAccuracy(KOMReviewDetailFiguresSpacings) }</td>
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
