<script>
export let KOMReviewDetailLanguageCodeItem;
export let KOMReviewDetailLanguageCodeItemProperty;
export let KOMReviewDetailLanguageCodeOptions;
export let KOMReviewDetailLanguageCodeDispatchUpdate;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceFieldDidChange () {
		if (!KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty]) {
			delete KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty];
		}

		KOMReviewDetailLanguageCodeDispatchUpdate(KOMReviewDetailLanguageCodeItem);
	},

};
</script>

<label class="KOMReviewDetailLanguageCode">
	<span class="KOMReviewDetailLanguageCodeFieldLabel">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldLabelText') }</span>
	<select class="KOMReviewDetailLanguageCodeField" bind:value={ KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty] } tabindex={ KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty] ? -1 : null } on:change={ mod.InterfaceFieldDidChange }>
		<option class="KOMReviewDetailLanguageCodeFieldOptionPlaceholder" value="">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionPlaceholderText') }</option>
		<option class="KOMReviewDetailLanguageCodeFieldOptionDefault" value="DEFAULT_LANGUAGE">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionDefaultText') }</option>
		{#each KOMReviewDetailLanguageCodeOptions as item}
			<option value={ item }>{ item }</option>
		{/each}
	</select>
</label>

<style>	
.KOMReviewDetailLanguageCode {
	padding: 4px;
	border: var(--KOMBorderStyle);

	margin: 4px;
}
</style>
