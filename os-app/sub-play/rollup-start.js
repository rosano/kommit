import RollupStart from './main.svelte';

import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

const KOMPlay = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMPlayItem: {},
		KOMPlayDispatchBack: (function _KOMPlayDispatchBack (inputData) {
			window.TestKOMPlayDispatchBack.innerHTML = parseInt(window.TestKOMPlayDispatchBack.innerHTML) + 1;
		}),
		KOMPlayDispatchDone: (function _KOMPlayDispatchDone (inputData) {
			window.TestKOMPlayDispatchDone.innerHTML = parseInt(window.TestKOMPlayDispatchDone.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMPlayItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
			e[1].KOMPlayStateCurrent = KOMSpacingModel.KOMSpacingModelPostJSONParse(e[1].KOMPlayStateCurrent);
			e[1].KOMPlayStateQueue = e[1].KOMPlayStateQueue.map(KOMSpacingModel.KOMSpacingModelPostJSONParse);
			e[1].KOMPlayStateWait = e[1].KOMPlayStateWait.map(KOMSpacingModel.KOMSpacingModelPostJSONParse);
		}

		return e;
	}))),
});

export default KOMPlay;
