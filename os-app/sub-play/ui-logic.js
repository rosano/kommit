import KOMSpacingModel from '../_shared/KOMSpacing/model.js';

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

		const outputData = [];

		const reviewForward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return !KOMSpacingModel.KOMSpacingModelIsBackward(e) && e.KOMSpacingDueDate;
		}));

		outputData.push(...reviewForward);

		let reviewBackward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return KOMSpacingModel.KOMSpacingModelIsBackward(e) && e.KOMSpacingDueDate;
		}));

		while (reviewForward.length && reviewBackward.length && KOMSpacingModel.KOMSpacingModelIdentifier(reviewForward.slice(-1).pop().KOMSpacingID) === KOMSpacingModel.KOMSpacingModelIdentifier(reviewBackward[0].KOMSpacingID)) {
			reviewBackward = mod._KOMPlaySortShuffle(reviewBackward);
		}

		outputData.push(...reviewBackward);

		const unseenForward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return !KOMSpacingModel.KOMSpacingModelIsBackward(e) && !e.KOMSpacingDueDate;
		}));

		let unseenBackward = mod._KOMPlaySortShuffle(inputData.filter(function (e) {
			return KOMSpacingModel.KOMSpacingModelIsBackward(e) && !e.KOMSpacingDueDate && unseenForward.filter(function (item) {
				return KOMSpacingModel.KOMSpacingModelIdentifier(item.KOMSpacingID) === KOMSpacingModel.KOMSpacingModelIdentifier(e.KOMSpacingID);
			}).length;
		}));

		while (unseenForward.length && unseenBackward.length && KOMSpacingModel.KOMSpacingModelIdentifier(unseenForward.slice(-1).pop().KOMSpacingID) === KOMSpacingModel.KOMSpacingModelIdentifier(unseenBackward[0].KOMSpacingID)) {
			unseenBackward = mod._KOMPlaySortShuffle(unseenBackward);
		}

		unseenForward.push(...unseenBackward);

		if (!outputData.length) {
			return unseenForward;
		};

		const lastIndex = outputData.length - 1;
		const slots = Math.floor(outputData.length / (unseenForward.length + 1));

		unseenForward.map(function (e, i) {
			return outputData.splice(lastIndex - slots * (i + 1), 0, e);
		});

		return outputData;
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

		if (!Array.isArray(inputData.KOMPlayStateQueue)) {
			return false;
		}

		if (!Array.isArray(inputData.KOMPlayStateWait)) {
			return false;
		}

		if (inputData.KOMPlayStateCurrent && KOMSpacingModel.KOMSpacingModelErrorsFor(inputData.KOMPlayStateCurrent)) {
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
		return 'RESPONSE_AGAIN';
	},

	KOMPlayResponseTypeHard () {
		return 'RESPONSE_HARD';
	},

	KOMPlayResponseTypeGood () {
		return 'RESPONSE_GOOD';
	},

	KOMPlayResponseTypeEasy () {
		return 'RESPONSE_EASY';
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

	KOMPlayResponseIntervalOverdueDays (spacing, response) {
		if (KOMSpacingModel.KOMSpacingModelErrorsFor(spacing)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMPlayResponseIsValid(response)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!spacing.KOMSpacingInterval) {
			return 0;
		}

		const due = new Date(mod.KOMPlayDayGrouping(spacing.KOMSpacingDueDate)).valueOf();
		const date = new Date(mod.KOMPlayDayGrouping(response.KOMPlayResponseDate)).valueOf();

		if (date <= due) {
			return 0;
		}

		return (date - due) / 1000 / 60 / 60 / 24;
	},

	KOMPlayResponseIntervalOverdueBonus (spacing, response) {
		if (KOMSpacingModel.KOMSpacingModelErrorsFor(spacing)) {
			throw new Error('KOMErrorInputNotValid');
		}

		if (!mod.KOMPlayResponseIsValid(response)) {
			throw new Error('KOMErrorInputNotValid');
		}

		const days = mod.KOMPlayResponseIntervalOverdueDays(spacing, response);

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

		const spacing = state.KOMPlayStateCurrent;

		Object.assign(spacing, (function update_spacing() {
			// FAIL
			if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeAgain()) {
				delete spacing.KOMSpacingIsReadyToGraduate;
			}
			
			// GRADUATE
			if (!KOMSpacingModel.KOMSpacingModelIsReviewing(spacing) && (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy() || spacing.KOMSpacingIsReadyToGraduate)) {
				delete spacing.KOMSpacingIsLearning;
				delete spacing.KOMSpacingIsReadyToGraduate;

				const interval = response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy() ? mod.KOMPlayResponseIntervalGraduateEasy() : mod.KOMPlayResponseIntervalGraduateDefault();
				return {
					KOMSpacingInterval: interval,
					KOMSpacingMultiplier: mod.KOMPlayResponseMultiplierDefault(),
					KOMSpacingDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				};
			}

			// REVIEW
			if (KOMSpacingModel.KOMSpacingModelIsReviewing(spacing) && response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain()) {
				let interval = (spacing.KOMSpacingInterval + mod.KOMPlayResponseIntervalOverdueBonus(spacing, response)) * (response.KOMPlayResponseType === mod.KOMPlayResponseTypeHard() ? mod.KOMPlayResponseMultiplierHard() : spacing.KOMSpacingMultiplier);

				if (state.KOMPlayStateShouldRandomize) {
					interval *= 1 + (Math.min(0.25, Math.random()) / 100 + 0.005) * (Math.random() > 0.5 ? -1 : 1);
				}

				if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy()) {
					interval *= mod.KOMPlayResponseMultiplierMultiplicandEasy();
				}

				let multiplier = spacing.KOMSpacingMultiplier;

				if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeHard()) {
					multiplier += mod.KOMPlayResponseMultiplierSummandHard();
				}

				if (response.KOMPlayResponseType === mod.KOMPlayResponseTypeEasy()) {
					multiplier += mod.KOMPlayResponseMultiplierSummandEasy();
				}

				return {
					KOMSpacingInterval: interval,
					KOMSpacingMultiplier: Math.max(mod.KOMPlayResponseMultiplierMin(), multiplier),
					KOMSpacingDueDate: new Date(response.KOMPlayResponseDate.valueOf() + 1000 * 60 * 60 * 24 * interval),
				};
			}

			// LAPSE
			if (KOMSpacingModel.KOMSpacingModelIsReviewing(spacing) && response.KOMPlayResponseType === mod.KOMPlayResponseTypeAgain()) {
				delete spacing.KOMSpacingInterval;

				spacing.KOMSpacingMultiplier += mod.KOMPlayResponseMultiplierSummandFail();
			}

			// LEARN
			let interval = mod.KOMPlayResponseIntervalAgain();
			
			if (response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain() && KOMSpacingModel.KOMSpacingModelIsUnseen(spacing)) {
				interval = mod.KOMPlayResponseIntervalLearn1();
			}

			if (response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain() && KOMSpacingModel.KOMSpacingModelIsLearning(spacing)) {
				interval = mod.KOMPlayResponseIntervalLearn2();
			}

			return Object.assign({
				KOMSpacingIsLearning: true,
				KOMSpacingDueDate: new Date(response.KOMPlayResponseDate.valueOf() + interval),
			}, KOMSpacingModel.KOMSpacingModelIsLearning(spacing) && response.KOMPlayResponseType !== mod.KOMPlayResponseTypeAgain() ? {
				KOMSpacingIsReadyToGraduate: true,
			} : {})
		})());

		(function update_state() {
			if (KOMSpacingModel.KOMSpacingModelIsLearning(spacing)) {
				state.KOMPlayStateWait.push(spacing);
			}

			state.KOMPlayStateWait.filter(function (e) {
				if (!state.KOMPlayStateQueue.length) {
					return true;
				}

				return e.KOMSpacingDueDate < response.KOMPlayResponseDate;
			}).reverse().forEach(function (e) {
				state.KOMPlayStateQueue.unshift(state.KOMPlayStateWait.splice(state.KOMPlayStateWait.indexOf(e), 1).pop());
			});

			state.KOMPlayStateCurrent = state.KOMPlayStateQueue.shift();
		})();

		return state;
	},

};

export default mod;
