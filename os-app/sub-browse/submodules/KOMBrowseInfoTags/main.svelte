<script>
export let KOMBrowseInfoTagsItems;
export let KOMBrowseInfoTagsSuggestions = [];
export let KOMBrowseInfoTagsDispatchAdd;
export let KOMBrowseInfoTagsDispatchRemove;

import { OLSKLocalized } from 'OLSKInternational';
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
		<button class="KOMBrowseInfoTagsRemoveButton" on:click={ () =>  KOMBrowseInfoTagsDispatchRemove(item) }>{ OLSKString.OLSKStringFormatted(OLSKLocalized('KOMBrowseInfoTagsRemoveButtonTextFormat'), item) }</button>
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
		<button class="KOMBrowseInfoTagsSuggestButton" on:click={ () =>  KOMBrowseInfoTagsDispatchAdd(item) }>{ OLSKString.OLSKStringFormatted(OLSKLocalized('KOMBrowseInfoTagsSuggestButtonTextFormat'), item) }</button>
	{/each}
</p>

</div>
