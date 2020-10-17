import RollupStart from './main.svelte';

const KOMBrowseInfoTags = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseInfoTagsDispatchAdd: (function (inputData) {
			window.TestKOMBrowseInfoTagsDispatchAdd.innerHTML = parseInt(window.TestKOMBrowseInfoTagsDispatchAdd.innerHTML) + 1;
			window.TestKOMBrowseInfoTagsDispatchAddData.innerHTML = inputData;
		}),
		KOMBrowseInfoTagsDispatchRemove: (function (inputData) {
			window.TestKOMBrowseInfoTagsDispatchRemove.innerHTML = parseInt(window.TestKOMBrowseInfoTagsDispatchRemove.innerHTML) + 1;
			window.TestKOMBrowseInfoTagsDispatchRemoveData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMBrowseInfoTagsItems', 'KOMBrowseInfoTagsSuggestions'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default KOMBrowseInfoTags;
