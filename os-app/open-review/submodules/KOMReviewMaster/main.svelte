<script>
export let KOMReviewMasterListItems;
export let KOMReviewMasterDispatchCreate;
export let KOMReviewMasterDispatchSelect;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

</script>

<div class="KOMReviewMaster OLSKViewportMaster">

{#each KOMReviewMasterListItems as e}
	<button class="KOMReviewMasterListItem" on:click={ () => KOMReviewMasterDispatchSelect(e) } >{ e.KOMDeckName }</button>
{/each}

<button class="KOMReviewMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewMasterDispatchCreate } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }</button>

</div>
