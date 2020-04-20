import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['KOMBrowseInfoItem'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	return e;
}));

const mod = {

	// REACT

	ReactDetailItem (inputData) {
		window.TestKOMBrowseInfoItem.innerHTML = JSON.stringify(inputData);
	},

	// SETUP

	SetupEverything() {
		mod.ReactDetailItem(params.KOMBrowseInfoItem);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},
	
};
	
mod.LifecycleModuleDidLoad();

const KOMBrowseInfo = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseInfoDispatchBack: (function _KOMBrowseInfoDispatchBack () {
			window.TestKOMBrowseInfoDispatchBack.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchBack.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchDiscard: (function _KOMBrowseInfoDispatchDiscard (inputData) {
			window.TestKOMBrowseInfoDispatchDiscard.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchDiscard.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchUpdate: (function _KOMBrowseInfoDispatchUpdate () {
			window.TestKOMBrowseInfoDispatchUpdate.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchUpdate.innerHTML) + 1;

			mod.ReactDetailItem(params.KOMBrowseInfoItem);
		}),
	}, params),
});

export default KOMBrowseInfo;
