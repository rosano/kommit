<script>
export let KOMReviewMasterListItemName;
export let KOMReviewMasterListItemReviewCount;
export let KOMReviewMasterListItemUnseenCount;
export let KOMReviewMasterListItemDispatchClick;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<button class="KOMReviewMasterListItem OLSKCommonButton" aria-label={ KOMReviewMasterListItemName } on:click={ KOMReviewMasterListItemDispatchClick }>

<strong class="KOMReviewMasterListItemName">{ KOMReviewMasterListItemName }</strong>

<div>
	<span class="KOMReviewMasterListItemReviewValue">{ KOMReviewMasterListItemReviewCount }</span>
	<span class="KOMReviewMasterListItemReviewLabel">{ OLSKLocalized('KOMReviewMasterListItemReviewLabelText') }</span><br>

	<span class="KOMReviewMasterListItemUnseenValue">{ KOMReviewMasterListItemUnseenCount }</span>
	<span class="KOMReviewMasterListItemUnseenLabel">{ OLSKLocalized('KOMReviewMasterListItemUnseenLabelText') }</span>
</div>

</button>

<style>
.KOMReviewMasterListItem {
	display: block;
	width: 100%;
	min-height: 46px;
	padding: var(--KOMCommonPadding);
	border: 1px solid rgba(0, 0, 0, 0.1);

	margin-bottom: var(--KOMCommonPadding);

	text-align: left;

	/* KOMReviewMasterListItemFlexbox:Parent */
	display: flex;
}

.KOMReviewMasterListItemName {
	padding-right: var(--KOMCommonPadding);

	text-align: right;
	font-size: 14pt;

	/* KOMReviewMasterListItemFlexbox:Parent */
	flex-basis: 30%;
	align-self: center;
}

.KOMReviewMasterListItem:active {
	color: inherit;
}

.KOMReviewMasterListItemTitle {
	display: inline-block;
}
</style>
