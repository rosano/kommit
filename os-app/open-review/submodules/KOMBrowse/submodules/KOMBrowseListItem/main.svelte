<script>
export let KOMBrowseListItemAccessibilitySummary;
export let KOMBrowseListItemTitle;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<div class="KOMBrowseListItem" aria-label={ KOMBrowseListItemAccessibilitySummary } role="button">

<strong class="KOMBrowseListItemTitle" aria-hidden="true">{ KOMBrowseListItemTitle }</strong>

</div>

<style>	
.KOMBrowseListItem {
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

.KOMBrowseListItemTitle {
	display: inline-block;
}
</style>
