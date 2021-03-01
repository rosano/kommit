import KOMSpacing from '../_shared/KOMSpacing/main.js';
import KOMDeck from '../_shared/KOMDeck/main.js';
import KOMPlayLogic from '../sub-play/ui-logic.js';
import KOMSharedLogic from '../_shared/KOMSharedLogic/main.js';
import KOMReviewGeneral from './submodules/KOMReviewGeneral/ui-logic.js';

const mod = {

	KOMReviewDocumentCount (inputData, param2) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			if (!item) {
				return coll;
			}

			if (!param2 && !item.$KOMReviewChartCompositionCollectionData) {
				return coll;
			}

			if (param2 && (param2[item.KOMDeckID] || {}).$KOMDeckCards) {
				return coll + param2[item.KOMDeckID].$KOMDeckCards.length;
			}

			return coll + item.$KOMReviewChartCompositionCollectionData.KOMSpacingGroupingTotal;
		}, 0);
	},

	KOMReviewSpacingsToday(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return true;
			}

			return KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingDueDate).valueOf() <= KOMSharedLogic.KOMSharedGroupingDay(new Date()).valueOf();
		});
	},

	KOMReviewSchemeReviewing() {
		return 'kKOMReviewSchemeReviewing';
	},

	KOMReviewSchemeUnseen() {
		return 'kKOMReviewSchemeUnseen';
	},

	KOMReviewSchemeMixed() {
		return 'kKOMReviewSchemeMixed';
	},

	KOMReviewSchemes() {
		return [
			mod.KOMReviewSchemeReviewing(),
			mod.KOMReviewSchemeUnseen(),
			mod.KOMReviewSchemeMixed(),
		];
	},

	KOMReviewModelErrors(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		const errors = {};

		if (!mod.KOMReviewSchemes().includes(inputData.KOMReviewScheme)) {
			errors.KOMReviewScheme = [
				'KOMErrorNotValid',
			];
		} else if (inputData.KOMReviewScheme !== mod.KOMReviewSchemeReviewing()) {
			if (typeof inputData.KOMReviewMaxUnseenCards === 'undefined') {
				errors.KOMReviewMaxUnseenCards = [
					'KOMErrorNotDefined',
				];
			}
		}

		if (inputData.KOMReviewMaxUnseenCards !== undefined) {
			if (typeof inputData.KOMReviewMaxUnseenCards !== 'number') {
				errors.KOMReviewMaxUnseenCards = [
					'KOMErrorNotNumber',
				];
			} else if (inputData.KOMReviewMaxUnseenCards < 1) {
				errors.KOMReviewMaxUnseenCards = [
					'KOMErrorNotPositive',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	KOMReviewFilter(param1, param2, param3) {
		if (!Array.isArray(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (mod.KOMReviewModelErrors(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMDeck.KOMDeckErrors(param3)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const cardsNew = [];
		return param1.filter(function (e, i) {
			if (e.$KOMSpacingCard.KOMCardIsRetired) {
				return false;
			}

			if (param2.KOMReviewScheme === mod.KOMReviewSchemeReviewing() && KOMSpacing.KOMSpacingIsUnseen(e)) {
				return false;
			}

			if (param2.KOMReviewScheme === mod.KOMReviewSchemeUnseen() && !KOMSpacing.KOMSpacingIsUnseen(e)) {
				return false;
			}

			if (param3.KOMDeckIsForwardOnly && KOMSpacing.KOMSpacingIsBackward(e)) {
				return false;
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && KOMSpacing.KOMSpacingIsUnseen(e) && !cardsNew.includes(e.$KOMSpacingCard)) {
				cardsNew.push(e.$KOMSpacingCard);
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && KOMSpacing.KOMSpacingIsUnseen(e) && cardsNew.length > param2.KOMReviewMaxUnseenCards) {
				return false;
			}

			return true;
		});
	},

	KOMReviewRetireCards (param1, param2) {
		if (KOMDeck.KOMDeckErrors(param1)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!param1.KOMDeckRetireCardsMonths) {
			return [];
		}

		return Object.values(param2.reduce(function (coll, item) {
			return Object.assign(coll, {
				[KOMSpacing.KOMSpacingIdentifier(item.KOMSpacingID)]: (coll[[KOMSpacing.KOMSpacingIdentifier(item.KOMSpacingID)]] || []).concat(item),
			});
		}, {})).filter(function (e) {
			return e.filter(function (e) {
				return e.KOMSpacingInterval > (365 / 12.0 * param1.KOMDeckRetireCardsMonths);
			}).length;
		}).map(function (e) {
			return e[0].$KOMSpacingCard;
		})
	},

	KOMReviewDeckSort(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.sort(function (a, b) {
			return a.KOMDeckName.localeCompare(b.KOMDeckName);
		});
	},

	KOMReviewTotalMinutes(inputData) {
		if (typeof inputData !== 'number') {
			throw new Error('KOMErrorInputNotValid');
		}

		return Math.round(inputData / 1000 / 60 * 10) / 10;
	},

	KOMReviewTodayTotalMilliseconds(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			return coll + item.KOMSpacingChronicles.filter(function (e) {
				return KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) === KOMSharedLogic.KOMSharedGroupingDay(new Date());
			}).reduce(function (responseTime, e) {
				return responseTime + (e.KOMChronicleResponseDate - e.KOMChronicleDrawDate);
			}, 0);
		}, 0);
	},

	KOMReviewTodayReviewAccuracy(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return (function (scores) {
			if (!scores.length) {
				return 0;
			}

			return scores.reduce(function (coll, item) {
				return coll + item;
			}, 0) * 1.0 / scores.length;
		})(inputData.filter(function (e) {
			const items = e.KOMSpacingChronicles.filter(function (e) {
				return KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) === KOMSharedLogic.KOMSharedGroupingDay(new Date());
			});

			if (!items.length) {
				return false;
			}

			if (!e.KOMSpacingChronicles.filter(function (e) {
				if (items.includes(e)) {
					return false;
				}

				return e.KOMChronicleMultiplier;
			}).length) {
				return false;
			}

			return true;
		}).map(function (e) {
			return e.KOMSpacingChronicles.filter(function (e) {
				return KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) === KOMSharedLogic.KOMSharedGroupingDay(new Date());
			}).filter(function (e) {
				return e.KOMChronicleResponseType === KOMPlayLogic.KOMPlayResponseTypeAgain();
			}).length ? 0 : 1;
		}));
	},

	KOMReviewTodayPercentage(inputData) {
		if (typeof inputData !== 'number') {
			throw new Error('KOMErrorInputNotValid');
		}

		return Math.round(inputData * 100 * 10) / 10;
	},

	KOMReviewGeneralUpcomingDates() {
		return Array.from(Array(KOMReviewGeneral.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() + 1000 * 60 * 60 * 24 * i));
		});
	},

	KOMReviewGeneralUpcomingFilter(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return false;
			}
			
			if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingDueDate) < KOMSharedLogic.KOMSharedGroupingDay(new Date())) {
				return false;
			}

			if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMSpacingDueDate) >= KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() + 1000 * 60 * 60 * 24 * KOMReviewGeneral.KOMReviewGeneralTableDays()))) {
				return false;
			}

			return true;
		});
	},

	KOMReviewGeneralUpcomingGroupByDate(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			coll[KOMSharedLogic.KOMSharedGroupingDay(item.KOMSpacingDueDate)] = (coll[KOMSharedLogic.KOMSharedGroupingDay(item.KOMSpacingDueDate)] || []).concat(item);

			return coll;
		}, {});
	},

	KOMReviewGeneralHistoricalDates() {
		return Array.from(Array(KOMReviewGeneral.KOMReviewGeneralTableDays())).map(function (e, i) {
			return KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() - 1000 * 60 * 60 * 24 * i));
		});
	},

	KOMReviewGeneralHistoricalFilter(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.filter(function (e) {
			if (!e.KOMSpacingDueDate) {
				return false;
			}

			return e.KOMSpacingChronicles.filter(function (e) {
				if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) > KOMSharedLogic.KOMSharedGroupingDay(new Date())) {
					return false;
				}

				if (KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate) < KOMSharedLogic.KOMSharedGroupingDay(new Date(Date.now() - 1000 * 60 * 60 * 24 * KOMReviewGeneral.KOMReviewGeneralTableDays()))) {
					return false;
				}

				return true;
			}).length;
		});
	},

	KOMReviewGeneralHistoricalGroupByDate(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			item.KOMSpacingChronicles.forEach(function (e) {
				const array = (coll[KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate)] || []);
				
				if (!array.includes(item)) {
					array.push(item);
				}

				coll[KOMSharedLogic.KOMSharedGroupingDay(e.KOMChronicleResponseDate)] = array;
			});

			return coll;
		}, {});
	},

	KOMReviewGeneralHistoricalTotalMilliseconds(inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			return coll + (item.KOMChronicleResponseDate - item.KOMChronicleDrawDate);
		}, 0);
	},

};

export default mod;
