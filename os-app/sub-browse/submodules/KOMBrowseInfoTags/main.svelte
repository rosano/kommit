<script>
export let KOMBrowseInfoTagsItems;
export let KOMBrowseInfoTagsSuggestions = [];
export let KOMBrowseInfoTagsDispatchAdd;
export let KOMBrowseInfoTagsDispatchRemove;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';

const mod = {

	// VALUE

	_ValueNewTagName: '',

	// INTERFACE

	InterfaceFormDidSubmit () {
		KOMBrowseInfoTagsDispatchAdd(mod._ValueNewTagName);

		mod._ValueNewTagName = '';

		event.preventDefault();
	},

};
</script>

<div class="KOMBrowseInfoTags">

<p>
	{#each KOMBrowseInfoTagsItems as item }
		<button class="KOMBrowseInfoTagsRemoveButton" on:click={ () =>  KOMBrowseInfoTagsDispatchRemove(item) }>{ OLSKString.OLSKStringWithFormat(OLSKLocalized('KOMBrowseInfoTagsRemoveButtonTextFormat'), item) }</button>
	{/each}
</p>

<form class="KOMBrowseInfoTagsForm" on:submit={ mod.InterfaceFormDidSubmit }>
	<p>
		<input class="KOMBrowseInfoTagsInputField OLSKMobileSafariRemoveDefaultInputStyle" type="text" bind:value={ mod._ValueNewTagName } placeholder={ OLSKLocalized('KOMBrowseInfoTagsInputFieldText') } />
	</p>
	<button class="KOMBrowseInfoTagsCreateButton" type="submit" disabled={ !mod._ValueNewTagName }>{ OLSKLocalized('KOMBrowseInfoTagsCreateButtonText') }</button>
</form>

<p>
	{#each KOMBrowseInfoTagsSuggestions as item }
		<button class="KOMBrowseInfoTagsSuggestButton" on:click={ () =>  KOMBrowseInfoTagsDispatchAdd(item) }>{ OLSKString.OLSKStringWithFormat(OLSKLocalized('KOMBrowseInfoTagsSuggestButtonTextFormat'), item) }</button>
	{/each}
</p>

</div>
