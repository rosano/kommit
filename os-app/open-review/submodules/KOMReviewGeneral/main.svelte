<script>
export let KOMReviewGeneralSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewGeneralLogic from './ui-logic.js';
import KOMReviewLogic from '../../ui-logic.js';
import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const mod = {

	// DATA

	DataUpcomingData() {
		const grouping = KOMReviewGeneralLogic.KOMReviewGeneralUpcomingGroupByDate(KOMReviewGeneralLogic.KOMReviewGeneralUpcomingFilter(KOMReviewGeneralSpacings));

		return KOMReviewGeneralLogic.KOMReviewGeneralUpcomingDates().map(function (e) {
			return {
				KOMReviewChartElementDateBarTableRowDataKey: e,
				KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacingModel.KOMSpacingModelGroupByStatus(grouping[e] || [])).reduce(function (coll, item) {
					if (['KOMSpacingGroupingDeveloping', 'KOMSpacingGroupingMature'].includes(item[0])) {
						coll.push(KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length);
					}

					return coll;
				}, [0]).concat(0),
			};
		});
	},

	DataHistoricalData() {
		const grouping = KOMReviewGeneralLogic.KOMReviewGeneralHistoricalGroupByDate(KOMReviewGeneralLogic.KOMReviewGeneralHistoricalFilter(KOMReviewGeneralSpacings));

		return KOMReviewGeneralLogic.KOMReviewGeneralHistoricalDates().map(function (e) {
			return {
				KOMReviewChartElementDateBarTableRowDataKey: e,
				KOMReviewChartElementDateBarTableRowDataValues: Object.entries(KOMSpacingModel.KOMSpacingModelGroupChroniclesByStatus(grouping[e] || [], e)).reduce(function (coll, item) {
					return coll.concat(KOMReviewLogic.KOMReviewTotalMinutes(KOMReviewGeneralLogic.KOMReviewGeneralHistoricalTotalMilliseconds(item[1])));
				}, [0]).concat(0),
			};
		});
	},

	DataCollectionData() {
		return Object.entries(KOMSpacingModel.KOMSpacingModelGroupByStatus(KOMReviewGeneralSpacings)).reduce(function (coll, item) {
			coll[item[0]] = KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]);

			return coll;
		}, {});
	},

};

import KOMReviewChartCompositionCollection from '../KOMReviewChartCompositionCollection/main.svelte';
import KOMReviewChartElementDateBarTable from '../KOMReviewChartElementDateBarTable/main.svelte';
</script>

<div class="KOMReviewGeneral">

{#if KOMReviewGeneralLogic.KOMReviewGeneralUpcomingFilter(KOMReviewGeneralSpacings).length }

<div class="KOMReviewGeneralUpcoming">
	<h2 class="KOMReviewGeneralUpcomingHeading">{ OLSKLocalized('KOMReviewGeneralUpcomingHeadingText') }</h2>

	<KOMReviewChartElementDateBarTable KOMReviewChartElementDateBarTableData={ mod.DataUpcomingData() } />
</div>
	
{/if}

{#if KOMReviewGeneralLogic.KOMReviewGeneralHistoricalFilter(KOMReviewGeneralSpacings).length }

<div class="KOMReviewGeneralHistorical">
	<h2 class="KOMReviewGeneralHistoricalHeading">{ OLSKLocalized('KOMReviewGeneralHistoricalHeadingText') }</h2>

	<KOMReviewChartElementDateBarTable KOMReviewChartElementDateBarTableData={ mod.DataHistoricalData() } />
</div>
	
{/if}

<div class="KOMReviewGeneralCollection">
	<h2 class="KOMReviewGeneralCollectionHeading">{ OLSKLocalized('KOMReviewGeneralCollectionHeadingText') }</h2>

	<KOMReviewChartCompositionCollection KOMReviewChartCompositionCollectionData={ mod.DataCollectionData() } />
</div>

</div>
