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

	<strong class="KOMReviewMasterListItemName" >{ KOMReviewMasterListItemName }</strong>

	<p>
		<span class="KOMReviewMasterListItemReviewValue">{ KOMReviewMasterListItemReviewCount }</span>
		<span class="KOMReviewMasterListItemReviewLabel">{ OLSKLocalized('KOMReviewMasterListItemReviewLabelText') }</span>
	</p>

	<p>
		<span class="KOMReviewMasterListItemUnseenValue">{ KOMReviewMasterListItemUnseenCount }</span>
		<span class="KOMReviewMasterListItemUnseenLabel">{ OLSKLocalized('KOMReviewMasterListItemUnseenLabelText') }</span>
	</p>

</button>

<style>
.KOMReviewMasterListItem {
	--KOMReviewMasterListItemSize: 110px;

	padding: var(--KOMCommonPadding);
	height: var(--KOMReviewMasterListItemSize);
	width: var(--KOMReviewMasterListItemSize);

	margin-right: var(--KOMCommonPadding);
	margin-bottom: var(--KOMCommonPadding);

	text-align: left;

	/* KOMReviewMasterListItemFlexbox:Parent */
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
}

@media screen and (max-width: 760px) {

.KOMReviewMasterListItem {
	--KOMReviewMasterListItemSize: 100px;
}

}

.KOMReviewMasterListItem p {
	margin: 0;
}

.KOMReviewMasterListItem:active {
	color: inherit;
}

.KOMReviewMasterListItemName {
	margin-bottom: var(--KOMCommonPadding);

	font-size: 16pt;
}

@media screen and (max-width: 760px) {

.KOMReviewMasterListItemName {
	font-size: 14pt;
}

}
</style>
