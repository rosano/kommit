<script>
export let KOMReviewMasterListItemObject;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';
</script>

<div class="KOMReviewMasterListItem" role="button" tabindex="0" aria-label={ KOMReviewMasterListItemObject.KOMDeckName }>

<strong class="KOMReviewMasterListItemName">{ KOMReviewMasterListItemObject.KOMDeckName }</strong><br>

<span class="KOMReviewMasterListItemReviewValue">{ KOMSpacingModel.KOMSpacingModelFilterUnique(KOMReviewMasterListItemObject.$KOMDeckSpacings.filter(function (KOMReviewMasterListItemObject) {
	return !KOMSpacingModel.KOMSpacingModelIsUnseen(KOMReviewMasterListItemObject);
})).length }</span>
<span class="KOMReviewMasterListItemReviewLabel">{ OLSKLocalized('KOMReviewMasterListItemReviewLabelText') }</span><br>

<span class="KOMReviewMasterListItemUnseenValue">{ KOMSpacingModel.KOMSpacingModelFilterUnique(KOMReviewMasterListItemObject.$KOMDeckSpacings.filter(KOMSpacingModel.KOMSpacingModelIsUnseen)).length }</span>
<span class="KOMReviewMasterListItemUnseenLabel">{ OLSKLocalized('KOMReviewMasterListItemUnseenLabelText') }</span>

</div>

<style>	
.KOMReviewMasterListItem {
	min-height: 46px;
	padding: 10px;
	border-bottom: var(--KOMBorderStyle);

	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

.KOMReviewMasterListItemTitle {
	display: inline-block;
}
</style>
