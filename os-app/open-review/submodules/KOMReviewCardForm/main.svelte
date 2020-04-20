<script>
export let KOMReviewCardFormItem;
export let KOMReviewCardFormDispatchCancel;
export let KOMReviewCardFormDispatchSave;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceSaveButtonDidClick() {
		KOMReviewCardFormDispatchSave({});
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="KOMReviewCardForm">

<header class="KOMReviewCardFormToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMReviewCardFormToolbarCancelButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewCardFormDispatchCancel }>{ OLSKLocalized('KOMReviewCardFormToolbarCancelButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMReviewCardFormToolbarSaveButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('KOMReviewCardFormToolbarSaveButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div>

<h1 class="KOMReviewCardFormHeading">{ OLSKLocalized('KOMReviewCardFormHeadingText') }</h1>

</div>

</div>

<style>
.KOMReviewCardForm {
	/* KOMReviewCardFormFlexbox:Parent */
	display: flex;
	flex-direction: column;
}
</style>
