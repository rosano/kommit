import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['KOMBrowseInfoItem', 'KOMBrowseInfoDeck'].includes(e[0])) {
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
		KOMBrowseInfoDeck: {},
		KOMBrowseInfoDispatchBack: (function _KOMBrowseInfoDispatchBack () {
			window.TestKOMBrowseInfoDispatchBack.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchBack.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchDiscard: (function _KOMBrowseInfoDispatchDiscard (inputData) {
			window.TestKOMBrowseInfoDispatchDiscard.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchDiscard.innerHTML) + 1;
			window.TestKOMBrowseInfoDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseInfoDispatchUpdate: (function _KOMBrowseInfoDispatchUpdate () {
			window.TestKOMBrowseInfoDispatchUpdate.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchUpdate.innerHTML) + 1;

			mod.ReactDetailItem(params.KOMBrowseInfoItem);
		}),
		KOMBrowseInfoDispatchCreate: (function _KOMBrowseInfoDispatchCreate () {
			window.TestKOMBrowseInfoDispatchCreate.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchCreate.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchRead: (function _KOMBrowseInfoDispatchRead () {
			window.TestKOMBrowseInfoDispatchRead.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchRead.innerHTML) + 1;
			window.TestKOMBrowseInfoDispatchReadData.innerHTML = Array.from(arguments).join(',');
		}),
		KOMBrowseInfoAudioDispatchCapture: (function _KOMBrowseInfoAudioDispatchCapture () {
			window.TestKOMBrowseInfoAudioDispatchCapture.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchCapture.innerHTML) + 1;
		}),
		KOMBrowseInfoAudioDispatchFetch: (function _KOMBrowseInfoAudioDispatchFetch () {
			window.TestKOMBrowseInfoAudioDispatchFetch.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchFetch.innerHTML) + 1;
		}),
		KOMBrowseInfoAudioDispatchClear: (function _KOMBrowseInfoAudioDispatchClear () {
			window.TestKOMBrowseInfoAudioDispatchClear.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchClear.innerHTML) + 1;
		}),
	}, params),
});

export default KOMBrowseInfo;
