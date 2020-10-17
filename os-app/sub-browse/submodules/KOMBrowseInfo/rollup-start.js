import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['KOMBrowseInfoItem', 'KOMBrowseInfoDeck', 'KOMBrowseInfoSpeechAvailable', 'KOMBrowseInfoTagsSuggestions'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	return e;
}));

const mod = {

	// REACT

	ReactDetailItem(inputData) {
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
		KOMBrowseInfoTagsSuggestions: [],
		KOMBrowseInfoDispatchBack: (function () {
			window.TestKOMBrowseInfoDispatchBack.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchBack.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchDiscard: (function (inputData) {
			window.TestKOMBrowseInfoDispatchDiscard.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchDiscard.innerHTML) + 1;
			window.TestKOMBrowseInfoDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseInfoDispatchUpdate: (function () {
			window.TestKOMBrowseInfoDispatchUpdate.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchUpdate.innerHTML) + 1;

			mod.ReactDetailItem(params.KOMBrowseInfoItem);
		}),
		KOMBrowseInfoDispatchTemplate: (function (inputData) {
			window.TestKOMBrowseInfoDispatchTemplate.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchTemplate.innerHTML) + 1;
			window.TestKOMBrowseInfoDispatchTemplateData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseInfoDispatchRead: (function () {
			window.TestKOMBrowseInfoDispatchRead.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchRead.innerHTML) + 1;
			window.TestKOMBrowseInfoDispatchReadData.innerHTML = Array.from(arguments).join(',');
		}),
		KOMBrowseInfoAudioDispatchCapture: (function () {
			window.TestKOMBrowseInfoAudioDispatchCapture.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchCapture.innerHTML) + 1;
		}),
		KOMBrowseInfoAudioDispatchFetch: (function () {
			window.TestKOMBrowseInfoAudioDispatchFetch.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchFetch.innerHTML) + 1;
		}),
		KOMBrowseInfoAudioDispatchClear: (function () {
			window.TestKOMBrowseInfoAudioDispatchClear.innerHTML = parseInt(window.TestKOMBrowseInfoAudioDispatchClear.innerHTML) + 1;
		}),
		KOMBrowseInfoDispatchDebug: (function (inputData) {
			window.TestKOMBrowseInfoDispatchDebug.innerHTML = parseInt(window.TestKOMBrowseInfoDispatchDebug.innerHTML) + 1;
			window.TestKOMBrowseInfoDispatchDebugData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseInfoSpeechAvailable: false,
		KOMBrowseInfo_DebugShowLauncherButton: true,
	}, params),
});

export default KOMBrowseInfo;
