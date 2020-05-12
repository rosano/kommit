<script>
export let KOMBrowseListItemQuestion;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<div class="KOMBrowseListItem">

<strong class="KOMBrowseListItemQuestion" aria-hidden="true">{ KOMBrowseListItemQuestion }</strong>

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

.KOMBrowseListItemQuestion {
	display: inline-block;
}
</style>
