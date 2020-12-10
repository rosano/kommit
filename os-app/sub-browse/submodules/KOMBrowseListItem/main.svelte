<script>
export let KOMBrowseListItemObject;

import { OLSKLocalized } from 'OLSKInternational';
</script>

<div class="KOMBrowseListItem OLSKCommonEdgeBottom">

{#if KOMBrowseListItemObject.KOMCardIsRetired }
	<span class="KOMBrowseListItemRetired">{ OLSKLocalized('KOMBrowseListItemRetiredText') }</span>
{/if}

<strong class="KOMBrowseListItemFront" aria-hidden="true">{ KOMBrowseListItemObject.KOMCardFrontText }</strong><br>
<span class="KOMBrowseListItemRear" aria-hidden="true">{ KOMBrowseListItemObject.KOMCardRearText }</span><br>
<span class="KOMBrowseListItemTags" aria-hidden="true">{ (KOMBrowseListItemObject.KOMCardTags || []).join(', ') }</span>

</div>

<style>	
.KOMBrowseListItem {
	min-height: 46px;
	padding: 10px;

	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

.KOMBrowseListItemFront {
	display: inline-block;
}

.KOMBrowseListItemTags {
	opacity: 0.5;
}
</style>
