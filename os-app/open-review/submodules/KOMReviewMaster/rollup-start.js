import RollupStart from './main.svelte';

import KOMCardModel from '../../../_shared/KOMCard/model.js';
import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const KOMReviewMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewMasterListItems: [],
		KOMReviewMasterDispatchCreate (inputData) {
			window.TestKOMReviewMasterDispatchCreate.innerHTML = parseInt(window.TestKOMReviewMasterDispatchCreate.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchCreateData.innerHTML = inputData;
		},
		KOMReviewMasterDispatchSelect (inputData) {
			window.TestKOMReviewMasterDispatchSelect.innerHTML = parseInt(window.TestKOMReviewMasterDispatchSelect.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchSelectData.innerHTML = JSON.stringify(inputData);
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewMasterListItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(function (e) {
				return Object.assign(e, {
					$KOMDeckSpacings: (e.$KOMDeckSpacings || []).map(KOMSpacingModel.KOMSpacingModelPostJSONParse).map(function (e) {
						if (!e.$KOMSpacingCard) {
							return e;
						}

						return Object.assign(e, {
							$KOMSpacingCard: KOMCardModel.KOMCardModelPostJSONParse(e.$KOMSpacingCard),
						})
					}),
				});
			});
		}

		return e;
	}))),
});

export default KOMReviewMaster;
