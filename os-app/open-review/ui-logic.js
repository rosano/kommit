import KOMSpacingModel from '../_shared/KOMSpacing/model.js';
import KOMDeckModel from '../_shared/KOMDeck/model.js';
import KOMPlayLogic from '../sub-play/ui-logic.js';
import KOMSharedLogic from '../_shared/KOMSharedLogic/main.js';

const mod = {

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

	KOMReviewModelErrorsFor(inputData) {
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

		if (mod.KOMReviewModelErrorsFor(param2)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (KOMDeckModel.KOMDeckModelErrorsFor(param3)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const cardsNew = [];
		return param1.filter(function (e, i) {
			if (e.$KOMSpacingCard.KOMCardIsSuspended) {
				return false;
			}

			if (param2.KOMReviewScheme === mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e)) {
				return false;
			}

			if (param2.KOMReviewScheme === mod.KOMReviewSchemeUnseen() && !KOMSpacingModel.KOMSpacingModelIsUnseen(e)) {
				return false;
			}

			if (param3.KOMDeckIsForwardOnly && KOMSpacingModel.KOMSpacingModelIsBackward(e)) {
				return false;
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e) && !cardsNew.includes(e.$KOMSpacingCard)) {
				cardsNew.push(e.$KOMSpacingCard);
			}

			if (param2.KOMReviewScheme !== mod.KOMReviewSchemeReviewing() && KOMSpacingModel.KOMSpacingModelIsUnseen(e) && cardsNew.length > param2.KOMReviewMaxUnseenCards) {
				return false;
			}

			return true;
		});
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

};

export default mod;
