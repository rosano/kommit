import RollupStart from './main.svelte';

const KOMBrowseList = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMBrowseListItems: [],
		KOMBrowseListFilterText: '',
		KOMBrowseListDispatchClose: (function (inputData) {
			window.TestKOMBrowseListDispatchClose.innerHTML = parseInt(window.TestKOMBrowseListDispatchClose.innerHTML) + 1;
		}),
		KOMBrowseListDispatchCreate: (function (inputData) {
			window.TestKOMBrowseListDispatchCreate.innerHTML = parseInt(window.TestKOMBrowseListDispatchCreate.innerHTML) + 1;
			window.TestKOMBrowseListDispatchCreateData.innerHTML = inputData;
		}),
		KOMBrowseListDispatchClick: (function (inputData) {
			window.TestKOMBrowseListDispatchClick.innerHTML = parseInt(window.TestKOMBrowseListDispatchClick.innerHTML) + 1;
			window.TestKOMBrowseListDispatchClickData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseListDispatchArrow: (function (inputData) {
			window.TestKOMBrowseListDispatchArrow.innerHTML = parseInt(window.TestKOMBrowseListDispatchArrow.innerHTML) + 1;
			window.TestKOMBrowseListDispatchArrowData.innerHTML = JSON.stringify(inputData);
		}),
		KOMBrowseListDispatchFilter: (function (inputData) {
			window.TestKOMBrowseListDispatchFilter.innerHTML = parseInt(window.TestKOMBrowseListDispatchFilter.innerHTML) + 1;
			window.TestKOMBrowseListDispatchFilterData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['KOMBrowseListItems', 'KOMBrowseListItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'KOMBrowseListItemSelected') {
			e[1] = coll[0][1].filter(function (item) {
				return item.KOMCardID === e[1].KOMCardID;
			}).shift();
		}

		return e;
	}))),
});

export default KOMBrowseList;
