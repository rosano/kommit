import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const KOMReviewMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewMasterItems: [],
		KOMReviewMasterDispatchCreate: (function _KOMReviewMasterDispatchCreate(inputData) {
			window.TestKOMReviewMasterDispatchCreate.innerHTML = parseInt(window.TestKOMReviewMasterDispatchCreate.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchCreateData.innerHTML = inputData;
		}),
		KOMReviewMasterDispatchSelect: (function _KOMReviewMasterDispatchSelect(inputData) {
			window.TestKOMReviewMasterDispatchSelect.innerHTML = parseInt(window.TestKOMReviewMasterDispatchSelect.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchSelectData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewMasterDispatchToggleExcludeTripleQuestionMark: (function _KOMReviewMasterDispatchToggleExcludeTripleQuestionMark() {
			window.TestKOMReviewMasterDispatchToggleExcludeTripleQuestionMark.innerHTML = parseInt(window.TestKOMReviewMasterDispatchToggleExcludeTripleQuestionMark.innerHTML) + 1;
		}),
		KOMReviewMaster_DebugShowLauncherButton: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewMasterItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(function (e) {
				let cards = [];

				return Object.assign(e, {
					$KOMDeckSpacings: (e.$KOMDeckSpacings || []).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse).map(function (e) {
						if (!e.$KOMSpacingCard) {
							return e;
						}

						return Object.assign(e, {
							$KOMSpacingCard: (cards = cards.concat(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e.$KOMSpacingCard))).filter(function (item) {
								return item.KOMCardID === e.$KOMSpacingCard.KOMCardID;
							}).shift(),
						});
					}),
				});
			});
		}

		return e;
	}))),
});

export default KOMReviewMaster;
