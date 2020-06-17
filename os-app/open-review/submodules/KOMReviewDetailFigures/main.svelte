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
	<td class="KOMReviewDetailFiguresTotalMinutesLabel">{ OLSKLocalized('KOMReviewDetailFiguresTotalMinutesLabelText') }</td>
	<td class="KOMReviewDetailFiguresTotalMinutesValue">{ KOMReviewDetailFiguresLogic.KOMReviewDetailFiguresMinutes(KOMReviewDetailFiguresLogic.KOMReviewDetailFiguresTotalMilliseconds(KOMReviewDetailFiguresSpacings)) }</td>
</tr>

</table>
