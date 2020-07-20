import RollupStart from './main.svelte';

const KOMBrowseInfoTags = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseInfoTagsDispatchCreate: (function _KOMBrowseInfoTagsDispatchCreate(inputData) {
			window.TestKOMBrowseInfoTagsDispatchCreate.innerHTML = parseInt(window.TestKOMBrowseInfoTagsDispatchCreate.innerHTML) + 1;
			window.TestKOMBrowseInfoTagsDispatchCreateData.innerHTML = inputData;
		}),
		KOMBrowseInfoTagsDispatchRemove: (function _KOMBrowseInfoTagsDispatchRemove(inputData) {
			window.TestKOMBrowseInfoTagsDispatchRemove.innerHTML = parseInt(window.TestKOMBrowseInfoTagsDispatchRemove.innerHTML) + 1;
			window.TestKOMBrowseInfoTagsDispatchRemoveData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMBrowseInfoTagsItems'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMBrowseInfoTags;
