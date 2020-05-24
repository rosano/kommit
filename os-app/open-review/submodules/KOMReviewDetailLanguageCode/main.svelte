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

	// VALUE

	_ValueLanguageCode: KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty],

	// INTERFACE

	InterfaceFieldDidChange () {
		if (!mod._ValueLanguageCode) {
			delete KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty];
		}

		if (mod._ValueLanguageCode) {
			KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty] = mod._ValueLanguageCode;
		}

		KOMReviewDetailLanguageCodeDispatchUpdate(KOMReviewDetailLanguageCodeItem);
	},

};
</script>

<label class="KOMReviewDetailLanguageCode">
	<span class="KOMReviewDetailLanguageCodeFieldLabel">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldLabelText') }</span>
	<select class="KOMReviewDetailLanguageCodeField" bind:value={ mod._ValueLanguageCode } tabindex={ KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty] ? -1 : null } on:change={ mod.InterfaceFieldDidChange }>
		<option class="KOMReviewDetailLanguageCodeFieldOptionPlaceholder" value="">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionPlaceholderText') }</option>
		<option class="KOMReviewDetailLanguageCodeFieldOptionDefault" value="DEFAULT_LANGUAGE">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionDefaultText') }</option>
		{#each KOMReviewDetailLanguageCodeOptions as item}
			<option value={ item }>{ item }</option>
		{/each}
	</select>
</label>

<style>	
.KOMReviewDetailLanguageCode {
	padding: 5px;
	border: var(--KOMBorderStyle);

	margin: 0 5px;
}
</style>
