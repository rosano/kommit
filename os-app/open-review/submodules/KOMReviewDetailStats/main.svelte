<script>
export let KOMReviewDetailStatsSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<table class="KOMReviewDetailStats">

<tr>
	<td class="KOMReviewDetailStatsTotalCardsLabel">{ OLSKLocalized('KOMReviewDetailStatsTotalCardsLabelText') }</td>
	<td></td>
</tr>

</table>