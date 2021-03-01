import OLSKRemoteStorage from 'OLSKRemoteStorage';

import KOMDeck from '../KOMDeck/main.js';
import KOMCard from '../KOMCard/main.js';
import KOMSpacing from '../KOMSpacing/main.js';

export default {
	ZDRSchemaKey: 'KOMDeckObject',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async KOMDeckObjectMap (param1, param2 = false) {
			if (KOMDeck.KOMDeckModelErrorsFor(param1)) {
				throw new Error('KOMErrorInputNotValid');
			}

			if (typeof param2 !== 'boolean') {
				throw new Error('KOMErrorInputNotValid');
			}

			const _this = this;

			const $KOMDeckCards = await _this.App.KOMCard.KOMCardList(param1);
			const spacingEntries = Object.fromEntries((await Promise.all($KOMDeckCards.map(async function (e) {
				return [e.KOMCardID, Object.values(await _this.App.KOMSpacing.KOMSpacingList(e))];
			}))));

			return {
				$KOMDeckCards,
				$KOMDeckSpacings: [].concat(...(param2 ? $KOMDeckCards.filter(function (e) {
					return ![e.KOMCardFrontText, e.KOMCardRearText].join(',').includes('???');
				}) : $KOMDeckCards).map(function ($KOMSpacingCard) {
					return (spacingEntries[$KOMSpacingCard.KOMCardID] || []).map(function (e) {
						return Object.assign(e, {
							$KOMSpacingCard,
						});
					});
				})).filter(function (e) {
					return param1.KOMDeckIsForwardOnly && KOMSpacing.KOMSpacingIsBackward(e) ? false : true;
				}),
			};
		},

	},
};
