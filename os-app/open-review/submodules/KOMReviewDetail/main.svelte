<script>
export let KOMReviewDetailItem;
export let KOMReviewDetailDispatchBack;
export let KOMReviewDetailDispatchDiscard;
export let KOMReviewDetailDispatchRename;
export let KOMReviewDetailDispatchCreateCard;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceRenameButtonDidClick() {
		mod.ControlRename();
	},

	// CONTROL

	ControlRename() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewDetailToolbarRenameButtonPromptText'), KOMReviewDetailItem.KOMDeckName);
		
		if (!outputData) {
			return;
		}

		KOMReviewDetailDispatchRename(outputData);
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="KOMReviewDetail">

<header class="KOMReviewDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ KOMReviewDetailDispatchBack }>{ OLSKLocalized('KOMReviewDetailToolbarBackButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="KOMReviewDetailToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('KOMReviewDetailDiscardPromptText')) && KOMReviewDetailDispatchDiscard(KOMReviewDetailItem) }>{ OLSKLocalized('KOMReviewDetailToolbarDiscardButtonText') }</button>
			<button class="KOMReviewDetailToolbarRenameButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ mod.InterfaceRenameButtonDidClick }>{ OLSKLocalized('KOMReviewDetailToolbarRenameButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div>

<h1 class="KOMReviewDetailHeading">{ KOMReviewDetailItem.KOMDeckName }</h1>

<button class="KOMReviewDetailCreateCardButton" on:click={ KOMReviewDetailDispatchCreateCard }>{ OLSKLocalized('KOMReviewDetailCreateCardButtonText') }</button>

</div>

</div>

<style>
.KOMReviewDetail {
	/* KOMReviewDetailFlexbox:Parent */
	display: flex;
	flex-direction: column;
}
</style>
