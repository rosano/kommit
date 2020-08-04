import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const KOMReviewMasterListItem = new RollupStart({
	target: document.body,
	props: Object.assign({
		KOMReviewMasterListItemDispatchClick: (function _KOMReviewMasterListItemDispatchClick() {
			window.TestKOMReviewMasterListItemDispatchClick.innerHTML = parseInt(window.TestKOMReviewMasterListItemDispatchClick.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewMasterListItemObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);

			let cards = [];
			e[1].$KOMDeckSpacings = (e[1].$KOMDeckSpacings || []).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse).map(function (e) {
				if (!e.$KOMSpacingCard) {
					return e;
				}

				return Object.assign(e, {
					$KOMSpacingCard: (cards = cards.concat(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e.$KOMSpacingCard))).filter(function (item) {
						return item.KOMCardID === e.$KOMSpacingCard.KOMCardID;
					}).shift(),
				});
			});
		}

		return e;
	}))),
});

export default KOMReviewMasterListItem;
