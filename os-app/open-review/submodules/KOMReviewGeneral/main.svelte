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
		let maximum = 0;

		const updateMaximum = function (inputData) {
			const total = inputData.reduce(function (coll, item) {
				return coll + item;
			}, 0);

			if (total > maximum) {
				maximum = total;
			}

			return inputData;
		};

		const grouping = KOMReviewGeneralLogic.KOMReviewGeneralUpcomingGroupByDate(KOMReviewGeneralLogic.KOMReviewGeneralUpcomingFilter(KOMReviewGeneralSpacings));

		return {
			KOMReviewChartElementDateBarTableData: KOMReviewGeneralLogic.KOMReviewGeneralUpcomingDates().map(function (e) {
				return {
					KOMReviewChartElementDateBarTableRowDataKey: e,
					KOMReviewChartElementDateBarTableRowDataValues: updateMaximum(Object.entries(KOMSpacingModel.KOMSpacingModelGroupByStatus(grouping[e] || [])).reduce(function (coll, item) {
						if (['KOMSpacingGroupingDeveloping', 'KOMSpacingGroupingMature'].includes(item[0])) {
							coll.push(KOMSpacingModel.KOMSpacingModelFilterUnique(item[1]).length);
						}

						return coll;
					}, [0]).concat(0)),
				};
			}),
			KOMReviewChartElementHorizontalStackedBarMaximum: maximum,
		}
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

<div class="KOMReviewGeneralUpcoming">
	<h2 class="KOMReviewGeneralUpcomingHeading">{ OLSKLocalized('KOMReviewGeneralUpcomingHeadingText') }</h2>

	<KOMReviewChartElementDateBarTable { ...mod.DataUpcomingData() } />
</div>

<div class="KOMReviewGeneralCollection">
	<h2 class="KOMReviewGeneralCollectionHeading">{ OLSKLocalized('KOMReviewGeneralCollectionHeadingText') }</h2>

	<KOMReviewChartCompositionCollection KOMReviewChartCompositionCollectionData={ mod.DataCollectionData() } />
</div>

</div>
