<script>
export let KOMReviewMasterItems;
export let KOMReviewMasterDispatchCreate;
export let KOMReviewMasterDispatchSelect;
export let KOMReviewMasterDispatchToggleExcludeTripleQuestionMark;
export let KOMReviewMaster_DebugShowLauncherButton = false;

export const modPublic = {

	KOMReviewMasterRecipes () {
		return mod.DataRecipes();
	},

};

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// DATA

	DataUnseenCount () {
		return KOMReviewMasterItems.reduce(function (coll, item) {
			return coll + (item.$KOMDeckGeneralNotUnseenCount || 0);
		}, 0);
	},

	DataTodaySpacings () {
		return KOMReviewMasterItems.reduce(function (coll, item) {
			return coll.concat(item.$KOMDeckTodayStudiedSpacings || []);
		}, []);
	},

	DataGeneralSpacings () {
		return KOMReviewMasterItems.reduce(function (coll, item) {
			return coll.concat(item.$KOMDeckSpacings || []);
		}, []);
	},

	DataRecipes () {
		const items = [{
			LCHRecipeSignature: 'KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark',
			LCHRecipeName: OLSKLocalized('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMarkText'),
			LCHRecipeCallback: function KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark () {
				return KOMReviewMasterDispatchToggleExcludeTripleQuestionMark();
			},
		}];

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push({
				LCHRecipeName: 'KOMReviewMasterLauncherFakeItemProxy',
				LCHRecipeCallback: function KOMReviewMasterLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// INTERFACE

	InterfaceCreateButtonDidClick() {
		let outputData = window.prompt(OLSKLocalized('KOMReviewMasterCreateButtonPromptText'));
		
		if (!outputData) {
			return;
		}

		KOMReviewMasterDispatchCreate(outputData);
	},

	// MESSAGES

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataRecipes(),
		});
	},

};

import KOMReviewMasterListItem from '../KOMReviewMasterListItem/main.svelte';
import KOMReviewStats from '../KOMReviewStats/main.svelte';
</script>

<div class="KOMReviewMaster">

<header class="KOMReviewMasterToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader">
	<div class="OLSKToolbarElementGroup">
		<span class="KOMReviewMasterToolbarTitle">{ OLSKLocalized('KOMReviewMasterToolbarTitleText') }</span>
	</div>
</header>

<div class="KOMReviewMasterBody">

{#each KOMReviewMasterItems as e}
	<KOMReviewMasterListItem
		KOMReviewMasterListItemName={ e.KOMDeckName }
		KOMReviewMasterListItemReviewCount={ e.$KOMDeckTodayReviewCount }
		KOMReviewMasterListItemUnseenCount={ e.$KOMDeckTodayUnseenCount }
		KOMReviewMasterListItemDispatchClick={ () => KOMReviewMasterDispatchSelect(e) }
		/>
{/each}

<button class="KOMReviewMasterCreateButton" on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }
</button>

{#if KOMReviewMasterItems.length && mod.DataUnseenCount() }
	<hr>

	<KOMReviewStats KOMReviewTodaySpacings={ mod.DataTodaySpacings() } KOMReviewGeneralSpacings={ mod.DataGeneralSpacings() } />
{/if}

</div>

</div>

{#if OLSK_TESTING_BEHAVIOUR() && KOMReviewMaster_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.KOMReviewMaster {
	/* OLSKViewportContentFlexbox:Child */
	flex-grow: 1;
}

.KOMReviewMasterToolbar {
	border-bottom: var(--KOMBorderStyle);
}

.KOMReviewMasterToolbar.OLSKToolbar {
	/* OLSKToolbarFlexbox:Parent */
	justify-content: center;
}

.KOMReviewMasterToolbarTitle {
	display: block;
	padding: 7px;

	font-size: 14px;
}

.KOMReviewMasterBody {
	padding: var(--KOMCommonPadding);
}

:global(.OLSKIsLoading) .KOMReviewMasterBody {
	visibility: hidden;
}

hr {
	height: 1px;
	border: none;

	background: #e6e6e6;
}
</style>
