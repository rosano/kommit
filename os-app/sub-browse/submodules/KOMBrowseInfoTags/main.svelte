<script>
export let KOMBrowseInfoTagsItems;
export let KOMBrowseInfoTagsDispatchCreate;
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

	InterfaceCreateButtonDidClick () {
		KOMBrowseInfoTagsDispatchCreate(mod._ValueNewTagName);

		mod._ValueNewTagName = '';
	},

};
</script>

<div class="KOMBrowseInfoTags">

<input class="KOMBrowseInfoTagsInputField OLSKMobileSafariRemoveDefaultInputStyle" type="text" bind:value={ mod._ValueNewTagName } placeholder={ OLSKLocalized('KOMBrowseInfoTagsInputFieldText') } />

<button class="KOMBrowseInfoTagsCreateButton" on:click={ mod.InterfaceCreateButtonDidClick } disabled={ !mod._ValueNewTagName }>{ OLSKLocalized('KOMBrowseInfoTagsCreateButtonText') }</button>

{#each KOMBrowseInfoTagsItems as item }
	<button class="KOMBrowseInfoTagsRemoveButton" on:click={ () =>  KOMBrowseInfoTagsDispatchRemove(item) }>{ OLSKString.OLSKStringWithFormat(OLSKLocalized('KOMBrowseInfoTagsRemoveButtonTextFormat'), item) }</button>
{/each}

</div>
