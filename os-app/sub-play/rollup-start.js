import RollupStart from './main.svelte';

import KOMCardModel from '../_shared/KOMCard/model.js';
import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const KOMPlay = new RollupStart({
	target: document.getElementById('Target'),
	props: Object.assign({
		KOMPlaySpacings: [],
		KOMPlayDispatchDone: (function _KOMPlayDispatchDone () {
			window.TestKOMPlayDispatchDone.innerHTML = parseInt(window.TestKOMPlayDispatchDone.innerHTML) + 1;
		}),
		KOMPlayDispatchUpdate: (function _KOMPlayDispatchUpdate (inputData) {
			window.TestKOMPlayDispatchUpdate.innerHTML = parseInt(window.TestKOMPlayDispatchUpdate.innerHTML) + 1;
			window.TestKOMPlayDispatchUpdateData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMPlaySpacings'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(KOMSpacingModel.KOMSpacingModelPostJSONParse).map(function (e) {
				return Object.assign(e, {
					$KOMSpacingCard: KOMCardModel.KOMCardModelPostJSONParse(e.$KOMSpacingCard),
				});
			});
		}

		return e;
	}))),
});

export default KOMPlay;
