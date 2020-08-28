<script>
export let KOMReviewTodayTotalCards;
export let KOMReviewTodayTimeMinutes;
export let KOMReviewTodayReviewAccuracy;
export let KOMReviewGeneralSpacings;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import KOMReviewToday from '../KOMReviewToday/main.svelte';
import KOMReviewGeneral from '../KOMReviewGeneral/main.svelte';
</script>

<div class="KOMReviewStats">
	<h1 class="KOMReviewStatsHeading">{ OLSKLocalized('KOMReviewStatsHeadingText') }</h1>

	{#if KOMReviewTodayTotalCards }
		<KOMReviewToday
			KOMReviewTodayTotalCards={ KOMReviewTodayTotalCards }
			KOMReviewTodayTimeMinutes={ KOMReviewTodayTimeMinutes }
			KOMReviewTodayReviewAccuracy={ KOMReviewTodayReviewAccuracy }
			/>
	{/if}

	<KOMReviewGeneral KOMReviewGeneralSpacings={ KOMReviewGeneralSpacings } />
</div>
