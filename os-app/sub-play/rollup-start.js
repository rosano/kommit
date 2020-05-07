import RollupStart from './main.svelte';

import KOMCardModel from '../_shared/KOMCard/model.js';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const KOMPlay = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMPlaySpacings: [],
		KOMPlayDispatchBack: (function _KOMPlayDispatchBack () {
			window.TestKOMPlayDispatchBack.innerHTML = parseInt(window.TestKOMPlayDispatchBack.innerHTML) + 1;
		}),
		KOMPlayDispatchDone: (function _KOMPlayDispatchDone () {
			window.TestKOMPlayDispatchDone.innerHTML = parseInt(window.TestKOMPlayDispatchDone.innerHTML) + 1;
		}),
		KOMPlayDispatchRespond: (function _KOMPlayDispatchRespond (inputData) {
			window.TestKOMPlayDispatchRespond.innerHTML = parseInt(window.TestKOMPlayDispatchRespond.innerHTML) + 1;
			window.TestKOMPlayDispatchRespondData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMPlaySpacings'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(KOMSpacingModel.KOMSpacingModelPostJSONParse).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: KOMCardModel.KOMCardModelPostJSONParse(e.$KOMSpacingCard),
				})
			});
		}

		return e;
	}))),
});

export default KOMPlay;
