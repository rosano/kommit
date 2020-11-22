<script>
export let KOMReviewDetailLanguageCodeItem;
export let KOMReviewDetailLanguageCodeItemProperty;
export let KOMReviewDetailLanguageCodeOptions;
export let KOMReviewDetailLanguageCodeDispatchUpdate;

import { OLSKLocalized } from 'OLSKInternational';

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

	// REACT

	ReactItemDidChange (inputData) {
		mod._ValueLanguageCode = inputData[KOMReviewDetailLanguageCodeItemProperty];
	},

};

// $: mod.ReactItemDidChange(KOMReviewDetailLanguageCodeItem)
</script>

<label class="KOMReviewDetailLanguageCode">
	<span class="KOMReviewDetailLanguageCodeFieldLabel">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldLabelText') }</span>
	<select class="KOMReviewDetailLanguageCodeField" bind:value={ mod._ValueLanguageCode } tabindex={ KOMReviewDetailLanguageCodeItem[KOMReviewDetailLanguageCodeItemProperty] ? -1 : null } on:change={ mod.InterfaceFieldDidChange }>
		<option class="KOMReviewDetailLanguageCodeFieldOptionUnspecified" value="">{ OLSKLocalized('KOMReviewDetailLanguageCodeFieldOptionUnspecifiedText') }</option>
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
