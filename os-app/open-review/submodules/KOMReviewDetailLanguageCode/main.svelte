<script>
export let KOMReviewDetailLanguageCodeItem;
export let KOMReviewDetailLanguageCodeItemProperty;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<label class="KOMReviewDetailLanguageCode">
	<span class="KOMReviewDetailLanguageCodeFieldLabel">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldLabelText') }</span>
	<select class="KOMReviewDetailLanguageCodeField">
		<option class="KOMReviewDetailLanguageCodeFieldOptionPlaceholder" value="">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionPlaceholderText') }</option>
		<option class="KOMReviewDetailLanguageCodeFieldOptionDefault" value="DEFAULT_LANGUAGE">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionDefaultText') }</option>
	</select>
</label>

<style>	
.KOMReviewDetailLanguageCode {
	padding: 4px;
	border: var(--KOMBorderStyle);

	margin: 4px;
}
</style>
