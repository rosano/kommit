import RollupStart from './main.svelte';

import KOMCardModel from '../../../_shared/KOMCard/model.js';
import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const KOMReviewDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewDetailDispatchBack: (function _KOMReviewDetailDispatchBack () {
			window.TestKOMReviewDetailDispatchBack.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBack.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchDiscard: (function _KOMReviewDetailDispatchDiscard (inputData) {
			window.TestKOMReviewDetailDispatchDiscard.innerHTML = parseInt(window.TestKOMReviewDetailDispatchDiscard.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailDispatchRename: (function _KOMReviewDetailDispatchRename (inputData) {
			window.TestKOMReviewDetailDispatchRename.innerHTML = parseInt(window.TestKOMReviewDetailDispatchRename.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchRenameData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewDetailDispatchBrowse: (function _KOMReviewDetailDispatchBrowse () {
			window.TestKOMReviewDetailDispatchBrowse.innerHTML = parseInt(window.TestKOMReviewDetailDispatchBrowse.innerHTML) + 1;
		}),
		KOMReviewDetailDispatchPlay: (function _KOMReviewDetailDispatchPlay (inputData) {
			window.TestKOMReviewDetailDispatchPlay.innerHTML = parseInt(window.TestKOMReviewDetailDispatchPlay.innerHTML) + 1;
			window.TestKOMReviewDetailDispatchPlayData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewDetailDeck'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
			e[1].$KOMDeckSpacings = e[1].$KOMDeckSpacings.map(KOMSpacingModel.KOMSpacingModelPostJSONParse).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: KOMCardModel.KOMCardModelPostJSONParse(e.$KOMSpacingCard),
				})
			});
		}

		return e;
	}))),
});

export default KOMReviewDetail;
