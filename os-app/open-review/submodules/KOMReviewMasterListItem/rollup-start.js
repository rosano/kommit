import RollupStart from './main.svelte';

import KOMCardModel from '../../../_shared/KOMCard/model.js';
import KOMSpacingModel from '../../../_shared/KOMSpacing/model.js';

const KOMReviewMasterListItem = new RollupStart({
	target: document.body,
	props: Object.assign({}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['KOMReviewMasterListItemObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);

			let cards = [];
			e[1].$KOMDeckSpacings = (e[1].$KOMDeckSpacings || []).map(KOMSpacingModel.KOMSpacingModelPostJSONParse).map(function (e) {
				if (!e.$KOMSpacingCard) {
					return e;
				}

				return Object.assign(e, {
					$KOMSpacingCard: (cards = cards.concat(KOMCardModel.KOMCardModelPostJSONParse(e.$KOMSpacingCard))).filter(function (item) {
						return item.KOMCardID === e.$KOMSpacingCard.KOMCardID;
					}).shift(),
				})
			});
		}

		return e;
	}))),
});

export default KOMReviewMasterListItem;
