<script>
export let KOMReviewMasterListItems;
export let KOMReviewMasterDispatchCreate;
export let KOMReviewMasterDispatchSelect;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewMasterCreateButtonPromptText'));
		
		if (!outputData) {
			return;
		}

		KOMReviewMasterDispatchCreate(outputData);
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="KOMReviewMaster">

<header class="KOMReviewMasterToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<span class="KOMReviewMasterToolbarTitle">{ OLSKLocalized('KOMReviewMasterToolbarTitleText') }</span>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="KOMReviewMasterBody">
{#each KOMReviewMasterListItems as e}
	<div class="KOMReviewMasterListItem" role="button" tabindex="0" on:click={ () => KOMReviewMasterDispatchSelect(e) } on:keypress={ (event) => event.which === 13 && KOMReviewMasterDispatchSelect(e) } aria-label={ e.KOMDeckName }>
		<strong class="KOMReviewMasterListItemName">{ e.KOMDeckName }</strong><br>
		<span class="KOMReviewMasterListItemUnseenValue">0</span>
		<span class="KOMReviewMasterListItemUnseenLabel">{ OLSKLocalized('KOMReviewMasterListItemUnseenLabelText') }</span>
	</div>
{/each}

<button class="KOMReviewMasterCreateButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }
</button>
</div>

</div>

<style>
.KOMReviewMaster {
	/* OLSKViewportContentFlexbox:Child */
	flex-grow: 1;
}

.KOMReviewMasterToolbar {
	border-bottom: var(--KOMBorderStyle);
}

.KOMReviewMasterToolbar :global(.OLSKToolbar) {
	/* OLSKToolbarFlexbox:Parent */
	justify-content: center;
}

.KOMReviewMasterToolbarTitle {
	display: block;
	padding: 7px;

	font-size: 14px;
}

.KOMReviewMasterBody {
	padding: 10px;
}

.KOMReviewMasterListItem {
	display: block;
	margin-bottom: 10px;
	padding: 10px;
	border: 1px solid rgba(0, 0, 0, 0.1);

	clear: both;

	cursor: pointer;
}
</style>
