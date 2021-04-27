<script>
export let KOMBrowseListItemObject;

import { OLSKLocalized } from 'OLSKInternational';
</script>

<div class="KOMBrowseListItem">

{#if KOMBrowseListItemObject.KOMCardIsRetired }
	<span class="KOMBrowseListItemRetired">{ OLSKLocalized('KOMBrowseListItemRetiredText') }</span>
{/if}

<strong class="KOMBrowseListItemFront">{ KOMBrowseListItemObject.KOMCardFrontText }</strong><br>
<span class="KOMBrowseListItemRear">{ KOMBrowseListItemObject.KOMCardRearText }</span><br>
<span class="KOMBrowseListItemTags">{ (KOMBrowseListItemObject.KOMCardTags || []).join(', ') }</span>

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
