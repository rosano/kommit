import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const KOMReviewDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailDispatchBack: (function _KOMReviewDetailDispatchBack () {
			window.TestKOMReviewDetailDispatchBack.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBack.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchBrowse: (function _KOMReviewDetailDispatchBrowse () {
			window.TestKOMReviewDetailDispatchBrowse.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBrowse.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchUpdate: (function _KOMReviewDetailDispatchUpdate (inputData) {
			window.TestKOMReviewDetailDispatchUpdate.innerHTML = parseInt(window.TestKOMReviewDetailDispatchUpdate.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchUpdateData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailDispatchPlay: (function _KOMReviewDetailDispatchPlay (inputData) {
			window.TestKOMReviewDetailDispatchPlay.innerHTML = parseInt(window.TestKOMReviewDetailDispatchPlay.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchPlayData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailDispatchDiscard: (function _KOMReviewDetailDispatchDiscard (inputData) {
			window.TestKOMReviewDetailDispatchDiscard.innerHTML = parseInt(window.TestKOMReviewDetailDispatchDiscard.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailDeck'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
			e[1].$KOMDeckSpacings = e[1].$KOMDeckSpacings.map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e.$KOMSpacingCard),
				});
			});
		}

		return e;
	}))),
});

export default KOMReviewDetail;
