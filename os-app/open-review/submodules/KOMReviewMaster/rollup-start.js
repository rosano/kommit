import RollupStart from './main.svelte';

const KOMReviewMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewMasterItems: [],
		KOMReviewMasterDispatchCreate: (function () {
			window.TestKOMReviewMasterDispatchCreate.innerHTML = parseInt(window.TestKOMReviewMasterDispatchCreate.innerHTML) + 1;
		}),
		KOMReviewMasterDispatchSelect: (function (inputData) {
			window.TestKOMReviewMasterDispatchSelect.innerHTML = parseInt(window.TestKOMReviewMasterDispatchSelect.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchSelectData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewMasterDispatchToggleExcludeTripleQuestionMark: (function () {
			window.TestKOMReviewMasterDispatchToggleExcludeTripleQuestionMark.innerHTML = parseInt(window.TestKOMReviewMasterDispatchToggleExcludeTripleQuestionMark.innerHTML) + 1;
		}),
		KOMReviewMasterDispatchToggleDeckFiguresCaching: (function () {
			window.TestKOMReviewMasterDispatchToggleDeckFiguresCaching.innerHTML = parseInt(window.TestKOMReviewMasterDispatchToggleDeckFiguresCaching.innerHTML) + 1;
		}),
		KOMReviewMasterDispatchImportData: (function (inputData) {
			window.TestKOMReviewMasterDispatchImportData.innerHTML = parseInt(window.TestKOMReviewMasterDispatchImportData.innerHTML) + 1;
			window.TestKOMReviewMasterDispatchImportDataData.innerHTML = JSON.stringify(inputData);
		}),
		KOMReviewMasterDispatchExportData: (function () {
			window.TestKOMReviewMasterDispatchExportData.innerHTML = parseInt(window.TestKOMReviewMasterDispatchExportData.innerHTML) + 1;
		}),
		KOMReviewMaster_DebugShowLauncherButton: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewMasterItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMReviewMaster;
