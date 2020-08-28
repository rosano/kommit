<script>
export let KOMReviewGeneralSpacings;
export let KOMReviewGeneralHistoricalData;
export let KOMReviewChartCompositionCollectionData;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewGeneralLogic from './ui-logic.js';
import KOMReviewLogic from '../../ui-logic.js';
import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';
import KOMSharedLogic from '../../../_shared/KOMSharedLogic/main.js';

const mod = {

	// DATA

	DataUpcomingData() {
		const grouping = KOMReviewGeneralLogic.KOMReviewGeneralUpcomingGroupByDate(KOMReviewGeneralLogic.KOMReviewGeneralUpcomingFilter(KOMReviewGeneralSpacings));

		return KOMReviewGeneralLogic.KOMReviewGeneralUpcomingDates().map(function (e) {
			return {
				KOMReviewChartElementDateBarTableRowDataKey: KOMSharedLogic.KOMSharedGroupingDay(new Date()) === e ? OLSKLocalized('KOMReviewGeneralTodayText') : e,
				KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacingModel.KOMSpacingModelGroupByStatus(grouping[e] || [])).reduce(function (coll, item) {
					if (['KOMSpacingGroupingDeveloping', 'KOMSpacingGroupingMature'].includes(item[0])) {
						coll.push(KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length);
					}

					return coll;
				}, []).reverse(),
			};
		});
	},

};

import KOMReviewChartCompositionCollection from '../KOMReviewChartCompositionCollection/main.svelte';
import KOMReviewChartElementDateBarTable from '../KOMReviewChartElementDateBarTable/main.svelte';
</script>

<div class="KOMReviewGeneral">

{#if KOMReviewGeneralLogic.KOMReviewGeneralUpcomingFilter(KOMReviewGeneralSpacings).length }

<div class="KOMReviewGeneralUpcoming">
	<h2 class="KOMReviewGeneralUpcomingHeading">{ OLSKLocalized('KOMReviewGeneralUpcomingHeadingText') }</h2>

	<KOMReviewChartElementDateBarTable KOMReviewChartElementDateBarTableData={ mod.DataUpcomingData() } KOMReviewChartElementHorizontalStackedBarColors={ KOMReviewGeneralLogic.KOMReviewGeneralUpcomingColors() } />
</div>
	
{/if}

{#if KOMReviewGeneralHistoricalData.length }

<div class="KOMReviewGeneralHistorical">
	<h2 class="KOMReviewGeneralHistoricalHeading">{ OLSKLocalized('KOMReviewGeneralHistoricalHeadingText') }</h2>

	<KOMReviewChartElementDateBarTable KOMReviewChartElementDateBarTableData={ KOMReviewGeneralHistoricalData } KOMReviewChartElementHorizontalStackedBarColors={ KOMReviewGeneralLogic.KOMReviewGeneralHistoricalColors() } />
</div>
	
{/if}

<div class="KOMReviewGeneralCollection">
	<h2 class="KOMReviewGeneralCollectionHeading">{ OLSKLocalized('KOMReviewGeneralCollectionHeadingText') }</h2>

	<KOMReviewChartCompositionCollection
		KOMReviewChartCompositionCollectionData={ KOMReviewChartCompositionCollectionData }
		KOMReviewChartElementHorizontalStackedBarColors={ KOMReviewGeneralLogic.KOMReviewGeneralCollectionColors() } />
</div>

</div>
