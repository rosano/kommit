import KOMCardModel from '../_shared/KOMCard/model.js';

const kIntervalAgainSeconds = 50;
const kIntervalLearn1Minutes = 1;
const kIntervalLearn2Minutes = 10;
const kIntervalDefaultDays = 1;
const kIntervalEasyDays = 4;
const kIntervalOverdueDivisorHard = 4;
const kIntervalOverdueDivisorGood = 2;
const kIntervalOverdueDivisorEasy = 1;
const kMultiplierDefault = 2.5;
const kMultiplierMin = 1.3;
const kMultiplierHard = 1.2;
const kMultiplierSummandFail = -0.2;
const kMultiplierSummandGood = 0;
const kMultiplierSummandHard = -0.15;
const kMultiplierSummandEasy = 0.15;
const kMultiplierMultiplicandEasy = 1.3;

const mod = {

	KOMPlayDayGrouping (inputData) {
		if (!(inputData instanceof Date) || Number.isNaN(inputData.getTime())) {
			throw new Error('KOMErrorInputNotValid');
		}

		return (new Date(inputData.valueOf() - (inputData.getTimezoneOffset() / 60 + 4) * 1000 * 60 * 60)).toJSON().slice(0, 10);
	},

	KOMPlaySort (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const cardsReview = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return e.KOMCardReviewDueDate;
		}));

		const cardsNew = inputData.filter(function (e) {
			return !e.KOMCardReviewDueDate;
		});
		const spacing = Math.floor(cardsReview.length / (cardsNew.length + 1));
		const cardsReviewLastIndex = cardsReview.length - 1;
		
		mod._KOMPlaySortShuffle(cardsNew).map(function (e, i) {
			return cardsReview.splice(cardsReviewLastIndex - spacing * (i + 1), 0, e);
		});

		return cardsReview;
	},

	//How to randomize (shuffle) a JavaScript array? - Stack Overflow https://stackoverflow.com/a/12646864
	_KOMPlaySortShuffle(inputData) {
		for (let i = inputData.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[inputData[i], inputData[j]] = [inputData[j], inputData[i]];
		}

		return inputData;
	},

	KOMPlayStateIsValid (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!Array.isArray(inputData.KOMPlayStateCardsQueue)) {
			return false;
		}

		if (!Array.isArray(inputData.KOMPlayStateCardsWait)) {
			return false;
		}

		if (inputData.KOMPlayStateCardCurrent && KOMCardModel.KOMCardModelErrorsFor(inputData.KOMPlayStateCardCurrent)) {
			return false;
		}

		if (inputData.KOMPlayStateShouldRandomize !== undefined) {
			if (typeof inputData.KOMPlayStateShouldRandomize !== 'boolean') {
				return false;
			}
		}

		return true;
	},

	KOMPlayResponseTypeAgain () {
		return 'kKOMPlayResponseTypeAgain';
	},

	KOMPlayResponseTypeHard () {
		return 'kKOMPlayResponseTypeHard';
	},

	KOMPlayResponseTypeGood () {
		return 'kKOMPlayResponseTypeGood';
	},

	KOMPlayResponseTypeEasy () {
		return 'kKOMPlayResponseTypeEasy';
	},

	KOMPlayResponseTypes () {
		return [
			mod.KOMPlayResponseTypeAgain(),
			mod.KOMPlayResponseTypeHard(),
			mod.KOMPlayResponseTypeGood(),
			mod.KOMPlayResponseTypeEasy(),
		];
	},

	KOMPlayResponseIsValid (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (mod.KOMPlayResponseTypes().indexOf(inputData.KOMPlayResponseType) === -1) {
			return false;
		}

		if (!(inputData.KOMPlayResponseDate instanceof Date) || Number.isNaN(inputData.KOMPlayResponseDate.getTime())) {
			return false
		}

		return true;
	},

	KOMPlayResponseIntervalAgain () {
		return 1000 * kIntervalAgainSeconds;
	},

	KOMPlayResponseIntervalLearn1 () {
		return 1000 * 60 * kIntervalLearn1Minutes;
	},

	KOMPlayResponseIntervalLearn2 () {
		return 1000 * 60 * kIntervalLearn2Minutes;
	},

	KOMPlayResponseIntervalGraduateDefault () {
		return kIntervalDefaultDays;
	},

	KOMPlayResponseIntervalGraduateEasy () {
		return kIntervalEasyDays;
	},

	KOMPlayResponseIntervalOverdueDivisorHard () {
		return kIntervalOverdueDivisorHard;
	},

	KOMPlayResponseIntervalOverdueDivisorGood () {
		return kIntervalOverdueDivisorGood;
	},

	KOMPlayResponseIntervalOverdueDivisorEasy () {
		return kIntervalOverdueDivisorEasy;
	},

	KOMPlayResponseIntervalOverdueDays (card, response) {
		if (KOMCardModel.KOMCardModelErrorsFor(card)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMPlayResponseIsValid(response)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!card.KOMCardReviewInterval) {
			return 0;
		}

		const due = new Date(mod.KOMPlayDayGrouping(card.KOMCardReviewDueDate)).valueOf();
		const date = new Date(mod.KOMPlayDayGrouping(response.KOMPlayResponseDate)).valueOf();

		if (date <= due) {
			return 0;
		}

		return (date - due) / 1000 / 60 / 60 / 24;
	},

	KOMPlayResponseIntervalOverdueBonus (card, response) {
		if (KOMCardModel.KOMCardModelErrorsFor(card)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMPlayResponseIsValid(response)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const days = mod.KOMPlayResponseIntervalOverdueDays(card, response);

		if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeHard()) {
			return days / mod.KOMPlayResponseIntervalOverdueDivisorHard();
		}

		if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeGood()) {
			return days / mod.KOMPlayResponseIntervalOverdueDivisorGood();
		}

		if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy()) {
			return days / mod.KOMPlayResponseIntervalOverdueDivisorEasy();
		}

		return 0;
	},

	KOMPlayResponseMultiplierDefault () {
		return kMultiplierDefault;
	},

	KOMPlayResponseMultiplierMin () {
		return kMultiplierMin;
	},

	KOMPlayResponseMultiplierHard () {
		return kMultiplierHard;
	},

	KOMPlayResponseMultiplierSummandFail () {
		return kMultiplierSummandFail;
	},

	KOMPlayResponseMultiplierSummandGood () {
		return kMultiplierSummandGood;
	},

	KOMPlayResponseMultiplierSummandHard () {
		return kMultiplierSummandHard;
	},

	KOMPlayResponseMultiplierSummandEasy () {
		return kMultiplierSummandEasy;
	},

	KOMPlayResponseMultiplierMultiplicandEasy () {
		return kMultiplierMultiplicandEasy;
	},

	KOMPlayRespond (state, response) {
		if (!mod.KOMPlayStateIsValid(state)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMPlayResponseIsValid(response)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const card = state.KOMPlayStateCardCurrent;

		Object.assign(card, (function update_card() {
			// FAIL
			if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeAgain()) {
				delete card.KOMCardReviewIsReadyToGraduate;
			}
			
			// GRADUATE
			if (!KOMCardModel.KOMCardModelIsReviewing(card) && (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy() || card.KOMCardReviewIsReadyToGraduate)) {
				delete card.KOMCardReviewIsLearning;
				delete card.KOMCardReviewIsReadyToGraduate;

				const interval = response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy() ? mod.KOMPlayResponseIntervalGraduateEasy() : mod.KOMPlayResponseIntervalGraduateDefault();
				return {
					KOMCardReviewInterval: interval,
					KOMCardReviewMultiplier: mod.KOMPlayResponseMultiplierDefault(),
					KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				};
			}

			// REVIEW
			if (KOMCardModel.KOMCardModelIsReviewing(card) && response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain()) {
				let interval = (card.KOMCardReviewInterval + mod.KOMPlayResponseIntervalOverdueBonus(card, response)) * (response.KOMPlayResponseType === mod.KOMPlayResponseTypeHard() ? mod.KOMPlayResponseMultiplierHard() : card.KOMCardReviewMultiplier);

				if (state.KOMPlayStateShouldRandomize) {
					interval *= 1 + (Math.min(0.25, Math.random()) / 100 + 0.005) * (Math.random() > 0.5 ? -1 : 1);
				}

				if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy()) {
					interval *= mod.KOMPlayResponseMultiplierMultiplicandEasy();
				}

				let multiplier = card.KOMCardReviewMultiplier;

				if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeHard()) {
					multiplier += mod.KOMPlayResponseMultiplierSummandHard();
				}

				if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy()) {
					multiplier += mod.KOMPlayResponseMultiplierSummandEasy();
				}

				return {
					KOMCardReviewInterval: interval,
					KOMCardReviewMultiplier: Math.max(mod.KOMPlayResponseMultiplierMin(), multiplier),
					KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				};
			}

			// LAPSE
			if (KOMCardModel.KOMCardModelIsReviewing(card) && response.KOMPlayResponseType === mod.KOMPlayResponseTypeAgain()) {
				delete card.KOMCardReviewInterval;

				card.KOMCardReviewMultiplier += mod.KOMPlayResponseMultiplierSummandFail();
			}

			// LEARN
			let interval = mod.KOMPlayResponseIntervalAgain();
			
			if (response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain() && KOMCardModel.KOMCardModelIsUnseen(card)) {
				interval = mod.KOMPlayResponseIntervalLearn1();
			}

			if (response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain() && KOMCardModel.KOMCardModelIsLearning(card)) {
				interval = mod.KOMPlayResponseIntervalLearn2();
			}

			return Object.assign({
				KOMCardReviewIsLearning: true,
				KOMCardReviewDueDate: new Date(response.KOMPlayResponseDate.valueOf() + interval),
			}, KOMCardModel.KOMCardModelIsLearning(card) && response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain() ? {
				KOMCardReviewIsReadyToGraduate: true,
			} : {})
		})());

		(function update_state() {
			if (KOMCardModel.KOMCardModelIsLearning(card)) {
				state.KOMPlayStateCardsWait.push(card);
			}

			state.KOMPlayStateCardsWait.filter(function (e) {
				if (!state.KOMPlayStateCardsQueue.length) {
					return true;
				}

				return e.KOMCardReviewDueDate < new Date();
			}).reverse().forEach(function (e) {
				state.KOMPlayStateCardsQueue.unshift(state.KOMPlayStateCardsWait.splice(state.KOMPlayStateCardsWait.indexOf(e), 1).pop());
			});

			state.KOMPlayStateCardCurrent = state.KOMPlayStateCardsQueue.shift();
		})();

		return state;
	},

};

Object.assign(exports, mod);
