import RollupStart from './main.svelte';

import KOMCardModel from '../_shared/KOMCard/model.js';

const KOMPlay = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMPlayCards: [],
		KOMPlayDispatchBack: (function _KOMPlayDispatchBack (inputData) {
			window.TestKOMPlayDispatchBack.innerHTML = parseInt(window.TestKOMPlayDispatchBack.innerHTML) + 1;
		}),
		KOMPlayDispatchDone: (function _KOMPlayDispatchDone (inputData) {
			window.TestKOMPlayDispatchDone.innerHTML = parseInt(window.TestKOMPlayDispatchDone.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMPlayCards'].includes(e[0])) {
			e[1] = JSON.parse(e[1]).map(KOMCardModel.KOMCardModelPostJSONParse);
		}

		return e;
	}))),
});

export default KOMPlay;
