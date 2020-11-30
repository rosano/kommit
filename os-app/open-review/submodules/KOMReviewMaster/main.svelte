<script>
export let KOMReviewMasterItems;
export let KOMReviewMasterDispatchCreate;
export let KOMReviewMasterDispatchSelect;
export let KOMReviewMasterDispatchToggleExcludeTripleQuestionMark;
export let KOMReviewMasterDispatchToggleDeckFiguresCaching;
export let KOMReviewMasterDispatchImportData;
export let KOMReviewMasterDispatchExportData;
export let KOMReviewMaster_DebugShowLauncherButton = false;

export const modPublic = {

	KOMReviewMasterRecipes () {
		return mod.DataReviewMasterRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// DATA

	DataUnseenCount (inputData) {
		return inputData.reduce(function (coll, item) {
			return coll + (item.$KOMDeckGeneralNotUnseenCount || 0);
		}, 0);
	},

	DataTodayParameters (inputData) {
		const filtered = inputData.filter(function (e) {
			return e.$KOMReviewTodayTotalCards;
		});

		return (function(obj) {
			return Object.assign(obj, {
				KOMReviewTodayTimeMinutes: Math.round(obj.KOMReviewTodayTimeMinutes * 10) / 10,
				KOMReviewTodayReviewAccuracy: Math.round(obj.KOMReviewTodayReviewAccuracy / filtered.length * 10) / 10,
			});
		})(filtered.reduce(function (coll, item) {
			return Object.assign(coll, {
				KOMReviewTodayTotalCards: coll.KOMReviewTodayTotalCards + item.$KOMReviewTodayTotalCards,
				KOMReviewTodayTimeMinutes: coll.KOMReviewTodayTimeMinutes + item.$KOMReviewTodayTimeMinutes,
				KOMReviewTodayReviewAccuracy: coll.KOMReviewTodayReviewAccuracy + item.$KOMReviewTodayReviewAccuracy,
			});
		}, {
			KOMReviewTodayTotalCards: 0,
			KOMReviewTodayTimeMinutes: 0,
			KOMReviewTodayReviewAccuracy: 0,
		}));
	},

	DataGeneralParameters (inputData) {
		const filtered = inputData.filter(function (e) {
			return e.$KOMDeckGeneralNotUnseenCount;
		});

		return {
			KOMReviewGeneralUpcomingData: Object.entries(filtered.reduce(function (coll, item) {
				return item.$KOMReviewGeneralUpcomingData.reduce(function (coll, item) {
					return Object.assign(coll, {
						[item.KOMReviewChartElementDateBarTableRowDataKey]: coll[item.KOMReviewChartElementDateBarTableRowDataKey] ? coll[item.KOMReviewChartElementDateBarTableRowDataKey].map(function (e, i) {
							return e + item.KOMReviewChartElementDateBarTableRowDataValues[i];
						}) : item.KOMReviewChartElementDateBarTableRowDataValues,
					});
				}, coll);
			}, {})).map(function (e) {
				return {
					KOMReviewChartElementDateBarTableRowDataKey: e[0],
					KOMReviewChartElementDateBarTableRowDataValues: e[1],
				}
			}),
			KOMReviewGeneralHistoricalData: Object.entries(filtered.reduce(function (coll, item) {
				return item.$KOMReviewGeneralHistoricalData.reduce(function (coll, item) {
					return Object.assign(coll, {
						[item.KOMReviewChartElementDateBarTableRowDataKey]: coll[item.KOMReviewChartElementDateBarTableRowDataKey] ? coll[item.KOMReviewChartElementDateBarTableRowDataKey].map(function (e, i) {
							return e + item.KOMReviewChartElementDateBarTableRowDataValues[i];
						}) : item.KOMReviewChartElementDateBarTableRowDataValues,
					});
				}, coll);
			}, {})).map(function (e) {
				return {
					KOMReviewChartElementDateBarTableRowDataKey: e[0],
					KOMReviewChartElementDateBarTableRowDataValues: e[1],
				}
			}),
			KOMReviewChartCompositionCollectionData: filtered.reduce(function (coll, item) {
				return Object.assign(coll, {
					KOMSpacingGroupingTotal: coll.KOMSpacingGroupingTotal + item.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal,
					KOMSpacingGroupingUnseen: coll.KOMSpacingGroupingUnseen + item.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingUnseen,
					KOMSpacingGroupingDeveloping: coll.KOMSpacingGroupingDeveloping + item.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingDeveloping,
					KOMSpacingGroupingMature: coll.KOMSpacingGroupingMature + item.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingMature,
					KOMSpacingGroupingRetired: coll.KOMSpacingGroupingRetired + item.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingRetired,
				});
			}, {
				KOMSpacingGroupingTotal: 0,
				KOMSpacingGroupingUnseen: 0,
				KOMSpacingGroupingDeveloping: 0,
				KOMSpacingGroupingMature: 0,
				KOMSpacingGroupingRetired: 0,
			}),
		};
	},

	DataReviewMasterRecipes () {
		const items = [{
			LCHRecipeSignature: 'KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark',
			LCHRecipeName: OLSKLocalized('KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMarkText'),
			LCHRecipeCallback: function KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMark () {
				return KOMReviewMasterDispatchToggleExcludeTripleQuestionMark();
			},
		}, {
			LCHRecipeSignature: 'KOMReviewMasterLauncherItemToggleDeckFiguresCaching',
			LCHRecipeName: OLSKLocalized('KOMReviewMasterLauncherItemToggleDeckFiguresCachingText'),
			LCHRecipeCallback: function KOMReviewMasterLauncherItemToggleDeckFiguresCaching () {
				return KOMReviewMasterDispatchToggleDeckFiguresCaching();
			},
		}, {
			LCHRecipeSignature: 'KOMReviewMasterLauncherItemImportData',
			LCHRecipeName: OLSKLocalized('KOMReviewMasterLauncherItemImportDataText'),
			LCHRecipeCallback: function KOMReviewMasterLauncherItemImportData () {
				return KOMReviewMasterDispatchImportData();
			},
		}, {
			LCHRecipeSignature: 'KOMReviewMasterLauncherItemExportData',
			LCHRecipeName: OLSKLocalized('KOMReviewMasterLauncherItemExportDataText'),
			LCHRecipeCallback: function KOMReviewMasterLauncherItemExportData () {
				return KOMReviewMasterDispatchExportData();
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

	// MESSAGES

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataReviewMasterRecipes(),
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

<div class="KOMReviewMasterBodyItems">
	{#each KOMReviewMasterItems as e}
		<KOMReviewMasterListItem
			KOMReviewMasterListItemName={ e.KOMDeckName }
			KOMReviewMasterListItemReviewCount={ e.$KOMDeckTodayReviewCount }
			KOMReviewMasterListItemUnseenCount={ e.$KOMDeckTodayUnseenCount }
			KOMReviewMasterListItemDispatchClick={ () => KOMReviewMasterDispatchSelect(e) }
			/>
	{/each}
</div>

<p>
	<button class="KOMReviewMasterCreateButton OLSKCommonButton" on:click={ KOMReviewMasterDispatchCreate } accesskey="n">{ OLSKLocalized('KOMReviewMasterCreateButtonText') }</button>
</p>

{#if KOMReviewMasterItems.length && mod.DataUnseenCount(KOMReviewMasterItems) }
	<hr role="presentation" />

	<KOMReviewStats
		{... mod.DataTodayParameters(KOMReviewMasterItems) }
		{... mod.DataGeneralParameters(KOMReviewMasterItems) }
		/>
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

.KOMReviewMasterBodyItems {
	/* KOMReviewMasterBodyItemsFlexbox:Parent */
	display: flex;
	flex-wrap: wrap;
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
